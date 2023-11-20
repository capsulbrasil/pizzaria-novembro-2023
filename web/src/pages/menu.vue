<template>
  <router-view></router-view>
  <page-panel></page-panel>

  <div class="tw-flex tw-place-items-center tw-flex-col">
    <h1 class="tw-underline">{{ $route.meta.title }}</h1>
    <pizza-view></pizza-view>
  </div>
</template> 

<script setup lang="ts">
const metaStore = useStore('meta');
await metaStore.$actions.describe();
</script>