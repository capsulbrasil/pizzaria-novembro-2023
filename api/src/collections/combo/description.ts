import { defineDescription } from 'sonata-api'

export const [Combo, description] = defineDescription({
  $id: 'combo',
  icon: 'glass',
  properties: {
    pizzas: {
      type: 'array',
      items: {
        type: 'object',
      }
    },
    drinks: {
      type: 'array',
      items: {
        type: 'object',
      }
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
