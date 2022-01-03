function getSort(sortBy) {
  switch (sortBy) {
    case 'Registered Low-High': {
      return {
        registered_at: { order: 'asc' }
      }
    }
    case 'Registered High-Low': {
      return {
        registered_at: { order: 'desc' }
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
      fuzzy: {
        name: {
          value: search,
          fuzziness: 2
        }
      }
    }
  }
  return { match_all: {} }
}

module.exports.getQuery = getQuery
module.exports.getSort = getSort
