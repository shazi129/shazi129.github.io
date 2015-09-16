Title: C++中类成员变量的初始化
Date: 2013-04-18
Category: C++
Tag: C++, 语法

###静态变量


	class MyClass
	{
		public:
			static int a;
	};
	static int MyClass::a = 100;
