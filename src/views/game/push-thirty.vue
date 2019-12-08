<template>
  <div>push-thirty</div>
</template>

<script>
  import gameStatus from '@/utils/gameStatus'
  export default {
    name: "push-thirty",
    mounted() {
      this.$store.dispatch('SetMenuIndex', 0);
      gameStatus.enter();
    }
  }
</script>

<style scoped>

</style>