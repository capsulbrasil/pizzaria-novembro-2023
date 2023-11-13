import { defineCollection, useFunctions } from 'sonata-api'
import { Order, description } from './description'

export const order = defineCollection(() => ({
  item: Order,
  description,
  functions: useFunctions<typeof Order>()([
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
