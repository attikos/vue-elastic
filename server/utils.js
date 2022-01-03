function getSort(sortBy) {
  switch (sortBy) {
    case 'Registered Low-High': {
      return {
        price: { order: 'asc' }
      }
    }
    case 'Registered High-Low': {
      return {
        price: { order: 'desc' }
      }
    }
    default: {
      return {}
    }
  }
}

function getQuery(search) {
  if (search) {
    return {
      match: {
        name: search
      }
    }
  }
  return { match_all: {} }
}

module.exports.getQuery = getQuery
module.exports.getSort = getSort
