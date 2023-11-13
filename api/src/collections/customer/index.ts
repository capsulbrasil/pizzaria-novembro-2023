import { defineCollection, useFunctions } from 'sonata-api'
import { Customer, description } from './description'

export const customer = defineCollection(() => ({
  item: Customer,
  description,
  functions: useFunctions<typeof Customer>()([
    'get',
    'getAll',
    'insert',
    'remove',
  ]),
  accessControl: {
    roles: {
      root: {
        grantEverything: true
      },
      guest: {
        grant: [
          'get',
          'getAll'
        ]
      }
    }
  }
}))
