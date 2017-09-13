# SEGURIDAD

## HTTPS

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
        acl host_proyecto17n hdr(host) -i proyecto17.dis.eafit.edu.co
        acl host_apiProyecto17n hdr(host) -i proyecto17api.dis.eafit.edu.co
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
        use_backend proyecto17_cluster if host_proyecto17n
        use_backend apiProyecto17_cluster if host_apiProyecto17n
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

## Firewall
para configurar el firewall de las diferentes maquinas  se deben seguir los siguientes pasos
1. prender el firewall con el siguiente comando: 
```
systemctl start firewalld
```
2. habilitar los puertos que la aplicacion necesita:
```
firewall-cmd --zone=public --add-port=<numero de puerto>/tcp --permanent
```
Nota: donde "numero de puerto" es el puerto a abilitar.

los puertos necesarios para que la aplicacion funcione son los siguientes:

* para la maquina 166: los puertos tcp 3000(node)
* para la maquina 209: los puertos tcp 24007(glusterfs),49152(glusterfs),49150(glusterfs),49152(glusterfs),49151(glusterfs),49149(glusterfs), 27017(mongodb)
* para la maquina 220: los puertos tcp 3000(node)
* para la maquina 228: los puertos tcp 24007(glusterfs),49152(glusterfs), 49150(glusterfs), 49151(glusterfs), 49149(glusterfs) 				27017(mongodb)
* para la maquina 234: los puertos tcp 24007(glusterfs),49152(glusterfs),49149(glusterfs),49151(glusterfs),49150(glusterfs),27017  				(mongodb)
* para la maquina 219: los puertos tcp 8081(ngingx), 5001(haproxy), 80(haproxy)

3. por ultimo hacer reload del firewall:

```
firewall-cmd --reload
```

## Seguridad en los REST

Para asegurar los REST se utilizo passport, este cuando una persona se loguea crea una cookie en el navegador,
esa cookie se esta enviando constantemente con los REST y verificando que esta sea correcta con este metodo:
```
exports.estaAutenticado = function (req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }else{
    res.status(401).send('Tienes que hacer log in para acceder a este recurso');
  }
}

```
de esta manera solo las personas que estan autorizadas para ciertos REST los pueden utilizar.

## SSO

La autenticacion se hace contra google oauth con passport, los pasos para este serian:

1) pedir las credenciales en google para poder utilizar el api de oauth
```
clientID:  "894365078349-b282nb278osvhnktku33s3ovrm247jks.apps.googleusercontent.com",
clientSecret: "K9WosmWdumb90PyjFKKaWa2b",
callbackURL: 'http://proyecto17api.dis.eafit.edu.co/login/google/callback'
```
2)implementar una Googlestrategy con passport, la cual se encuentra en el archivo de configuracion passport.js
```
.
.
.
var GoogleStrategy = require('passport-google-oauth20').Strategy;
.
.
.
passport.use(new GoogleStrategy({
    clientID:  "894365078349-b282nb278osvhnktku33s3ovrm247jks.apps.googleusercontent.com",
    clientSecret: "K9WosmWdumb90PyjFKKaWa2b",
    callbackURL: 'http://proyecto17api.dis.eafit.edu.co/login/google/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(function(){
      Usuario.findOne({'google.id': profile.id}, function(err, user){
        console.log(user,"google")
        if(err)
          return cb(err);
        if(user)
          return cb(null, user);
        else {
          var newUser = new Usuario();
          newUser.username = profile.emails[0].value;
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.name = profile.displayName;
          newUser.google.email = profile.emails[0].value;

          newUser.save(function(err){
            if(err)
              throw err;
            return cb(null, newUser);
          })
        }
      });
    });
}));
.
.
.
```
3) El boton de google llama al servicio www.proyecto17api.eafit.edu.co/login, este redirecciona a la pagina de google
para hacer login, este servicio se encarga de si el usuario no ha sido creado, lo crea 
y lo guarda con los siguientes datos:
```
username: String,
google: {
      id: String,
      token: String,
      email: String,
      name: String
}
```
