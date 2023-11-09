
<script setup lang="ts">
import { debug } from 'console';


const drinkStore = useStore("drink");

let drinks = reactive([])

async function getDrinks(){
    const result = await drinkStore.$functions.getAll()
    console.log(result.data)
    drinks = result.data;
    console.log(drinks);
}


</script>

<template>
    <div class="tw-flex tw-flex-col tw-items-center tw-py-4">
        <h2>Drinks</h2>
        <div>
        <w-button @click="getDrinks()" class="rounded-full ">
            <div class="tw-text-md tw-px-2">Retornar Bebidas</div>
        </w-button>
        <template v-if="drinks.length > 0">
            {{ drinks }}
        </template>
        </div>
        <h3>Criar Bebida</h3>
        <h3>Editar Bebida</h3>
        <h3>Deletar Bebida</h3>
    </div>
</template>
