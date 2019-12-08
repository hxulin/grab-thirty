<template>
  <div>grab-thirty</div>
</template>

<script>
  import gameStatus from '@/utils/gameStatus'
  export default {
    name: "grab-thirty",
    mounted() {
      this.$store.dispatch('SetMenuIndex', 0);
      gameStatus.enter();
    }
  }
</script>

<style scoped>

</style>