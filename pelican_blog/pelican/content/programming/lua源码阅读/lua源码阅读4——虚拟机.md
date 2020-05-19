Title:lua源码阅读4——虚拟机    
Date: 2020-05-15 
Category: lua源码阅读     



lua虚拟机用来解析和执行lua代码，例如在我们的main函数中：

```cpp
if (luaL_loadstring(lstate, lua) || lua_pcall(lstate, 0, 0, 0))
{
    printf("error:  %s\n", lua_tostring(lstate, -1));
}
```

`luaL_loadstring`将lua代码解析成字节码，`lua_pcall`将字节码放到虚拟机中运行。

