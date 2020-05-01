#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'张文'
SITENAME = u"观心苑"
SITEURL = 'http://www.vmetu.com/blog'
SITETITLE = u"张三"

PATH = 'content'
OUTPUT_PATH = './../../blog'

TIMEZONE = 'Asia/Shanghai'

DEFAULT_LANG = u'zh'

# Plugins and extensions
PLUGIN_PATHS = ['../plugins/']
PLUGINS = ['sitemap', 'pelican-toc', 'tipue_search', 
           'neighbors', 'render_math', 'share_post', 'i18n_subsites']

#SiteMap配置，允许搜索引擎搜索
SITEMAP = {
    'format': 'xml',
    'priorities': {
        'articles': 0.5,
        'indexes': 0.5,
        'pages': 0.5
    },
    'changefreqs': {
        'articles': 'monthly',
        'indexes': 'daily',
        'pages': 'monthly'
    }
}

# Enable Jinja2 i18n extension used to parse translations.
JINJA_ENVIRONMENT = {"extensions": ["jinja2.ext.i18n"]}


LANDING_PAGE_ABOUT = {
	"title": "I have a dream",
	"details": u"一个游戏开发者, <a href=\"mailto:apply_count@sina.com\">mail</a>",
}

PROJECTS = [
    {
        'name': '英雄杀',
        'url': 'http://yxs.qq.com/',
        'description': u'策略卡牌游戏'
    },
]

#TAG_SAVE_AS = 'tag/{slug}.html'
#CATEGORY_SAVE_AS = 'category/{slug}.html'

# Flex theme
SITESUBTITLE = u"随便写点东西"
SITEDESCRIPTION = ""
SITELOGO = SITEURL + "/../external/images/profile.png"
FAVICON = SITEURL + "/../external/images/favicon.ico"
BROWSER_COLOR = "#333"
ROBOTS = "index, follow"
COPYRIGHT_YEAR = 2020
MAIN_MENU = True
MENUITEMS=[
    ("首页", SITEURL),
    ("所有", SITEURL + "/archives.html"), 
    ("分类", SITEURL + "/categories.html"),
    ("标签", SITEURL + "/tags.html"),
]

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = ()

# Social widget
SOCIAL = ()

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

THEME = "./../theme"
USE_FOLDER_AS_CATEGORY = True
#MONTH_ARCHIVE_SAVE_AS = 'time_category'
#MONTH_ARCHIVE_SAVE_AS = 'time_category/{date:%Y}/{date:%b}/index.html'

DISQUS_SITENAME = 'vmetu'
SUMMARY_MAX_LENGTH = 1

FOUNDATION_FOOTER_TEXT = "Copyright &copy; 2015 - 2016 Vmetu. All Rights Reserved"

