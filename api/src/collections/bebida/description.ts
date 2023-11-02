import { defineDescription } from 'sonata-api'

export const [Bebida, description] = defineDescription({
  $id: 'bebida',
  icon: 'glass',
  properties: {
    price: {
      type: 'number'
    },
    drinktype: {
      enum: [
        "Cerveja",
        "Refrigerante",
        "Suco",
        "Água",
        "Vinho",
        "Whisky",
        "Champanhe",
        "Vodka",
        "Tequila",
        "Cachaça",
        "Licor",
        "Gin",
        "Rum",
        "Saquê",
        "Energético",
        "Outros"
      ]
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
