<route lang="yaml">
    meta:
      title: Mesas
      icon: dashboard
</route>
    
<script setup lang="ts">
const tableStore = useStore('table')
const customerStore = useStore('customer')

// const panel = ref(false)
// const name = ref('')

const makeReservation = async () => {
  await tableStore.$actions.deepInsert()
}
</script>

<template>
  <!-- <page-panel></page-panel> -->

  <!-- <teleport to="main"> -->
  <!--   <w-box -->
  <!--     float -->
  <!--     close-hint -->
  <!--     title="Painel" -->
  <!--     v-model="panel" -->
  <!--   > -->
  <!--     Teste -->
  <!--   </w-box> -->
  <!-- </teleport> -->

  <!-- <div>nome: {{ name }}</div> -->
  <!-- <w-input v-model="name"> -->
  <!--   Nome -->
  <!-- </w-input> -->

  <!-- <w-button @click="panel = true"> -->
  <!--   Abrir painel -->
  <!-- </w-button> -->

  <pre>{{ tableStore.item }}</pre>

  <w-form
    v-model="tableStore.item"
    :form="tableStore.$actions.useProperties([
      'number',
      'vip',
      'reserved',
      'characteristic'
    ])"
  ></w-form>

  <w-form
    v-model="customerStore.item"
    :form="customerStore.properties"
  ></w-form>

  <w-button @click="makeReservation">
    Reservar
  </w-button>

  <!-- <div class="table-panel tw-ml-44 tw-mt-0"> -->
  <!--   <h1 class="tw-underline">Mesas Disponíveis</h1> -->
  <!--     <table-view></table-view> -->
  <!-- </div> -->

</template> 
