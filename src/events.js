const broker = require('../init')

broker.createService({
  settings: {
    port: process.env.PORT || '3000'
  },
  name: 'events',
  actions: {
    async helloWorld () {
      return ('Hello World!')
    }
  }
})
