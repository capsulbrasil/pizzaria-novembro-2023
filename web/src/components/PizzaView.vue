<template>
  <template v-for="pizza in pizzas">
    <li>
        <b>{{ pizza.name }}: {{pizza.price}} R$</b>
        <br>
        <small>Ingredientes: {{ pizza.ingredients }}</small>
    </li>
  </template>
</template>
  
<script setup lang="ts">
    type Pizza = {
        ingredients: Array<{
            name: string,
            percentage: number
        }>,
        price: number
    };

    
    function getPizzaName(pizza: Pizza){
        const suffix = pizza.ingredients[1] ? pizza.ingredients[1].name : 'à moda'
        return `${pizza.ingredients[0]?.name} ${suffix}`
    }

    async function getPizzas(minPrice: number, maxPrice: number){
        
      const request = await fetch(`http://127.0.0.1:3000/api/pizza/get-in-price-range?min=${minPrice}&max=${maxPrice}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },  
      });
  
      const data: Array<Pizza> = await request.json();
      console.log(data)
      return data.map(x=>{
        return {
          name: getPizzaName(x),
          ingredients: x.ingredients.map(x=>x.name).join(", "),
          price: x.price
        }
      });
    }

    const pizzas = ref(await getPizzas(0, 100));
    
</script>
  