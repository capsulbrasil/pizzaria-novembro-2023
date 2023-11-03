import { defineDescription } from 'sonata-api'

export const [Combo, description] = defineDescription({
  $id: 'combo',
  icon: 'box',
  properties: {
    // pizzas: {
    //   type: 'array',
    //   items: {
    //     $ref: 'pizza',
    //   }
    // },
    drinks: {
      type: 'array',
      items: {
        $ref: 'bebida',
      }
    },
    preco: {
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
