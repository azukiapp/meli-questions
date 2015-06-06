/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */

// Adds the systems that shape your system
systems({
  questions: {
    depends: [ "auth" ],
    image: {"docker": "azukiapp/node:0.12"},
    provision: [
      "npm install",
    ],
    workdir: "/azk/#{manifest.dir}/#{system.name}",
    shell: "/bin/bash",
    command: "npm start",
    wait: {"retry": 10, "timeout": 1000},
    mounts: {
      '/azk/#{manifest.dir}/#{system.name}': path("#{system.name}"),
      '/azk/#{manifest.dir}/#{system.name}/node_modules': persistent('node_modules'),
    },
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    envs: {
      // set instances variables
      NODE_ENV: "dev",
      PATH: "/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/azk/#{manifest.dir}/#{system.name}/node_modules/.bin",
    },
    export_envs: {
      APP_URL: "#{system.name}.#{azk.default_domain}:#{net.port.http}"
    }
  },

  auth: {
    // Dependent systems
    depends: [ "mongodb" ],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/ruby"},
    // Steps to execute before running instances
    provision: [
      "bundle install --path /azk/bundler",
    ],
    workdir: "/azk/#{manifest.dir}/auth",
    shell: "/bin/bash",
    command: "bundle exec rails server --pid /tmp/rails.pid --port $HTTP_PORT --binding 0.0.0.0",
    wait: {"retry": 20, "timeout": 1000},
    mounts: {
      '/azk/bundler': persistent("bundler"),
      '/azk/#{manifest.dir}/auth': path("./auth"),
    },
    scalable: {"default": 2},
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    envs: {
      // set instances variables
      RAILS_ENV: "development",
      BUNDLE_APP_CONFIG: "/azk/bundler",
      MERCADOLIBRE_APP_ID: "[set yours app id in .env]",
      MERCADOLIBRE_APP_SECRET: "[set yours app secret in .env]"
    },
  },

  mongodb: {
    image : { docker: "azukiapp/mongodb" },
    // command : 'mongod --rest --httpinterface',
    scalable: false,
    ports: {
      http: "28017:28017/tcp",
    },
    http      : {
      // aircrm-mongodb.azk.dev
      domains: [ "#{manifest.dir}-#{system.name}.#{azk.default_domain}" ],
    },
    // Mounts folders to assigned paths
    mounts: {
      // equivalent persistent_folders
      '/data/db'          : persistent('mongodb-#{manifest.dir}'), // Volume nomed
    },
    wait: {"retry": 20, "timeout": 1000},
    export_envs        : {
      MONGODB_URI: "mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_development",
    },
  },

  ngrok: {
    // Dependent systems
    depends: [ "questions" ],
    image : { docker: "azukiapp/ngrok" },
    // Mounts folders to assigned paths
    mounts: {
      // equivalent persistent_folders
      '/#{system.name}.sh'  : path("./#{system.name}.sh"),
      '/#{system.name}/log' : path("./log"),
    },
    scalable: { default: 1,  limit: 1 }, // disable auto start
    // not expect application response
    wait: {"retry": 20, "timeout": 1000},
    http      : {
      domains: [ "#{manifest.dir}-#{system.name}.#{azk.default_domain}" ],
    },
    ports     : {
      http : "4040"
    },
    envs      : {
      NGROK_CONFIG    : "/ngrok/ngrok.yml",
      NGROK_LOG       : "/#{system.name}/log/ngrok.log",
    }
  }
});
