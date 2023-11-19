import { defineDescription } from "sonata-api";

export const [Order, description] = defineDescription({
  $id: "order",
  icon: "box",
  required: ["pizzas", "drinks", "combos"],
  properties: {

    price: {
      type: "number",
      s$getter: (value: any) => {
        const pizzasPrices = value.pizzas.map((pizza: any) => pizza.pizza.price * pizza.quantity);
        const combosPrices = value.combos.map((combo: any) => combo.combo.price * combo.quantity);
        const drinksPrices = value.drinks.map((drink: any) => drink.drink.price * drink.quantity);
        const price = pizzasPrices + combosPrices + drinksPrices;

        return price
      }
    },

    pizzas: {
      type:"array",
      items:{
        type:"object",
        properties:{
          quantity:{
            type:"number",
          },
          pizza:{
            $ref:"pizza",
            s$populate: [ "price" ]
          },
        },
      },
    },

    drinks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          quantity: {
            type: "number",
          },
          drink: {
            $ref: "drink",
            s$populate: [ "price" ]
          },
        }
      }
    },

    combos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          quantity: {
            type: "number",
          },

          combo: {
            $ref: "combo",
            s$populate: [ "price" ]
          },
          
        },
      },
    },

    customer: {
      $ref: "customer",
      s$inline: true
    },
    name: {
      type: "string",
      // s$getter: (value: any) => {
      //   const count = 0; //????? retornaNumeroDePedidos() ou algo assim
      //   const orderName = `# ${count} + ${value.customer.name}`
      //   return orderName;
      // }
    },
  },
  presets: ["crud"],
  formLayout: {
    fields: {
      price:{
        if:{
          operator:"equal",
          term1:"_id",
          term2:[
            null,
            undefined,
          ],
        },
      }
    },
  },
});
