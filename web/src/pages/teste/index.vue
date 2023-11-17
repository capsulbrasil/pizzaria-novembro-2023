<template>
    <div id="app">
        <table>
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                <td v-for="(item, colIndex) in row" :key="colIndex">
                    <h3>
                        {{ item.start_date.toLocaleDateString() }} - das {{ item.start_time }} ás {{ item.end_time }}
                    </h3>
                    <div>
                        <div v-for="discount in item.discounts" class="tw-whitespace-nowrap">Pizza tamanho {{
                            discount.sizes }} = {{ discount.percentage }}% de desconto</div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';


const oneMinuteInMiliseconds = 60000;

type EventArray = Array<{
    type: string,
    start_date: string,
    duration_in_minutes: number,
    discounts?: Array<{
        sizes: string,
        percentage: number
    }>
}>

async function getNextEvents() {

    const request = await fetch('http://127.0.0.1:3000/api/event/get-in-next-days?days=300', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });

    const data: EventArray = await request.json();

    return data.map(x => {
        const startDate = new Date(x.start_date);
        const endTime = new Date(Date.parse(x.start_date) + x.duration_in_minutes * oneMinuteInMiliseconds);
        return {
            type: x.type,
            start_date: new Date(x.start_date),
            start_time: startDate.getHours() + ":" + startDate.getMinutes(),
            end_time: endTime.getHours() + ":" + startDate.getMinutes(),
            discounts: x.discounts
        }
    });
}

const nextEvents = ref(await getNextEvents());
const sales = nextEvents.value.filter(x => x.type == "Promoção");

const items = sales;
const itemsPerRow = 3;

function compute() {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
        rows.push(items.slice(i, i + itemsPerRow));
    }
    return rows;
}

const rows = compute();

</script>
  
<style>
/* Estilos para o exemplo */
table {
    border-collapse: collapse;
}

td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    width: 80px;
}
</style>
  