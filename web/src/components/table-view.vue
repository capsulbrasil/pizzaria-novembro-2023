<template>
  <table class="tw-border-separate tw-border-spacing-3 [&>tr:last-child>div]:tw-border-b-0">
    <tr v-for="table in tables" :key="table.number">
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

  type Table = {
    number: number,
    characteristic: string
  }

  const props = defineProps({
    tables: Array<Table>
  });

</script>
