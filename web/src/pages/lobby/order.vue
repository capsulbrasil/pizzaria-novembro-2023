<route lang="yaml">
    meta:
      title: Pedidos 📋
      icon: dashboard
      color: order
</route>

<script setup lang="ts">
import { isLeft } from 'sonata-api';

const pizzaStore = useStore("pizza");
const drinkStore = useStore("drink");
const comboStore = useStore("combo");

const orderStore = useStore("order");

const pizzas = reactive([])
const combos = reactive([])
const drinks = reactive([])

const selectedPizzaId = ref("");
const selectedDrinkId = ref("");
const selectedComboId = ref("");

const cart = reactive({})
const cartOpen = ref(false)

async function getPizzas() {
    const result = await pizzaStore.$functions.getAll();
    pizzas.length = 0;
    pizzas.push(result.data);
}
async function getDrinks() {
    const result = await drinkStore.$functions.getAll();
    drinks.length = 0;
    drinks.push(result.data);
}
async function getCombos() {
    const result = await comboStore.$functions.getAll();
    combos.length = 0;
    combos.push(result.data);
}

onMounted(async () => {
    getPizzas();
    getDrinks();
    getCombos();
})


function addPizza() {
    console.log(selectedPizzaId.value);
    let isAlreadyAdd = ref(false);
    const pizza = pizzas[0].find(pizza => pizza._id == selectedPizzaId.value);

    if (cart["pizzas"] == undefined) {
        cart["pizzas"] = [];
    }

    cart["pizzas"].forEach(item => {
        if (item.pizza._id == selectedPizzaId.value) {
            item.quantity += 1;
            isAlreadyAdd.value = true;
        }
    });

    if (!isAlreadyAdd.value) {
        cart["pizzas"].push({
            quantity: 1,
            pizza,
        });
    }
    cartOpen.value = true;
}

function addDrink(){
    console.log(selectedDrinkId.value);
    let isAlreadyAdd = ref(false);
    const drink = drinks[0].find(drink => drink._id == selectedDrinkId.value);

    if (cart["drinks"] == undefined) {
        cart["drinks"] = [];
    }

    cart["drinks"].forEach(item => {
        if (item.drink._id == selectedDrinkId.value) {
            item.quantity += 1;
            isAlreadyAdd.value = true;
        }
    });

    if (!isAlreadyAdd.value) {
        cart["drinks"].push({
            quantity: 1,
            drink,
        });
    }
    cartOpen.value = true;
}

function addCombo(){
    console.log(selectedComboId.value);
    let isAlreadyAdd = ref(false);
    const combo = combos[0].find(combo => combo._id == selectedComboId.value);

    if (cart["combos"] == undefined) {
        cart["combos"] = [];
    }

    cart["combos"].forEach(item => {
        if (item.combo._id == selectedComboId.value) {
            item.quantity += 1;
            isAlreadyAdd.value = true;
        }
    });

    if (!isAlreadyAdd.value) {
        cart["combos"].push({
            quantity: 1,
            combo
        });
    }
    cartOpen.value = true;
}



const orderInsert = async () => {
    cartOpen.value = false;

    const orderResult = await orderStore.$actions.deepInsert({
        what: cart
    });

    // if(isLeft(orderResult)){
    //     // console.log(orderResult);
    //     return;
    // }
    cartOpen.value = false;
    alert("Adicionado!");
}

const openCart = () => {
    cartOpen.value = true;
    console.log(cart);
}



</script>

<template>

    <div>
        <div class="tw-flex tw-justify-center">
            <h4>Adicionar pizza ao carrinho</h4>
        </div>
        <div class="tw-flex tw-justify-center">
            <select name="" id="" v-model="selectedPizzaId">
                <option v-for="pizza in pizzas[0]" :value="pizza._id">{{ pizza.name }}</option>
            </select>
            <w-button @click="addPizza">Adicionar</w-button>
        </div>
    </div>

    <div>
        <div class="tw-flex tw-justify-center">
            <h4>Adicionar bebida ao carrinho</h4>
        </div>
        <div class="tw-flex tw-justify-center">
            <select name="" id="" v-model="selectedDrinkId">
                <option v-for="drink in drinks[0]" :value="drink._id">{{ drink.name }}</option>
            </select>
            <w-button @click="addDrink">Adicionar</w-button>
        </div>
    </div>

    <div>
        <div class="tw-flex tw-justify-center">
            <h4>Adicionar combo ao carrinho</h4>
        </div>
        <div class="tw-flex tw-justify-center">
            <select name="" id="" v-model="selectedComboId">
                <option v-for="combo in combos[0]" :value="combo._id">{{ combo.name }}</option>
            </select>
            <w-button @click="addCombo">Adicionar</w-button>
        </div>
    </div>



    <div class="tw-flex tw-justify-center tw-my-3">
        <aeria-button large @click="openCart">
            Abrir carrinho
        </aeria-button>
    </div>

    <aeria-panel fixed-right close-hint v-model="cartOpen" title="Carrinho" @overlay-click="cartOpen = false">

        <aeria-form v-model="cart" :form="orderStore.$actions.useProperties([
            'pizzas',
            'drinks',
            'combos',
            'customer',
            'name'
        ])" collection="order"></aeria-form>

        <template #footer>
            <aeria-button large @click="orderInsert">
                Fazer pedido
            </aeria-button>
        </template>
    </aeria-panel>
</template>