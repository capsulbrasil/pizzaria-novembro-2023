<route lang="yaml">
    meta:
      title: Combos 📦
      icon: dashboard
      color: combo
</route>
    
<script setup lang="ts">
import { debug } from 'console';
import { privateDecrypt } from 'crypto';


const comboStore = useStore("combo");
const orderStore = useStore("order");

let combos = reactive([])
let combosAreShown = ref(false);
let comboPrice = ref(0);

onMounted(async () => {
    getCombos()
})

const cart = reactive([])
const cartOpen = ref(false)

const addToCart = (combo: any) => {
    cart.push(combo)
    cartOpen.value = true
}

const orderInsertPayload = computed(() => {
    const combos = orderStore.item.combos
    return 
})

const order = () => {
    return orderStore.$actions.deepInsert()
}

async function getCombos() {
    const result = await comboStore.$functions.getAll();
    combos.length = 0;
    combos.push(result.data);
    console.log(result.data);
}

async function showCombos() {
    getCombos();
    combosAreShown.value = true;
}

async function showCombosCheaperThan(price: string) {
    const url = "http://127.0.0.1:3000/api/combo/cheaperthan?price=" + price;
    console.log(url);
    const result = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    const resultJson = await result.json();

    combos.length = 0;
    combos.push(resultJson);
    combosAreShown.value = true;

}

</script>

<template>
    <w-box
        fixed-right
        close-hint
        v-model="cartOpen"
        title="Carrinho"
        @overlay-click="cartOpen = false"
    >
        <pre>{{ cart }}</pre>

        <w-form
            v-model="orderStore.item"
            :form="orderStore.$actions.useProperties([
                'customer'
            ])"
            collection="order"
        ></w-form>

        <template #footer>
            <w-button large @click="order">
                Fazer pedido
            </w-button>
        </template>
    </w-box>

    <div class="tw-flex tw-flex-col tw-items-center tw-py-4">

        <h2>Combos</h2>
        <div class="tw-flex tw-flex-col tw-items-center">
            <w-button @click="showCombos()" class="rounded-full">
                <div class="tw-text-md tw-px-2">Retornar Combos</div>
            </w-button>
            <div class="tw-my-2"></div>
            <form class="tw-flex tw-flex-col tw-items-center" action="" @submit.prevent="showCombosCheaperThan(comboPrice.toString())">
                <label for="abaixode">Retornar Combos Abaixo de:</label>
                <input class="tw-mt-5" id="abaixode" type="text" v-model="comboPrice">
                <w-button class="rounded-full tw-mt-5">
                    <div class="tw-text-md tw-px-2">Retornar</div>
                </w-button>
            </form>
        </div>

        <w-grid v-if="combosAreShown && combos.length > 0" class="tw-mt-3">
            <w-card v-for="combo in combos[0]" :key="combo.name">

                <template #footer>
                    <div class="tw-text-lg">{{ combo.name }}</div>
                    <div class="
                        tw-text-[10pt]
                        tw-opacity-80
                        tw-mt-1
                    ">
                    </div>
                </template>
            </w-card>
        </w-grid>

        <!-- <template v-if="combosAreShown && combos.length > 0">
            <table class="tw-border-collapse tw-border tw-border-slate-500 tw-mt-5">
                <thead>
                    <tr>
                        <th class="tw-border tw-border-slate-600">Nome</th>
                        <th class="tw-border tw-border-slate-600 tw-px-3">Preço</th>
                        <th class="tw-border tw-border-slate-600 tw-px-3">Pizzas</th>
                        <th class="tw-border tw-border-slate-600 tw-px-3">Bebidas</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="combo in combos[0]">
                        <td class="tw-border tw-border-slate-700 tw-pl-3">{{ combo.name }}</td>
                        <td class="tw-border tw-border-slate-700 tw-pl-3">{{ combo.price }}</td>
                        <td class="tw-border tw-border-slate-700 tw-pl-3">
                            <ul>
                                <li v-for="pizza in combo.pizzas">{{ pizza.name }}</li>
                            </ul>
                        </td>
                        <td class="tw-border tw-border-slate-700 tw-pl-3">
                            <li v-for="drink in combo.drinks">{{ drink.name }}</li>
                        </td>
                        <td class="tw-border tw-border-slate-700 tw-pl-3">
                            <div class="tw-p-2">
                                <w-button @click="addToCart(combo)">
                                    Adicionar
                                </w-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template> -->


    </div>
</template>
