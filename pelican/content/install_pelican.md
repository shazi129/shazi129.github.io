Title: Pelican安装过程  
Date: 2015-09-16  
Category: Pelican
Tags: Pelican  

今天安装了Pelican，下面来说下过程和遇到的问题

* 安装Python，因为在Mac下，省掉这一步

* 安装pip([下载地址](https://pypi.python.org/packages/source/p/pip/pip-7.1.2.tar.gz#md5=3823d2343d9f3aaab21cf9c917710196)), 解压后运行： ```python setup.py install``` 安装

* 安装pelican， 运行 ```pip install pelican```

* 安装markdown， 运行 ```	pip install markdown```

* 启动pelican创建工程，pelican－quickstart, 此时有可能出现如下错误：

		Traceback (most recent call last):  
		File "/usr/local/bin/pelican-quickstart", line 7, in <module>  
			from pelican.tools.pelican_quickstart import main  
		File "/Library/Python/2.7/site-packages/pelican/__init__.py", line 20, in <module>  
			from pelican.generators import (ArticlesGenerator, PagesGenerator,  
		File "/Library/Python/2.7/site-packages/pelican/generators.py", line 22, in <module>  
			from pelican.readers import Readers  
		File "/Library/Python/2.7/site-packages/pelican/readers.py", line 24, in <module>  
			from six.moves.html_parser import HTMLParser  
		ImportError: No module named html_parser  


	这时只需要更改一下源文件即可：`vim /Library/Python/2.7/site-packages/pelican/readers.py`。  
	将24行的：  
	`from six.moves.html_parser import HTMLParser`  
	 换成：  
 	`from HTMLParser import HTMLParser`  
	即可
