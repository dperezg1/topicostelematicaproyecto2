# Load Balancer Privado

### Firewall:
1. Iniciar el firewall:
```
$ systemctl start firewalld
```
2. Habilitar los puertos necesarios:
```
NGINX

$ firewall-cmd --zone=public --add-port=8081/tcp --permanent

HAProxy

$ firewall-cmd --zone=public --add-port=5001/tcp --permanent

$ firewall-cmd --zone=public --add-port=80/tcp --permanent
```
3. Recargar las reglas del firewall:
```
$ firewall-cmd --reload
```
### HAProxy:
1. Instalar HAProxy:
```
$ yum install -y haproxy
```
2. Configurar el archivo /etc/haproxy/haproxy.cfg:
```
.
.
.
frontend http-in
        bind *:80
.
.
.
        default_backend movie_cluster if host_movie

backend movie_cluster
        balance leastconn
        option httpclose
        cookie JSESSIONID prefix
        server app1 10.131.137.220:3000 cookie A check
        cookie JSESSIONID prefix
        server app2 10.131.137.166:3000 cookie A check
.
.
.
````

### Aplicación
Para su optimo funcionamiento hay que compilar los archivos y mover la carpeta que contiene los js de bootstrap y JQuery a la carpeta que se genera:
```
$ ng build && cp -r src/app/js dist/
```
### NGINX
1. Instalar nginx:
```
$ yum install -y nginx
```
2. Configurar el archivo /etc/nginx/nginx.conf:
```
.
.
.
    server {
        listen       8081;
        server_name  10.131.137.219;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
location / {
                 if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        #
        # Custom headers and headers various browsers *should* be OK with but aren't
        #
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
        #
        # Tell client that this pre-flight info is valid for 20 days
        #
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
     }
     if ($request_method = 'POST') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
        add_header 'Access-Control-Expose-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
     }
     if ($request_method = 'GET') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
        add_header 'Access-Control-Expose-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
     }
         alias /home/user1/topicostelematicap1-2/MovieD/dist/;
         try_files $uri$args $uri$args/ /index.html;
        }
.
.
.
```
