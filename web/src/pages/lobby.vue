<script setup lang="ts">
const metaStore = useStore('meta')
await metaStore.$actions.describe()

const router = useRouter();
const color = router.currentRoute.value.meta.color;
const title = router.currentRoute.value.meta.title;

const colorsMap = {
  drink: [
    'tw-bg-pink-100',
    'tw-border-yellow-500',
    'tw-bg-purple-100'
  ],
  combo: [
    'tw-bg-green-100',
    'tw-border-green-500',
    'tw-bg-green-50'
  ],
  lobby: [
    'tw-bg-gray-100',
    'tw-border-gray-500',
    'tw-bg-gray-50'
  ],
  order:[
    'tw-bg-blue-100',
    'tw-border-sky-500',
    'tw-bg-blue-50'
  ]
}


</script>


<template>

    <div :class="`tw-flex tw-justify-center tw-py-12 ${colorsMap[color.toString()][0]}`">
      <div>
        <h1>{{title.toString()}}</h1>
      </div>
    </div>
    
  
    <div :class="`tw-border-t-2 ${colorsMap[color.toString()][1]} ${colorsMap[color.toString()][2]}`">
        <div class="tw-flex tw-justify-center tw-mt-2">
            <a href="/lobby">Menu</a>
            <div class="tw-mx-2"></div>
            <a href="/lobby/drink">Drinks</a>
            <div class="tw-mx-2"></div>
            <a href="/lobby/combo">Combos</a>
            <div class="tw-mx-2"></div>
            <a href="/lobby/order">Pedidos</a>
        </div>

        <router-view></router-view>
    </div>
  
</template>


