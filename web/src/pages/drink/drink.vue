
<script setup lang="ts">
import { condenseItem } from '@waltz-ui/web';
import { debug } from 'console';


const drinkStore = useStore("drink");

let drinks = reactive([])
let drinksAreShown = ref(false);

onMounted(async () => {
    const result = await drinkStore.$functions.getAll();
    drinks.push(result.data);

})

async function showDrinks(){
    drinksAreShown.value = true;
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
    const result = await drinkStore.$functions.insert({
        what: condenseItem(drinkToCreate)
    });
}

let drinkId = ref("")

async function deleteDrink(){
    const result = await drinkStore.$functions.remove(drinkId);
}

async function editDrink(){
    const result = await drinkStore.$functions.update(drinkId);
}

async function selectDrinkToEdit(){

}

</script>

<template>
    <aeria-grid>
<w-grid>
  <w-card
    v-for="drink in drinks"
    :key="drink.name"
    >
    <template #badge v-if="drink.name">
      <w-badge>Premium</w-badge>
    </template>

    <template #footer>
      <div class="tw-text-lg">{{ drink.name }}</div>
      <div class="
        tw-text-[10pt]
        tw-opacity-80
        tw-mt-1
      ">
      {{ drink.name }}
      </div>
    </template>

    <template #actions>
      <w-icon
        v-clickable
        reactive
        icon="ellipsis-v"
      ></w-icon>
    </template>
  </w-card>
</w-grid>

    <!-- <div class="tw-flex tw-flex-col tw-items-center tw-py-4">

        <h2>Drinks</h2>
        <w-button @click="showDrinks()" class="rounded-full ">
            <div class="tw-text-md tw-px-2">Retornar Bebidas</div>
        </w-button>
        <template v-if="drinksAreShown">
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
        <h3>Criar Bebida</h3>

        <div>
        <form action="" @submit.prevent="createDrink">
            <label for="name">Nome</label>
            <input type="text" name="name" id="name" v-model="drinkToCreate.name">
            
            <label for="drinktype">Tipo da Bebida</label>
            <input type="text" name="drinktype" id="drinktype" v-model="drinkToCreate.drinktype">

            <label for="price">Preço</label>
            <input type="text" name="price" id="price" v-model="drinkToCreate.price">

            <label for="isalcoholic">É Alcólica</label>
            <input type="checkbox" name="isalcoholic" id="isalcoholic" v-model="drinkToCreate.isalcoholic">

            <label for="picture">Imagem</label>
            <input type="file" id="picture" v-model="drinkToCreate.picture">

            <button>Submit</button>

        </form>
    </div>




        <h3>Editar Bebida</h3>
        <form action="" @submit.prevent="editDrink">

            <select name="" id="editDrink" required v-model="drinkId">
                <option value="">Selecione um Item</option>
                <option :value="drink.id" v-for="drink in drinks[0]">{{drink.name}}</option>
            </select>

            <button>Deletar</button>
        </form>


        <h3>Deletar Bebida</h3>
        <form action="" @submit.prevent="deleteDrink">
            <select name="" id="deleteDrink" required v-model="drinkId" @change="onChange($event)">
                <option value="">Selecione um Item</option>
                <option :value="drink.id" v-for="drink in drinks[0]">{{drink.name}}</option>
            </select>

            <button>Deletar</button>
        </form>

    </div> -->
</aeria-grid>
</template>
