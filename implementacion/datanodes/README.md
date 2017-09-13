# Datanodes:
## Maquinas:
* 10.131.137.234
* 10.131.137.209
* 10.131.137.228

## Firewall:
1. prender el firewall con el siguiente comando:
```
$ systemctl start firewalld
```
2. habilitar los puertos que la aplicacion necesita:
```
GlusterFS

$ firewall-cmd --zone=public --add-port=24007-24008/tcp --permanent
$ firewall-cmd --zone=public --add-port=24007-24008/udp --permanent
$ firewall-cmd --zone=public --add-port=49152-49154/tcp --permanent
$ firewall-cmd --zone=public --add-port=49152-49154/udp --permanent

MongoDB

$ firewall-cmd --zone=public --add-port=27017/tcp --permanent

```
3. Recargar las reglas del firewall:
```
$ firewall-cmd --reload
```

## MongoDB: 
1. Instalar MongoDB:
```
$ sudo yum install mongodb-org -y
```
2. Configurar el Replica Set en el archivo /etc/mongod.conf
```
.
.
.
replication:
 replSetName: mongo-replset
.
.
.
```
3. Iniciar y habilitar el demonio:
```
$ sudo systemctl enable mongod
$ sudo systemctl start mongod
```
4. Cofigurar el Replica Set en el Mongo Shell
```
$ mongo

> rs.initiate( {
   _id : "rs0",
   members: [ { _id : 0, host : "10.131.137.234:27017" }]
})
> rs.add("10.131.137.228")
> rs.add("10.131.137.209")
```
Nota: Solo el paso 4 debe hacerse en un solo datanode (en este caso desde la .234), el resto deben hacerse en todos los datanodes.
## GlusterFS
1. Instalar GlusterFS
```
$ yum install -y centos-release-gluster310
$ yum install -y glusterfs gluster-cli glusterfs-libs glusterfs-server
```
2. Agregar los compañeros(peers): 
```
$ gluster peer probe 10.131.137.209
$ gluster peer probe 10.131.137.228
```
3. Crear un volumen: 
```
$ gluster volume create files 10.131.137.234:/data/files 10.131.137.209:/data/files 10.131.137.228:/data/files
```
Nota: El paso 2 y 3 se deben realizar solo desde un datanode (el paso 2 fue desde la .234), los pasos anteriores deben realizarse en todos los datanodes.
