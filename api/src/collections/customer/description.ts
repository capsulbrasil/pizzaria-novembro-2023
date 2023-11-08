import { defineDescription } from 'sonata-api'

export const [Customer, description] = defineDescription({
  $id: 'customer',
  icon: 'head-side',
  properties: {
    name: {
      type: 'string',
    },
    id: {
      type: 'number',
    },
    phone_number: {
      type: 'number'
    },
    number_of_orders: {
      type: 'number'
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
