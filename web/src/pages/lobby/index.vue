<route lang="yaml">
    meta:
      title: Menu
      icon: dashboard
      color: lobby
</route>

<script setup lang="ts">
    const metaStore = useStore('meta')
    await metaStore.$actions.describe()
</script>


<template>
</template>