import { defineDescription } from 'sonata-api'

export const [Event, description] = defineDescription({
  $id: 'event',
  icon: 'calendar-alt',
  properties: {
    type:{
      enum: ["Rodízio", "Promoção"],
    },
    start_date:{
      type: 'string',
      format: 'date-time'
    },
    duration_in_minutes:{
      type: 'number',
    },
    discounts:{
      type: 'array',
      items: {
        type: 'object',
        properties: {
          sizes: {
            enum: [
              'Família',
              'Grande',
              'Média',
            ]
          },
          percentage: {
            type: 'number',
            minimum: 0,
            maximum: 100
          }
        }
      }
    },
  },
  presets: [
    'crud'
  ],
  required: ["type", "start_date", "duration_in_minutes"],
  formLayout:{
    fields: {
      discounts: {
        if: {
          operator: 'equal',
          term1: 'type',
          term2: 'Promoção'
        },
      },
    }
  }
})
