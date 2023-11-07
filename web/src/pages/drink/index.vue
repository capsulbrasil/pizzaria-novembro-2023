<route lang="yaml">
    meta:
      title: Drink
      icon: drink
</route>
    
<script>
export default {
  data() {
    return {
      likes: 0
    }
  },
  methods: {
    increment() {
      this.likes++
    }
  }
}

</script>

<template> 
  <h1>Seja bem-vindo</h1>
  {{ likes }}


  <button action="alert('aaaa1')">aaaaaaaaa</button>

</template>


    