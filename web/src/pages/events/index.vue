<route lang="yaml">
    meta:
      title: Eventos
      icon: dashboard
</route>
    
<template>
  <page-panel></page-panel>
  <div class="tw-ml-44">
    <div>
      <h1 class="tw-underline">Promoções</h1>
      <ul>
        <div v-for="event in sales">
          <h3>
            {{ event.start_date.toLocaleDateString() }} - das {{ event.start_time }} ás {{ event.end_time }}
          </h3>
          <ul>
            <li v-for="discount in event.discounts">Pizzas tamanho {{ discount.sizes }} = {{ discount.percentage }}% de desconto</li>
          </ul>
        </div>
      </ul>
    </div>

    <div>
      <h1 class="tw-underline">Rodízios</h1>
      <ul>
        <li v-for="event in rodizios">
          <h3>{{ event.start_date.toLocaleDateString() }} - das {{ event.start_time }} ás {{ event.end_time }}</h3>
        </li>
      </ul>
    </div>
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

const sales = nextEvents.value.filter(x=>x.type == "Promoção");
const rodizios = nextEvents.value.filter(x=>x.type == "Rodízio");

</script>
