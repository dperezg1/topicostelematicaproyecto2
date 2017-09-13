# Herramientas para la Disponibilidad

## Arquitectura base:
![](vista-arquitectura.png)

### Uso de Load Balancer

* Software HAPROXY

      http://www.haproxy.org/


Este LB (HAPROXY), puede tener las siguientes funcionalidades:

* Proxy inverso (permite que un browser en Internet público, pueda ingresar a los servidores AppServer).
* Balanceador de cargas (permite distribuir Requerimientos a los N servidores AppServer)
* Permite recibir comunicaciones seguras (https)

## Caso de estudio:

* HAPROXY Publico (200.12.187.86)
* HAPROXY Privado (10.131.137.219) --> balancea AppServer1 & AppServer2
* Dominio: proyecto17.dis.eafit.edu.co -> apunta a: 200.12.180.86 --> Redirecciona a: 10.131.137.219:8081
* Dominio: proyecto17api.dis.eafit.edu.co -> apunta a: 200.12.180.86 --> Redirecciona a: 10.131.137.219:80/server/ 
* AppClient (10.131.137.219)
* AppServer1 (10.131.137.220)
* AppServer2 (10.131.137.166)

En el AppServer1 hay una app corriendo por el puerto 3000

En el AppServer2 hay otra app corriendo por el puerto 3000

En el AppClient hay una app Angular 2 por el puerto 8081 (NGINX)

Para comprobar el funcionamiento, en un browser entre:

http://10.131.137.220:3000 ,

http://10.131.137.166:3000 y

http://10.131.137.219:8081

En el servidor HAPROXY debe tener previamente instalado haproxy:

* En CentOS:

      $ sudo yum install haproxy


* Configuración en el HAPROXY:

      $ sudo vim /etc/haproxy/haproxy.cfg

Se recomienda usar HAPROXY, porque esto no solo tiene balanceador, sino que para los de seguiridad, les permite activar HTTPS más fácil allí.

### Uso de Replicación en Bases de Datos

* Software MongoDB (Replica Set)

      http://www.mongodb.com/


Esta base de datos puede tener las siguientes funciones:

* Failover.
* Failback.
* Consistencia de Datos.
* Replicación de Datos.
* Almacenamiento NoSQL.
* Redundancia.

## Caso de estudio:

* AppServer1 (10.131.137.220)
* AppServer2 (10.131.137.166)
* Datanode1  (10.131.137.234)
* Datanode2  (10.131.137.209)
* Datanode3  (10.131.137.228)

En cada uno de los DataNodes hay una instancia de mongodb corriendo en el puerto 27017

Para comprobar el funcionamiento, en robomongo conectese a:

10.131.137.234:27017 ,

10.131.137.209:27017 y

10.131.137.228:27017

Despues de configurar el Replica Set como se muestra en la documentacion [de la implementacion de los datanodes](https://github.com/emonto15/topicostelematicaproyecto2/blob/master/implementacion/datanodes/README.md) 
Conectarse a una instancia de [Robomongo](https://robomongo.org/) (en las ultimas versiones para que tenga soporte del ReplSet) para verificar su funcionamiento.

### Uso de Particiónamiento en File System

* Software GlusterFS

      http://www.gluster.org/


Este File System puede tener las siguientes funciones:

* Failover.
* Failback.
* Particionaminto de Archivos.
* Redundancia.

## Caso de estudio:

* AppServer1 (10.131.137.220)
* AppServer2 (10.131.137.166)
* Datanode1  (10.131.137.234)
* Datanode2  (10.131.137.209)
* Datanode3  (10.131.137.228)

En cada uno de los DataNodes (servidor) y los AppServers (cliente) hay una instancia de gluster corriendo en los puertos 24007 y 24008, 24152, 24153 y 24154.

Para configurar gluster debe seguir los pasos en la documentación [de la implementacion de los datanodes](https://github.com/emonto15/topicostelematicaproyecto2/blob/master/implementacion/datanodes/README.md)

Para comprobar el funcionamiento, en gluster (cliente) busque la carpeta en donde se monto la partición de gluster y verifique que allí estén los archivos de los diferentes datanodes; en nuestro caso la carpeta es /mnt/.
