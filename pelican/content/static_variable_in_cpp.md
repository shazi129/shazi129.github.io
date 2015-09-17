Title: C++中类成员变量的初始化
Date: 2013-04-18
Category: C++
Tags: C++


在C++中，一些特殊变量有着不同的初始化方式。


###静态变量


	class MyClass
	{
		public:
			static int a;
	};
	static int MyClass::a = 100;
