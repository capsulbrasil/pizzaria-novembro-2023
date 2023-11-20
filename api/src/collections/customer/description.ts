import { defineDescription } from 'sonata-api'

export const [Customer, description] = defineDescription({
  $id: 'customer',
  icon: 'head-side',
  indexes: [
    "name"
  ],
  properties: {
    name: {
      type: 'string',
    },
    phone_number: {
      type: 'number'
    },
    number_of_orders: {
      type: 'number',
      default: 0,
    }
  },
  required: ["name", "phone_number"],
  presets: [
    'crud'
  ],
})
