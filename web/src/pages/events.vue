<template>
    <router-view></router-view>
    <page-panel></page-panel>
  
    <div class="tw-flex tw-place-items-center tw-flex-col">
      <div class="tw-flex tw-place-items-center tw-flex-col">
        <h1 class="tw-underline">{{$route.meta.title1}}</h1>
        <table class="tw-border-collapse tw-border-hidden">
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td v-for="(item, colIndex) in row" :key="colIndex"
              class="tw-w-80 tw-bg-gray-100 tw-border-2 tw-pb-2 tw-border-black tw-pt-0 tw-align-top tw-rounded-md">
              <div>
                <h3 class="tw-text-center tw-border-b tw-border-black "> {{ item.start_date.toLocaleDateString() }} - das {{
                  item.start_time }} ás {{ item.end_time }} </h3>
                <div v-for="discount in item.discounts" class="tw-ml-2 tw-whitespace-nowrap">Pizza tamanho {{ discount.sizes
                }} = {{ discount.percentage }}% de desconto</div>
              </div>
            </td>
          </tr>
        </table>
      </div>
  
      <div class="tw-flex tw-place-items-center tw-flex-col tw-mt-10">
        <h1 class="tw-underline">{{ $route.meta.title2 }}</h1>
        <ul class="[&>*:last-child]:tw-border-b-0 tw-mr-6">
          <div v-for="event in rodizios" class="tw-border-b-2 tw-border-black">
            <h3>{{ event.start_date.toLocaleDateString() }} - das {{ event.start_time }} ás {{ event.end_time }}</h3>
          </div>
        </ul>
      </div>
    </div>
  </template> 

<script setup lang="ts">

const metaStore = useStore('meta');
await metaStore.$actions.describe();

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
const rodizios = nextEvents.value.filter(x => x.type == "Rodízio");

const itemsPerRow = 4;

function getRows() {
  const rows = [];
  for (let i = 0; i < sales.length; i += itemsPerRow) {
    rows.push(sales.slice(i, i + itemsPerRow));
  }
  return rows;
}

const rows = getRows();

</script>