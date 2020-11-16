const broker = require('../init')

broker.createService({
  settings: {
    port: process.env.PORT || '3000'
  },
  name: 'details',
  actions: {
    async helloWorld () {
      return ('Hello World!')
    }
  }
})
