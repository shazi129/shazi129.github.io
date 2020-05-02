# -*- coding: utf-8 -*- #

personal_cfg = [
	{
		"title": "关于",
		"content_path": "./../pelican/personal/about.md",
		"out_path": "./about.html" 
	},

	{
		"title": "记录",
		"content_path": "./../pelican/personal/recorder.md",
		"out_path": "./recorder.html" 
	}
]

import codecs, markdown

def get_html(md_path):
	input_file = codecs.open(md_path, mode="r", encoding="utf-8")
	text = input_file.read()
	return markdown.markdown(text, extensions=['markdown.extensions.toc'])

if __name__ == "__main__":
	for item in personal_cfg:
		output_file = codecs.open(item["out_path"], mode="w", encoding="utf-8")
		
		content = """
{% extends "base.html" %}
{% block title %} &ndash; 
		"""

		content = content + item["title"];

		content += """
{% endblock %}
{% block content %}
<article class="single">
		<header>
		"""

		content += get_html(item["content_path"])

		content += """
	</header>
</article>
{% endblock %}
		"""

		output_file.write(content)