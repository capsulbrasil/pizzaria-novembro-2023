
<script setup lang="ts">
import { debug } from 'console';


const drinkStore = useStore("drink");

let drinks = reactive([])
let drinksAreShown = ref(false);

async function getDrinks(){
    drinksAreShown.value = true;
    const result = await drinkStore.$functions.getAll();
    drinks.push(result.data);
}

let drinkToCreate = reactive({
    name: "",
    drinktype: "",
    price: "",
    isalcoholic: "",
    picture: ""
});

async function createDrink(){
    console.log(drinkToCreate);
    const result = await drinkStore.$functions.insert(drinkToCreate);
}

</script>

<template>
    <div class="tw-flex tw-flex-col tw-items-center tw-py-4">
        <h2>Drinks</h2>
        <w-button @click="getDrinks()" class="rounded-full ">
            <div class="tw-text-md tw-px-2">Retornar Bebidas</div>
        </w-button>
        <template v-if="drinks.length > 0">
            <table class="tw-border-collapse tw-border tw-border-slate-500 tw-mt-5">
                        <thead>
                            <tr>
                                <th class="tw-border tw-border-slate-600">Nome</th>
                                <th class="tw-border tw-border-slate-600">Tipo da Bebida</th>
                                <th class="tw-border tw-border-slate-600">Preço</th>
                                <th class="tw-border tw-border-slate-600">É Alcólica</th>
                                <th class="tw-border tw-border-slate-600">Imagem</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="drink in drinks[0]">
                                <td class="tw-border tw-border-slate-700">{{ drink.name }}</td>
                                <td class="tw-border tw-border-slate-700">{{ drink.drinktype }}</td>
                                <td class="tw-border tw-border-slate-700">{{ drink.price }}</td>
                                <td class="tw-border tw-border-slate-700">
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
        <h3>Criar Bebida</h3>
        <form action="" @submit.prevent="createDrink" >

            <label for="name">Nome</label>
            <input type="text" name="name" id="name" v-model="drinkToCreate.name">
            
            <label for="drinktype">Tipo da Bebida</label>
            <input type="text" name="drinktype" id="drinktype" v-model="drinkToCreate.drinktype">

            <label for="price">Preço</label>
            <input type="text" name="price" id="price" v-model="drinkToCreate.price">

            <label for="isalcoholic">É Alcólica</label>
            <input type="checkbox" name="isalcoholic" id="isalcoholic" v-model="drinkToCreate.isalcoholic">
<!-- 
            <label for="picture">Imagem</label>
            <input type="file" id="picture" v-model="drinkToCreate.picture"> -->

            <button>Submit</button>

        </form>
        <h3>Editar Bebida</h3>
        <h3>Deletar Bebida</h3>
    </div>
</template>
