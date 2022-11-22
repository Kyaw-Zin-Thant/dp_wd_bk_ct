const env = process.env.NODE_ENV || 'local'

const envConfig = {
  local: {
    port: 7001,
    db: {
      user: 'dpwt',
      pass: 'Bba?Dk=k:Jv{Q9S<A_e=G&b`h_b;[X?Z',
      dbName: 'dpwtbkct',
      host: 'localhost',
      dbPort: '8081'
    }
  },
  development: {
    port: 7001,
    db: {
      user: 'dpwt',
      pass: 'Bba?Dk=k:Jv{Q9S<A_e=G&b`h_b;[X?Z',
      dbName: 'dpwtbkct',
      host: '127.0.0.1',
      dbPort: '27017'
    }
  },
  production: {
    port: 7001,
    db: {
      user: 'pte',
      pass: 'Bba?Dk=k:Jv{Q9S<A_e=G&b`h_b;[X?Z',
      dbName: 'dpwtbkct',
      host: '127.0.0.1',
      dbPort: '27017'
    }
  }
}

exports.config = {
  ...envConfig[env]
}
