<route lang="yaml">
    meta:
      title: Drink
      icon: drink
</route>
    
<script setup lang="ts">
import Pizza from "./pizza.vue"
import Combo from "./combo.vue"
import Drink from "./drink.vue"

const drinkStore = useStore("drink");

let drink = ref({
  name: "teste"
})


async function getDrinks() {
  drink = await drinkStore.$functions.getAll()
}



</script>

<template>
  <div class="tw-flex tw-justify-center tw-py-12">
    <div>
      <h1>Pizzaria Fina 🗿🍷🍕</h1>
    </div>
  </div>

  <div class="tw-border-t-2 border-sky-500">
    <Pizza />
  </div>

  <div class="tw-border-t-2 border-sky-500">
    <Drink />
  </div>

  <div class="tw-border-2 border-sky-500">
    <Combo />
  </div>


  <!-- <div>
        <w-button @click="getDrinks()">
          Reativo
        </w-button>
      </div>

      <pre>{{ drink }}</pre> -->
</template>


    