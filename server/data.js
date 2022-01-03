const elasticsearch = require('elasticsearch')

const client = new elasticsearch.Client({
  hosts: ['http://localhost:9200']
})

client.indices.create(
  {
    index: 'elastic-vue-customers'
  },
  function(error, response, status) {
    if (error) {
      console.log(error)
    } else {
      console.log('created a new index', response)
    }
  }
)

const customers = require('./customers.json')
var bulk = []
customers.forEach(customer=> {
  bulk.push({
    index: {
      _index: 'elastic-vue-customers',
      _type: 'customers_list'
    }
  })
  bulk.push(customer)
})

client.bulk({ body: bulk }, function(err, response) {
  if (err) {
    console.log('Failed Bulk operation', err)
  } else {
    console.log('Successfully imported %s', customers.length)
  }
})
