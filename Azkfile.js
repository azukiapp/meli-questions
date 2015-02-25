/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */

// Adds the systems that shape your system
systems({
  app: {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/node:0.12"},
    // Steps to execute before running instances
    provision: [
      "npm install",
    ],
    workdir: "/azk/#{manifest.dir}/app",
    shell: "/bin/bash",
    command: "npm start",
    wait: {"retry": 20, "timeout": 1000},
    mounts: {
      '/azk/#{manifest.dir}/app': path("./app"),
    },
    scalable: {"default": 2},
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    envs: {
      // set instances variables
      NODE_ENV: "dev",
      PATH: "/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/azk/#{manifest.dir}/app/node_modules/.bin",
    },
  },
  auth: {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/ruby"},
    // Steps to execute before running instances
    provision: [
      "bundle install --path /azk/bundler",
      // "bundle exec rake db:create",
      // "bundle exec rake db:migrate",
    ],
    workdir: "/azk/#{manifest.dir}/auth",
    shell: "/bin/bash",
    command: "bundle exec rackup config.ru --pid /tmp/rails.pid --port $HTTP_PORT --host 0.0.0.0",
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
    },
  },
  mongodb: {
    image : { docker: "dockerfile/mongodb" },
    command : 'mongod --rest --httpinterface',
    scalable: false,
    ports: {
      http: "28017",
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
    export_envs        : {
      MONGODB_URI: "mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_development",
    },
  },
});



