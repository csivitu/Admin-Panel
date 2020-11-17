const broker = require('../init')

broker.createService({

  name: 'exports',
  actions: {
    async helloWorld () {
      return ('Hello World!')
    }
  }
})
