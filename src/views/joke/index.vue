<template>
  <div class="joke">
    <van-nav-bar>
      <div slot="title">
        <van-icon class="title-icon" name="smile-comment-o"></van-icon>
        <span>开心一刻</span>
      </div>
    </van-nav-bar>
  </div>
</template>

<script>
  import { NavBar, Icon } from 'vant';
  export default {
    name: "Joke",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon
    },
  }
</script>

<style lang="scss" scoped>
  .joke {
    height: calc(100vh - 50px);
    background-color: #EFEFEF;

    .title-icon {
      margin-right: 3px;
      color: #323233;
      position: relative;
      top: -2px
    }
  }
</style>
