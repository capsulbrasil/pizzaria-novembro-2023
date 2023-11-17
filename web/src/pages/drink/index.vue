<route lang="yaml">
    meta:
      title: Drink
      icon: drink
      color: red
</route>
    
<script setup lang="ts">
import Drink from "./drink.vue"

</script>

<template>

  <div class="tw-flex tw-justify-center tw-py-12 tw-bg-amber-100">
    <div>
      <h1>Bebidas 🍷</h1>
    </div>
  </div>
  

  <div class="tw-border-t-2 border-sky-500 tw-bg-amber-50">
    <Drink />
  </div>


</template>


    
