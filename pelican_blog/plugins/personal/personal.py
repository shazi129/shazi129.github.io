# -*- coding: utf-8 -*-

import markdown
from pelican import signals

def create_personal(pelican_obj):
    print("===============")

def register():
    signals.finalized.connect(create_personal)