const broker = require('../init')

broker.createService({

  name: 'details',
  actions: {
    async helloWorld () {
      return ('Hello World!')
    }
  }
})
