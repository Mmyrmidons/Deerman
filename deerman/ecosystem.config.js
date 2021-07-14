module.exports = {
  apps : [{
    name: 'deerman',
    script: './deerman.sh',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'one two',
    instances: 1,
    autorestart: true,
	watch: true,
//    watch: ["watcher"],
//	watch_delay: 1000,
//    ignore_watch : ["node_modules"],
    watch_options: {
      "followSymlinks": true
    },
	max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '206.81.11.210',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
