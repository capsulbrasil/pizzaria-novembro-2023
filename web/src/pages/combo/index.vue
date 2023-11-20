<route lang="yaml">
    meta:
      title: Drink
      icon: drink
      color: blue
</route>
    
<script setup lang="ts">
import Combo from "../combo/combo.vue"
const metaStore = useStore('meta')
await metaStore.$actions.describe()

</script>

<template>
    
  <div class="tw-flex tw-justify-center tw-py-12 tw-bg-green-100">
    <div>
      <h1>Combos 📦</h1>
    </div>
  </div>

  <div class="tw-border-t-2 border-sky-500 tw-bg-green-50">
    <Combo />
  </div>

</template>


    
