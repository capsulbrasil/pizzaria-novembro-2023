<template>
    <table class="tw-border-separate tw-border-spacing-3">
      <div v-for="table in unreservedTables">
        <tr class="tw-text-xl tw-font-bold">
          <p class="tw-underline tw-inline">
            Mesa <span class="tw-text-red-700 tw-underline">{{ table.number }}</span>
          </p>
          <p class="tw-text-sm tw-inline"> - {{ table.characteristic }}</p>
        </tr>
      </div>
    </table>
  </template>
  
  <script setup lang="ts">
  
    type TableArray = Array<{
        number: number,
        characteristic: string
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
          characteristic: x.characteristic
        }
      });
    }
  
    const unreservedTables = ref(await getUnreservedTables());
    
  </script>
  