module.exports = {
  apps : [{
    name   : "deerman",
    script : "./deerman.js",
	env: {
		NODE_ENV: "production"
	},
	env_development: {
		NODE_ENV: "development"
	}
  }],
  sudoUserSetup: "https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps"
}
