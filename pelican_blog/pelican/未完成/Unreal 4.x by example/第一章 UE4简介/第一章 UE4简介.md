# 第一章 UE4简介

欢迎阅读本书，通过本书你可以学习到如何使用UE4来创建高质量游戏，UE4使用的语言是C++。本章介绍的主要内容有：安装UE4方法, UE4界面的一些介绍，如何创建一个UE的工程以及以后你能用UE4来干什么。本章可以算是全书大纲。

## 本书导览

首先， 在后面的一些章节中，C++一些特性使用得比较多，所以建议本书的阅读者有一定的C++使用经验。
其次，这是一本示例书，那么意味着本书是通过一些UE4的示例来理解UE4的，每个示例通常花两章来讲解。第一章讲一些和示例相关的概念和特性，第二章讲一些深层次的应用和复杂的组件。通过每个示例，你能学到UE4的一些核心功能和一些有趣的技巧。
读完本书后，你就会觉得你是UE4的牛人了。

## 安装UE4 
本书使用的UE4是4.11.0， 可以去官网下载，其他略.

## 创建第一个工程
现在是Hello World的时间了，不过本次我们创建一个Hello Unread工程。打开Ureal 编辑器，会出现一个项目浏览器:

![1592364908292](F:\GitHub\shazi129.github.io\pelican_blog\pelican\未完成\Unreal 4.x by example\第一章 UE4简介\1592364908292.png)

这个浏览器有两个Tab， **项目**和**新建项目**， 选择**新建项目**， 有两个子tab， **蓝图**和**C++**， 我们将使用蓝图来创建一个空工程。

在界面的下方，我们能看到**桌面/主机**, **最高质量**, **含初学者内容包**三个选项，他们用来设置游戏的目标平台的相关参数，现在我们还用不到，使用默认值就好。再下面是工程所在的目录和工程名，填好之后，点击创建项目，就创建了一个空工程。

## 工程界面

在工程界面的右上角有工程的名字，还有一个蓝色的帽子：

![1592366640143](F:\GitHub\shazi129.github.io\pelican_blog\pelican\未完成\Unreal 4.x by example\第一章 UE4简介\1592366640143.png)

点击这个帽子会出来unreal的教程。

## 创建Actor

创建工程后，你的界面应该是这样的：

![img](F:\GitHub\shazi129.github.io\pelican_blog\pelican\未完成\Unreal 4.x by example\第一章 UE4简介\企业微信截图_15933486418073.png)

接下来我们要做的是，把所有的物体一出，并创建自己的Actor。我们可以选中一个actor，然后使用**Delete键**来删除; 也可以右击actor， 在弹出菜单中选择**Edit**->**Delete**来删除。也可以在右上方的**World Outliner**面板中选择actor删除。

在左上角我们可以看到**Place Actors**的面板，在上面可以找到**Empty Actor**,我们可以把它拖到界面里，这样就创建了一个actor。

## Objects, Actors, Pawns, and Characters

UE4使用一些术语来指代引擎中使用的物体，比如说**Objects, Actors, Pawns, **和**Characters**。这些术语可以参考：https://docs.unrealengine.com/zh-CN/GettingStarted/Terminology/index.html。

举例来说，一辆汽车被看作是actor， 但是它的引擎可以看作是object

在界面上殿中一个物体可以有三种操作方式，**移动**， **旋转**，和**缩放**：

![1593349958770](F:\GitHub\shazi129.github.io\pelican_blog\pelican\未完成\Unreal 4.x by example\第一章 UE4简介\1593349958770.png)

可以通过界面上的：

![img](F:\GitHub\shazi129.github.io\pelican_blog\pelican\未完成\Unreal 4.x by example\第一章 UE4简介\企业微信截图_15933500064716.png)

来切换，也可以通过**W**, **R**, **E**键来切换。

## 为actor添加component

我们注意到，当缩放或是旋转一个空actor的时候，没有任何效果。这是因为这个空actor只有一个**DefaultSceneRoot**组件， 组件(Compnent)是一种可以被其他object持有的object， 它可以为持有者提供各种功能或性能。当前的空actor不持有一个“可视”的组件，不能再游戏中呈现出几何体，这个actor的**大小**是没有定义的，所以不能使用**旋转**和**缩放**操作。

我们来看一个UE4的可视化面板，在引擎的右侧，可以看到一个**Detail**窗口，通过Detail窗口，我们可以操作Object暴露出来的一些数据，或是添加删除Component，我们也可以通过detail面板来更改object的名字。

现在我们来给这个Actor加上一个可视效果。在详情面板下，你可以看到一个**Add Comopnent**的绿色按钮，点击会弹出一个内置的可用的Component列表，我们可以加上一个**Sphere**组件，它位于列表的**Basic Shapes**下面，也可以使用搜索栏搜索。

### Component 层级

当加上一个sphere mesh到我们的actor上之后，我们可以在详情面板看到在**DefaultSceneRoot**下面有个**Sphere**组件：

![img](F:\GitHub\shazi129.github.io\pelican_blog\pelican\未完成\Unreal 4.x by example\第一章 UE4简介\企业微信截图_15934340822462.png)

这就叫层级，**Sphere**就是**DefaultSceneRoot**的子组件。这意味着**DefaultSceneRoot**的任何移动，缩放或是旋转都会作用到**Sphere**上，反过来却不成立。你可以拖动组件来改变他们的层级，最上层的是根组件。

### 更改组件

我们接下来会给Actor加点动效，会加两个组件: **Text Render**和**Particle System**, 然后会修改他们的一些属性以达到我们期望的效果。

首先，在加上一个**Text Render**组件之后，选中它，在详情面板中可以看到一个**Text**下拉列表：

![1593434900659](F:\GitHub\shazi129.github.io\pelican_blog\pelican\未完成\Unreal 4.x by example\第一章 UE4简介\1593434900659.png)

它下面放着**Text Render**的主要属性，例如文本，字体，对其方式等。



我们也可以通过detail面板来更改object的名字。