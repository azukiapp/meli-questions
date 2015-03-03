/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */

// Adds the systems that shape your system
systems({
  auth: {
    // Dependent systems
    depends: [ "mongodb", "mail" ],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/ruby"},
    // Steps to execute before running instances
    provision: [
      "bundle install --path /azk/bundler",
    ],
    workdir: "/azk/#{manifest.dir}/auth",
    shell: "/bin/bash",
    command: "bundle exec rails server --pid /tmp/rails.pid --port $HTTP_PORT --binding 0.0.0.0",
    // command: "bundle exec rackup config.ru --pid /tmp/rails.pid --port $HTTP_PORT --host 0.0.0.0",
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
    export_envs        : {
      MONGODB_URI: "mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_development",
    },
  },
  mail: {
    image : { docker: "kdihalas/mail" },
    scalable : false,
    http : {
      domains: [ "#{manifest.dir}-#{system.name}.#{azk.default_domain}" ],
    },
    ports              : {
      smtp : "25:25/tcp",
      http : "1080/tcp"
    },
    export_envs: {
      MAIL_PORT: "#{net.port.smtp}",
    },
  },
  ngrok: {
    // Dependent systems
    depends: ["app"],
    image : { docker: "gullitmiranda/docker-ngrok" },
    // Mounts folders to assigned paths
    mounts: {
      // equivalent persistent_folders
      '/#{system.name}' : path("./log"),
    },
    scalable: { default: 0,  limit: 1 }, // disable auto start
    // not expect application response
    wait: false,
    http      : {
      domains: [ "#{manifest.dir}-#{system.name}.#{azk.default_domain}" ],
    },
    ports     : {
      http : "4040"
    },
    envs      : {
      NGROK_LOG       : "/#{system.name}/log/ngrok.log",
      NGROK_SUBDOMAIN : "meli-demo",
      NGROK_AUTH      : "ehXzJi7CGRc8jj74W1Ed",
    }
  }
});
