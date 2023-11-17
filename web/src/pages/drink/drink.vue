
<script setup lang="ts">
import { condenseItem } from '@waltz-ui/web';
import { debug } from 'console';
import { isLeft } from 'sonata-api';

const drinkStore = useStore("drink");

let drinks = reactive([]);
let drinksAreShown = ref(false);

onMounted(async () => {
    getDrinks()
})

async function getDrinks(){
    const result = await drinkStore.$functions.getAll();
    drinks.length = 0;
    drinks.push(result.data);
}

async function showDrinks() {
    getDrinks();
    drinksAreShown.value = true;
}

async function showNonAlchoholDrinks(){
    const result = await fetch('http://127.0.0.1:3000/api/drink/non-alcoholic', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },  
    });
    
    const resultJson = await result.json();

    drinks.length = 0;
    drinks.push(resultJson);
    drinksAreShown.value = true;

}

</script>

<template>
    <div class="tw-flex tw-flex-col tw-items-center tw-py-4">

        <h2>Drinks</h2>
        <div class="tw-flex tw-flex-col tw-items-center">
        <w-button @click="showDrinks()" class="rounded-full">
            <div class="tw-text-md tw-px-2">Retornar Bebidas</div>
        </w-button>
        <div class="tw-my-2"></div>

        <w-button @click="showNonAlchoholDrinks()" class="rounded-full ">
            <div class="tw-text-md tw-px-2">Retornar Bebidas Não Alcóolicas</div>
        </w-button>
        </div>

        <template v-if="drinksAreShown && drinks.length > 0">
            <table class="tw-border-collapse tw-border tw-border-slate-500 tw-mt-5">
                <thead>
                    <tr>
                        <th class="tw-border tw-border-slate-600">Nome</th>
                        <th class="tw-border tw-border-slate-600 tw-px-3">Tipo da Bebida</th>
                        <th class="tw-border tw-border-slate-600 tw-px-3">Preço</th>
                        <th class="tw-border tw-border-slate-600 tw-px-3">É Alcólica</th>
                        <th class="tw-border tw-border-slate-600 tw-px-3">Imagem</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="drink in drinks[0]">
                        <td class="tw-border tw-border-slate-700 tw-pl-3">{{ drink.name }}</td>
                        <td class="tw-border tw-border-slate-700 tw-pl-3">{{ drink.drinktype }}</td>
                        <td class="tw-border tw-border-slate-700 tw-pl-3">{{ drink.price }}</td>
                        <td class="tw-border tw-border-slate-700 tw-pl-3">
                            <div v-if="drink.isalcoholic">✔️</div>
                            <div v-else>❌</div>
                        </td>
                        <td class="tw-border tw-border-slate-700 tw-flex tw-justify-center">
                            <img class="tw-max-h-28" :src="drink.picture.download_link">
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>







    </div>
</template>
