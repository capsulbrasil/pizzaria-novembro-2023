<template>
  <table class="tw-border-separate tw-border-spacing-3 [&>tr:last-child>div]:tw-border-b-0">
    <tr v-for="table in unreservedTables">
      <div class="tw-text-xl tw-font-bold tw-flex tw-place-items-center tw-flex-col tw-mt-1 tw-pb-4 tw-border-b-2 tw-border-black">
        <b class="tw-inline">
          Mesa <span>{{ table.number }}</span>
        </b>
        <b class="tw-text-sm tw-inline">{{ table.characteristic }}</b>
      </div>
    </tr>
  </table>
  <slot></slot>
</template>

<script setup lang="ts">

  type TableArray = Array<{
      number: number,
      characteristic: string,
      reserved: boolean
  }>

  async function getUnreservedTables(){

    const request = await fetch('http://127.0.0.1:3000/api/table/get-unreserved', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },  
    });

    const data: TableArray = await request.json();

    return data.map(x=>{
      return {
        number: x.number,
        characteristic: x.characteristic,
        reserved: x.reserved
      }
    }).sort((a,b)=>a.number - b.number);
  }

  const unreservedTables = ref(await getUnreservedTables());

</script>
