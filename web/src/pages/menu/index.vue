<route lang="yaml">
    meta:
      title: Menu
      icon: dashboard
</route>
    
<script lang="ts">
import PizzaView from '../../components/PizzaView.vue';
import TableView from '../../components/TableView.vue';
  
</script>

<template>

  <div class="left-panel tw-bg-gray-100">
    <a href="http://localhost:8080/user/signin">
      <img src="../../../static/logo.png" width="120" height="100">
    </a>
  </div>

  <div class="table-panel">
    <h1>Pizzas Disponíveis:</h1>
    <ul>
      <PizzaView></PizzaView>
    </ul>

  </div>


  <div class="table-panel">
    <h1>Mesas Disponíveis:</h1>
    <table>
      <TableView></TableView>
    </table>
  </div>

</template> 

<style>
  table{
      border-collapse: separate;
      border-spacing: 1lvh;
  }
  li{
    margin-top: 1lvh;
    font-size: large;
  }
  tr{
    font-weight: bold;
    font-size: large;
  }
  .table-panel{
    margin-left: 12%;
    margin-top: 2lvh	;
  }

  .left-panel{
    width: 10%;
    height: 100%;
    padding: 5pt;
    left: 0;
    top: 0;
    position: absolute;
    margin: 0;
  }

  h1{
    text-decoration: underline;
  }
</style>