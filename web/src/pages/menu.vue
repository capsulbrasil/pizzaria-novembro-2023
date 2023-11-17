<script setup lang="ts">
const metaStore = useStore('meta')
await metaStore.$actions.describe()

const router = useRouter()
const color = router.currentRoute.value.meta.color

const colorsMap = {
  pink: [
    'tw-bg-pink-100',
    'tw-border-pink-500'
  ],
  red: [
    'tw-bg-red-100',
    'tw-border-red-500'
  ],
}
</script>

<template>
  <div :class="`
    tw-text-${'lg'}
    tw-font-[500]
    banner--${color}
  `">
    Menu
    <pre>{{ colorsMap[color] }}</pre>
  </div>

  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="less">
.banner {
  &--pink {
    background: pink;
    border: hotpink;
  }
}
</style>
