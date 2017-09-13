# LoadBalancer Publico:

### Generación Certificado SSL
1. Se agrega una entrada al certificado existente (st0263.dis.eafit.edu.co):
```
$ sudo /root/certbot-auto certonly -d st0263.dis.eafit.edu.co  --expand -d proyecto17.dis.eafit.edu.co,proyecto17api.dis.eafit.edu.co
```

### HAProxy
1. Agregar los certificados SSL a las URLs:
```
.
.
.
frontend https
    .
    .
    .
    bind proyecto17.dis.eafit.edu.co:443    ssl     crt     /etc/haproxy/certs/st0263.pem
    bind proyecto17api.dis.eafit.edu.co:443 ssl     crt     /etc/haproxy/certs/st0263.pem
    .
    .
    .
```
2. Establecer los hosts a los que se redireccionará las URLs tanto en http como en https:
```
frontend https
        .
        .
        .
        acl host_proyecto17 hdr(host) -i proyecto17.dis.eafit.edu.co
        acl host_apiProyecto17 hdr(host) -i proyecto17api.dis.eafit.edu.co
        .
        .
        .
frontend http *:80
        .
        .
        .
        acl host_proyecto17 hdr(host) -i proyecto17.dis.eafit.edu.co
        acl host_apiProyecto17 hdr(host) -i proyecto17api.dis.eafit.edu.co
        .
        .
        .
```
3. Establecer y definir los backends que recibiran los pedidos:
```
        .
        .
        .
        use_backend proyecto17_cluster if host_proyecto17
        use_backend apiProyecto17_cluster if host_apiProyecto17
        .
        .
        .
backend proyecto17_cluster
        balance leastconn
        option httpclose
        cookie JSESSIONID prefix
        server node1 10.131.137.219:8081 cookie A check

backend apiProyecto17_cluster
        balance leastconn
        option httpclose
        cookie JSESSIONID prefix
        server node1 10.131.137.219:80 cookie A check
.
.
.
```
4. Reiniciar el servicio HAProxy:
```
$ service haproxy restart
```
5. Verificar que todo este bien:
```
$ service haproxy status -l
```
