import { defineCollection, useFunctions } from 'sonata-api'
import { Bebida, description } from './description'

export const bebida = defineCollection(() => ({
  item: Bebida,
  description,
  functions: useFunctions<typeof Bebida>()([
    'get',
    'getAll',
    'insert',
    'remove'
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
