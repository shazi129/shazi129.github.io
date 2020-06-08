Title:lua源码阅读7——内存管理  
Date: 2020-06-04
Category: lua源码阅读 

[TOC]

## 内存申请和释放

Lua允许自定义内存的申请和释放的行为：

```cpp
LUALIB_API lua_State *luaL_newstate (void) {
  lua_State *L = lua_newstate(l_alloc, NULL); //设置内存申请和释放函数
  if (L) lua_atpanic(L, &panic);
  return L;
}
```

这个函数会被设置到`global_State->frealloc`字段中。 我们来看看默认的内存申请函数的内容：

```cpp
//虚拟机内部用到的内存申请和释放的函数， 当nSize=0时，释放内存
static void *l_alloc (void *ud, void *ptr, size_t osize, size_t nsize) {
  (void)ud; (void)osize;  /* not used */
  if (nsize == 0) {
    free(ptr);
    return NULL;
  }
  else
    return realloc(ptr, nsize);
}
```

在实际的使用中，申请和释放内存用得跟多的是这么些宏定义：

```cpp
#define luaM_freemem(L, b, s)	luaM_realloc_(L, (b), (s), 0)
#define luaM_free(L, b)		luaM_realloc_(L, (b), sizeof(*(b)), 0)
#define luaM_freearray(L, b, n)   luaM_realloc_(L, (b), (n)*sizeof(*(b)), 0)

#define luaM_malloc(L,s)	luaM_realloc_(L, NULL, 0, (s))

```

这些宏定义可以看作是对`luaM_realloc_`函数的封装：

```cpp
/*
** generic allocation routine.
** 对realloc的封装，block: 老内存快，osize： 老大小，nsize：新大小，返回新内存块
*/
void *luaM_realloc_ (lua_State *L, void *block, size_t osize, size_t nsize) {
  void *newblock;
  global_State *g = G(L);

  //参数检查：block = null时， osize必须为0， block != null osize必须不为0
  size_t realosize = (block) ? osize : 0;
  lua_assert((realosize == 0) == (block == NULL));
#if defined(HARDMEMTESTS)
  if (nsize > realosize && g->gcrunning)
    luaC_fullgc(L, 1);  /* force a GC whenever possible */
#endif

  //nsize==0的时候才释放, l_alloc中实现
  newblock = (*g->frealloc)(g->ud, block, osize, nsize);

  //申请失败，gc一次，然后再申请一次
  if (newblock == NULL && nsize > 0) {
    lua_assert(nsize > realosize);  /* cannot fail when shrinking a block */
    if (g->version) {  /* is state fully built? */
      luaC_fullgc(L, 1);  /* try to free some memory... */
      newblock = (*g->frealloc)(g->ud, block, osize, nsize);  /* try again */
    }
    if (newblock == NULL)
      luaD_throw(L, LUA_ERRMEM);
  }
  lua_assert((nsize == 0) == (newblock == NULL));
  g->GCdebt = (g->GCdebt + nsize) - realosize; //记录当前使用的内存大小
  return newblock;
}
```

## GC

