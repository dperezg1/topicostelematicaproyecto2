# NodeJS Proyecto02

By: 

	Daniel Hoyos Ospina - dhoyoso@eafit.edu.co
    
	Edwin Montoya Jaramillo - emonto15@eafit.edu.co
    
	Daniela Serna Escobar - dsernae@eafit.edu.co
    
	Diego Alejandro Pérez Gutierrez - dperezg1@eafit.edu.co

# Descripción de aplicación

Aplicación web que permite gestionar Peliculas, un CRUD básico de videos (titulo, director, año, genero, tamaño, url de la imagen de la pelicula y video en formato mp4).

# 1. Análisis

## 1.1 Requisitos funcionales:

Peliculas:

1. Crear una pelicula.
2. Buscar peliculas por una parte del titulo
3. Borrar peliculas por Id de la pelicula
4. Listar todas las peliculas de la base de datos que sean publicas
5. Listar y gestionar las peliculas propias de un usuario
6. Listar las peliculas compartidas con un usuario
7. filtrar peliculas por su genero.

Usuario:

1. Crear usuario.
2. Cambiar usuario o contraseña.
3. Borrar usuario.
4. Buscar por nombre de usuario para compartir contraseñas.

## 1.2 Definición de tecnología de desarrollo y despliegue para la aplicación:

* Lenguaje de Programación: Javascript
* Framework web backend: NodeJS - Express
* Framework web frontend: Angular 2 js
* Base de datos: MongoDB
* Web App Server: NodeJS
* Web Server: NGINX

# 2. Desarrollo

Se generó la base del servidor en node, con Yeoman:

  $ yo express

Luego se genero la base del front end de angular 2 con el comando:
  $ ng new MovieD

# 3. Diseño:

## 3.1 Modelo de datos:

  movie:
  {
    title: String,
    year: String,
    genre: String,
    size: String,
    director: String,
    imageUrl: String,
    owner_username: String,
    visibility: String,
    shared_with: [String]
  }

  user: 
  {
    username: String,
    password: String
  }

## 3.2 Servicios Web
### Peliculas

  /* Servicio Web: Crear Pelicula
    Método: POST
    Autenticado: SI
    URI: /movie
    Body:
    {
    "title": val,
    "year": val,
    "genre": val,
    "size": val,
    "director": val,
    "imageUrl": val,
    "owner_username": val,
    "visibility" : ["private"| "public"],
     "sharedWith": val[]
   }
  */
  /* Servicio Web: Listar todas las peliculas publicas
    Método: GET
    Autenticado: NO
    URI: /movie
  */
  
  /* Servicio Web: Buscar pelicula publica por titulo
    Método: POST
    Autenticado: NO
    URI: /searchMovie
    Body:
    {
    "searchTerm": val
    }
  */
  
  /* Servicio Web: Listar todas las peliculas privadas
    Método: POST
    Autenticado: SI
    URI: /myContent
    Body:
    {
    "username": val
    }
  */
  
  /* Servicio Web: Listar las peliculas compartidas con el usuario.
    Método: POST
    Autenticado: SI
    URI: /sharedWithMe
    Body:
    {
    "username": val
    }
  */
  
  /* Servicio Web: Actualizar pelicula
    Método: POST
    Autenticado: SI
    URI: /update
    Body:
    {
      "_id": val,
      "title": val,
      "year": val,
      "genre": val,
      "size": val,
      "director": val,
      "imageUrl": val,
      "owner_username": val,
      "visibility" : ["private"| "public"],
    }
  */
  
  /* Servicio Web: Borrar cancion por Id
    Método: POST
    Autenticado: SI
    URI: /deleteMovie
    Body:
    {
      "_id": "val"
    }
  */  

  /* Servicio Web: Listar peliculas por genero
    Método: POST
    Autenticado: SI
    URI: /movieGenre
    Body:
    {
      "searchTerm": "val"
    }
  */  

  /* Servicio Web: Listar peliculas por genero
    Método: POST
    Autenticado: SI
    URI: /shareMovie
    Body:
    {
      "_id": "val",
      "username":"val"
    }
  */  


### Usuarios

  /* Servicio Web: Crear usuario
    Método: POST
    Autenticado: NO
    URI: /signup
    Body: 
    {
      "username": "usuario",
      "password": "password"
    }
  */

  /* Servicio Web: Ingresar a la plataforma con un usuario
    Método: POST
    Autenticado: NO
    URI: /login
    Body: 
    {
      "username": "usuario",
      "password": "password"
    }
  */

  /* Servicio Web: Actualizar usuario
    Método: POST
    Autenticado: SI
    URI: /updateUsername
    Body: 
    {
      "username": val,
      "_id": val
    }
  */

  /* Servicio Web: Actualizar contraseña de usuario.
    Método: POST
    Autenticado: SI
    URI: /updatePassword
    Body: 
    {
      "password": val,
      "_id": val
    }
  */
  
  /* Servicio Web: Borrar usuario
    Método: POST
    Autenticado: SI
    URI: /deleteUser
    {
      "username": val
    }
  */

  /* Servicio Web: buscar usuario
    Método: POST
    Autenticado: SI
    URI: /searchUser
    {
      "searchTerm": val
    }
  */

  /* Servicio Web: logout usuario
    Método: GET
    Autenticado: SI
    URI: /logout
  */

  /* Servicio Web: traer informaciÃ³n de sesiÃ³n de usuario.
    Método: GET
    Autenticado: SI
    URI: /userInfo
  */

# 4. Despligue en un Servidor Centos 7.x en el DCA

## 4.1 Se instala nvm local para el usuario

source: https://www.liquidweb.com/kb/how-to-install-nvm-node-version-manager-for-node-js-on-centos-7/

      user1$ nvm install v7.7.4

## 4.2 Se instala se instala el package del front end con todas las dependencias de angular y angular

      dhoyoso$ npm install --save

## 4.3 Se instala el servidor mongodb

como root:

      user1$ sudo yum install mongodb-server -y'

ponerlo a correr:

      user1$ sudo systemctl enable mongod
      user1$ sudo systemctl start mongod

## 4.4 Se instala NGINX

      user1$ sudo yum install nginx
      user1$ sudo systemctl enable nginx
      user1$ sudo systemctl start nginx

Abrir el puerto 80

      user1$ sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
      user1$ sudo firewall-cmd --reload

## 4.5 Abrir los puertos en el firewall que utilizará la app:

      user1$ firewall-cmd --zone=public --add-port=5000/tcp --permanent
      user1$ firewall-cmd --reload
      user1$ firewall-cmd --list-all

## 4.6 Se instala un manejador de procesos de nodejs, se instala: PM2 (http://pm2.keymetrics.io/)

      user1$ npm install -g pm2
      user1$ cd dev/topicostelematicap1-2/
      user1$ pm2 start app.js
      user1$ pm2 list

ponerlo como un servicio, para cuando baje y suba el sistema:    

      user1$ sudo pm2 startup systemd

Deshabilitar SELINUX

          user1$ sudo vim /etc/sysconfig/selinux

                SELINUX=disabled

          user1$ sudo reboot      

### 4.7 Configuración del proxy inverso en NGINX para cada aplicaión:

      // /etc/nginx/nginx.config
      .
      .
      server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  10.131.137.219:8081;
        root         /usr/share/nginx/html;
      .
      .

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


