# AppServers

### Maquinas:

* 10.131.137.166
* 10.131.137.220

### Firewall: 
para configurar el firewall se deben seguir los siguientes pasos
1. prender el firewall con el siguiente comando: 
```
$ systemctl start firewalld
```
2. habilitar los puertos que la aplicacion necesita:
```
$ firewall-cmd --zone=public --add-port=<numero de puerto>/tcp --permanent
```
donde <numero de puerto> es el puerto a habilitar.

los puertos necesarios para que la aplicacion funcione son los siguientes:
```
3000 para la aplicación NodeJs
```
3. por ultimo hacer reload del firewall: 
```
$ firewall-cmd --reload
```

### GlusterFS (Cliente)
1. Instalar dependencias: 
```
$ sudo yum -y install openssh-server wget fuse fuse-libs openib libibverbs
```
2. Instalar GlusterFS:
```
$ rpm -i https://buildlogs.centos.org/centos/7/storage/x86_64/gluster-3.10/glusterfs-3.10.5-1.el7.x86_64.rpm (Gluster)
$ rpm -i https://buildlogs.centos.org/centos/7/storage/x86_64/gluster-3.10/glusterfs-fuse-3.10.5-1.el7.x86_64.rpm (Fuse)
```
3. Montar el volumen:
```
$ mount -t glusterfs 10.131.137.234:/files /mnt/
```
Nota: El /files no es un directorio, es el nombre del volumen de gluster en los datanodes
