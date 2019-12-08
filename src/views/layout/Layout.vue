<template>
  <div class="layout">
    <router-view/>
    <van-tabbar v-model="menuIndex" @change="onChange">
      <van-tabbar-item icon="fire-o">小游戏</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o">战况统计</van-tabbar-item>
      <van-tabbar-item icon="smile-comment-o">开心一刻</van-tabbar-item>
      <van-tabbar-item icon="more-o">关于</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vant'
  export default {
    name: 'Layout',
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem
    },
    data() {
      return {
        menuRouters: ['/game', '/statistics', '/joke', '/about']
      }
    },
    computed: {
      menuIndex: {
        get() {
          return this.$store.state.menuIndex;
        },
        set(activeIndex) {
          this.$store.dispatch('SetMenuIndex', activeIndex)
        }
      }
    },
    methods: {
      onChange(index) {
        this.$router.push(this.menuRouters[index]);
      }
    }
  }
</script>
