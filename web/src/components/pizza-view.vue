import obj from '../../waltz-ui';
<template>
  <div class="tw-flex">
    <h4 >Filtro de preço:</h4>
    <div class="tw-place-self-center tw-ml-2">
      <small>Min:</small>

      <input class="tw-border-1 tw-border-black tw-w-10 tw-text-center" 
      type="number" v-model="filter_min">

      <small>Max:</small>

      <input class="tw-border-1 tw-border-black tw-w-10 tw-text-center" 
      type="number" v-model="filter_max">
      <button @click="getPizzas(filter_min, filter_max).then(x=>pizzas = x)"
       type="submit" class="tw-h-5">Aplicar</button>
    </div>

  </div>
  
  <div class="tw-border-2 tw-border-black tw-inline-block tw-rounded tw-pr-5">
  <ul>
    <div v-for="pizza in pizzas" v-bind:key="pizza.name">
      <li class="tw-text-lg">
          <b>{{ pizza.name }}: {{pizza.price}} R$</b>
          <br>
          <small>Ingredientes: {{ pizza.ingredients }}</small>
      </li>
    </div>
  </ul>
  </div>
</template>
  
<script setup lang="ts">

    type Pizza = {
        name?: string,
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
      return data.map(x=>{
        return {
          name: getPizzaName(x),
          ingredients: x.ingredients.map(x=>x.name).join(", "),
          price: x.price
        }
      });
    }

    const pizzas = ref(await getPizzas(0, 9999));

    var filter_min: number = 0;
    var filter_max: number = 999;
</script>
  