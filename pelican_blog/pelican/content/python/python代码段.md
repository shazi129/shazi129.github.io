Title: python代码段     
Date: 2015-11-10           
Category: Python       
Tags: Python          


下面总结一些日常Python代码段

##遍历文件夹##
    import os
    def getAllFile(dirPath):
    	ret = []
    	allsub = os.listdir(dirPath)
    	for sub in allsub:
    		subPath = "%s/%s" % (dirPath, sub)
    		if os.path.isfile(subPath):
    			ret.append(subPath)
    		if os.path.isdir(subPath):
    			ret.extend(getAllFile(subPath))
    	return ret

##打zip包##

    import zipfile, os

    zipPakFile = zipfile.ZipFile(zipflieName, 'w' ,zipfile.ZIP_DEFLATED)
    for item in fileList:
    	zipPakFile.write(item) 
    zipPakFile.close()

##删除文件夹##
    import shutil
    shutil.rmtree(dirPath, True) #True表示即使为空也强制删除，如果不加True, 只能删除空文件夹

##创建文件夹##
    if not os.path.isdir(dir): 
		os.makedirs(dir)  #makedirs和mkdir的区别是，如果父目录不存在，makedirs会创建父目录，而mkdir不会
