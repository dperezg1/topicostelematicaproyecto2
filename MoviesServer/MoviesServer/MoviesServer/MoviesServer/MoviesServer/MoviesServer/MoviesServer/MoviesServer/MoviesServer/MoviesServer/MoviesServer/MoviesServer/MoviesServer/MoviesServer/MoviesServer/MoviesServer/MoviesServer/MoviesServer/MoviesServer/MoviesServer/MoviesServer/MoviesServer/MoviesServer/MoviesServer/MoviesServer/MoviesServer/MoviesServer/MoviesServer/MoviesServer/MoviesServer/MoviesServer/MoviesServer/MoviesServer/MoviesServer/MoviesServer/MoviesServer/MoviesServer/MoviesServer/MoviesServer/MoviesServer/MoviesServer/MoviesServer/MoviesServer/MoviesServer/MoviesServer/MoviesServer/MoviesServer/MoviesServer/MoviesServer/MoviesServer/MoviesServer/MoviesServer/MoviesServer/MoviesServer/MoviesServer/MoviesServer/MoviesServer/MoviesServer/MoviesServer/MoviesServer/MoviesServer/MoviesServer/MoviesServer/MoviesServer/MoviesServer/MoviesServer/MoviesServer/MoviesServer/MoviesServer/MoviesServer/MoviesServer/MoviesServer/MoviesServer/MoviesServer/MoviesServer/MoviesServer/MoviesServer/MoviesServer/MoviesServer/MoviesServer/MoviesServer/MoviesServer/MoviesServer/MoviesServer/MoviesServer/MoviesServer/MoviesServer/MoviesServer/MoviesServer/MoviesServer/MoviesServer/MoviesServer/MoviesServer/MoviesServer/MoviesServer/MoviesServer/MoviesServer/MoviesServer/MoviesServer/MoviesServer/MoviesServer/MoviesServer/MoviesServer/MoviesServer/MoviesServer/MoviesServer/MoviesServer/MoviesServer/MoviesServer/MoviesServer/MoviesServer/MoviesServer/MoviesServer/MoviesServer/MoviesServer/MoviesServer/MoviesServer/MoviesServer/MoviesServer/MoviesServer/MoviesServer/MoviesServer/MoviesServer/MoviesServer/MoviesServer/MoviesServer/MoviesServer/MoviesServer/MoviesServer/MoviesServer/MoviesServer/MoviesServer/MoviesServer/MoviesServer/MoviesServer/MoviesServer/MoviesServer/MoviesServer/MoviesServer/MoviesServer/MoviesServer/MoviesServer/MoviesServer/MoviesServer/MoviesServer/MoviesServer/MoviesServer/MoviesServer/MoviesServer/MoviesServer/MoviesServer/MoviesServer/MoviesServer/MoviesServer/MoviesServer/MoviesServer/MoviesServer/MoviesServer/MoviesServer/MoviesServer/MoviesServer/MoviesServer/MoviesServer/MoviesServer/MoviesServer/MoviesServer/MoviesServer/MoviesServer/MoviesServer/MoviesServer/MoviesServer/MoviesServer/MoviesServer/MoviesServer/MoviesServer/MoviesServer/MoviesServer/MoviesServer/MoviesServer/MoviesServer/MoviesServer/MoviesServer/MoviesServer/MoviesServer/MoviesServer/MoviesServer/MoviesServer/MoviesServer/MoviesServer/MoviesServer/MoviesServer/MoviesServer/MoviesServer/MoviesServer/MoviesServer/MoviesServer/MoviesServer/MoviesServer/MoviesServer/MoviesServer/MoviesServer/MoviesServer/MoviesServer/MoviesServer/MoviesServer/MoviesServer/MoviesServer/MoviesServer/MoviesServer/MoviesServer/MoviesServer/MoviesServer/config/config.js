var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'moviesServer'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://10.131.137.211:27017,10.131.137.209:27017,10.131.137.228:27017/moviesServer-production?replicaSet=mongo-replset'
  },

  test: {
    root: rootPath,
    app: {
      name: 'moviesServer'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://10.131.137.211:27017,10.131.137.209:27017,10.131.137.228:27017/moviesServer-production?replicaSet=mongo-replset'
  },

  production: {
    root: rootPath,
    app: {
      name: 'moviesServer'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://10.131.137.211:27017,10.131.137.209:27017,10.131.137.228:27017/moviesServer-production?replicaSet=mongo-replset'
  }
};

module.exports = config[env];
