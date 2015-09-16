Title: Pelican安装过程
Date: 2015-09-16
Category: Pelican
Tag: Pelican

# Pelican安装过程 #

今天安装了Pelican，下面来说下过程和遇到的问题

1. 安装Python，因为在Mac下，省掉这一步
2. 安装pip，[下载地址](https://pypi.python.org/packages/source/p/pip/pip-7.1.2.tar.gz#md5=3823d2343d9f3aaab21cf9c917710196), 解压后安装
3. 安装pelican
	pip install pelican
4. 启动pelican创建工程，pelican－quickstart
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

解决办法

vim /Library/Python/2.7/site-packages/pelican/readers.py

将from six.moves.html_parser import HTMLParser换成 from HTMLParser import HTMLParser
正常启动