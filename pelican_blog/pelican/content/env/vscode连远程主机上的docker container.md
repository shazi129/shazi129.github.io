Title: vscode连远程主机上的docker container 
Date: 2021-08-26  
Category: 环境搭建
Tags: docker vscode



1. 安装remote-ssh插件，并配置：

   ```
   Host server_docker
       HostName {远程主机ip}
       User root
       Port 1122
   ```
2. 创建并进入容器，并开启端口映射
   ```
   docker run -it --name my_container -p 1122:22 {image} /bin/bash
   ```
3. 确保container中存在sshd服务，如果没有，装一个
   ```
   ps -e|grep ssh
   ```
4. 打开container中的/etc/ssh/sshd_config文件，加上:
   ```
   PermitRootLogin yes
   PubkeyAuthentication no
   PasswordAuthentication yes
   ```
   这里我们使用用户名密码登录
   
5. 重启sshd
   ```
   /etc/init.d/ssh restart
   ```
   
6. 设置container root账户的密码
   ```
   passwd root
   ```
   
7. 使用vscode连接，输入密码即可