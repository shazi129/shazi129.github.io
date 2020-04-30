#!/usr/bin/env python
# -*- coding: utf-8 -*- #

import pelicanconf
import os
import shutil

image_extends = [".png", ".gif", ".jpg", ".jpeg"]

def getAllImageFile(dirPath):
    ret = []
    allsub = os.listdir(dirPath)
    for sub in allsub:
        subPath = "%s/%s" % (dirPath, sub)
        if os.path.isfile(subPath):
        	   for ext in image_extends:
        	       if subPath.endswith(ext):
        	           ret.append(subPath)
        	           break

        if os.path.isdir(subPath):
            ret.extend(getAllImageFile(subPath))
    return ret

if __name__ == '__main__':

    #复制favicon.ico
    shutil.copy("%s/../external/images/favicon.ico" % (pelicanconf.OUTPUT_PATH), "%s/favicon.ico" % (pelicanconf.OUTPUT_PATH))

    #复制文章的图片
    images = getAllImageFile(pelicanconf.PATH)
    for image in images:
        imageName = os.path.basename(image)
        shutil.copy(image, "%s/%s" % (pelicanconf.OUTPUT_PATH, imageName))