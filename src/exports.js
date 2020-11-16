const broker = require('../init')

broker.createService({
  settings: {
    port: process.env.PORT || '3000'
  },
  name: 'exports',
  actions: {
    async helloWorld () {
        return( 'Hello World!');
      }
    }
})
