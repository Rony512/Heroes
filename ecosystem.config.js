module.exports = {
    apps: [{
      name: 'tutorial-2',
      script: './index.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-52-209-166-225.eu-west-1.compute.amazonaws.com',
        key: '~/.ssh/tutorial-2.pem',
        ref: 'origin/master',
        repo: 'https://github.com/KaelEuronymous/Heroes.git',
        path: '/home/ubuntu/heroes',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }