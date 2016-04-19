module.exports = function(shipit) {
  require('dot-env');
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  var environment = {
        development: {
          domain: 'dev.robtarr.net',
          deployTo: process.env.DEVDEPLOYTO,
        },
        production: {
          domain: 'robtarr.net',
          deployTo: process.env.PRODDEPLOYTO,
        },
      }

  shipit.initConfig({
    default: {
      workspace: '/tmp/robtarr-net',
      repositoryUrl: 'git@github.com:robtarr/website.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      key: '/Users/Rob/.ssh/id_rsa',
      shallowClone: false,

      shared: {
        files: [
          '.env.json',
          {
            path: './shared/.env.json',
          },
        ],
      },
    },

    development: {
      deployTo: environment.development.deployTo,
      servers: process.env.DEVSERVER,
      deployDomain: 'dev.robtarr.net',
    },
    production: {
      deployTo: environment.production.deployTo,
      servers: process.env.DEVSERVER,
      deployDomain: 'robtarr.net',
    },
  });

  shipit.on('deployed', function() {
    var domain = environment[shipit.environment].domain;

    return shipit.remote('cd ' + shipit.currentPath +
           ' && npm install && npm run build');
  });
};
