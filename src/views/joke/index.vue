<template>
  <div class="joke">
    <van-nav-bar>
      <div slot="title">
        <van-icon class="title-icon" name="smile-comment-o"></van-icon>
        <span>开心一刻</span>
      </div>
    </van-nav-bar>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-panel v-for="item in list" :key="item.hashId" title="2019-12-12">{{ item.content }}</van-panel>
    </van-list>
  </div>
</template>

<script>
  import { NavBar, Icon, List, Panel, Toast } from 'vant';
  import request from '@/utils/request'
  export default {
    name: "Joke",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [List.name]: List,
      [Panel.name]: Panel
    },
    data() {
      return {
        // 最大文件数, 对应翻页数
        total: 99,
        // 初始日期, 标识在此时间前没有数据
        firstDate: '2019-12-12',
        loading: false,
        finished: false,
        list: []
      }
    },
    methods: {
      // 获取元数据
      getMetadata() {
        const vm = this;
        return new Promise(function (resolve, reject) {
          if (this.total < 100) {
            request({
              url: '/metadata.json?t=' + new Date().getTime(),
              method: 'get',
            }).then(result => {
              vm.total = result.total;
              // console.log(result.total);
              resolve(0);
            }).catch(() => {
              reject(-1);
            });
          }
        });
      },
      // 请求列表数据
      getData() {
        console.log(11111111111)
      },
      // 加载数据, 异步方法, 需要同步请求元数据
      onLoad() {

          this.getMetadata().then(() => {
            this.getData();
          });

        console.log(this.total);

        console.log((Math.abs((Date.parse(new Date().format('yyyy-MM-dd')) - Date.parse(this.firstDate))/86400000) + 1) % this.total);

        /*request({
          url: '/metadata.json11?',
          method: 'get',
        }).then(result => {
          console.log(result);
        }).catch(() => {
        });*/
          Toast.fail('获取数据失败');
      }
    }
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

    .van-list {
      margin-bottom: 50px;
    }

    .van-panel {
      margin-top: 2px;

      .van-panel__header {
        padding: 10px 16px 0;
      }

      .van-cell__title {
        font-size: 12px;
        color: #666;
      }

      .van-panel__content {
        padding: 12px 16px 25px;
        line-height: 1.5;
      }
    }

    .van-hairline--top-bottom::after {
      border-width: 0;
    }
  }
</style>
