<script setup lang="ts">
const metaStore = useStore('meta')
await metaStore.$actions.describe()

</script>

<template>
  <div class="
    tw-text-black
    tw-text-xl
    tw-p-8
    tw-bg-blue-50
  ">
    {{ $route.meta.title }}
  </div>

  <div class="tw-p-6">
    <router-view></router-view>
  </div>
</template>
