import { defineDescription } from 'sonata-api'

export const [Combo, description] = defineDescription({
  $id: 'combo',
  icon: 'box',
  indexes: [
    "name"
  ],
  properties: {
    pizzas: {
      type: 'array',
      items: {
        $ref: 'pizza',
      },
      s$populate: [ "ingredients" ]
    },
    drinks: {
      type: 'array',
      items: {
        $ref: 'drink',
      }
    },
    price: {
      type: 'number'
    },
    name: {
      type: 'string'
    }
  },
  presets: [
    'crud'
  ],
  formLayout: {
    fields: {
    }
  }
})
