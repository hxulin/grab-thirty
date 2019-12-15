<template>
  <div class="joke">
    <van-nav-bar>
      <div slot="title">
        <van-icon class="title-icon" name="smile-comment-o"></van-icon>
        <span>开心一刻</span>
      </div>
      <van-button slot="right" type="default" @click="showMessage">
        <van-icon name="envelop-o"></van-icon>
      </van-button>
    </van-nav-bar>
    <van-divider dashed>茶余饭后，每天为你海选10篇小笑话</van-divider>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了"
              :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
      <van-panel v-for="(item, index) in list" :key="index" :title="item.updateTime">{{ item.content }}</van-panel>
    </van-list>
  </div>
</template>

<script>
  import {NavBar, Icon, Button, Dialog, List, Panel, Divider} from 'vant';
  import request from '@/utils/request'

  export default {
    name: "Joke",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Button.name]: Button,
      [List.name]: List,
      [Panel.name]: Panel,
      [Divider.name]: Divider
    },
    data() {
      return {
        // 最大文件数, 对应翻页数
        total: 2,
        // 初始日期, 标识在此时间前没有数据
        firstDate: '2019-12-12',
        // 总页数
        totalPage: 0,
        // 当前页数
        currentPage: 0,
        loading: false,
        error: false,
        finished: false,
        list: []
      }
    },
    methods: {
      // 板块说明
      showMessage() {
        Dialog.alert({
          title: '板块说明',
          message: '本版块内容由爬虫程序从网络爬取。个人精力有限，部分内容发布前未进行人工筛选、甄别，可能存在小部分偏离主题，还请各位看客一笑而过，雅x共赏~',
          messageAlign: 'left',
          confirmButtonText: '朕知道了'
        }).then(() => {
          // on close
        });
      },
      // 获取元数据
      getMetadata() {
        return new Promise(resolve => {
          if (this.total < 3) {
            request({
              url: '/metadata.json?t=' + new Date().getTime(),
              method: 'get',
            }).then(result => {
              this.total = result.total;
              this.totalPage = Math.abs((Date.parse(new Date().format('yyyy-MM-dd')) - Date.parse(result.firstDate)) / 86400000);
              resolve();
            }).catch(() => {
              // 获取元信息失败, 显示最近3天的记录
              this.total = 3;
              this.totalPage = 2;
              // 放行, 忽略错误
              resolve();
            });
          } else {
            resolve();
          }
        });
      },
      // 加载数据, 异步方法, 需要同步请求元数据
      onLoad() {
        if (this.currentPage <= this.totalPage) {
          this.getMetadata().then(() => {
            request({
              url: '/' + ((this.totalPage - this.currentPage) % this.total) + '.json',
              method: 'get',
            }).then(result => {
              const time = new Date().getTime() - 86400000 * this.currentPage;
              let date = new Date();
              date.setTime(time);
              result.forEach(data => {
                this.list.push({
                  content: data,
                  updateTime: date.format('yyyy-MM-dd')
                });
              });
              this.currentPage++;
            }).catch(() => this.error = true).finally(() => this.loading = false);
          });
        } else {
          this.finished = true;
        }
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

    .van-nav-bar__right {
      right: 0;

      .van-button--normal {
        font-size: 16px;
        height: 50px;
        border: none;
      }

      .van-icon {
        font-size: 16px;
        color: #323233;
      }
    }

    .van-divider {
      background-color: #FFF;
      margin: 2px 0 0;
    }

    .van-list {
      margin-bottom: 50px;
      background-color: #EFEFEF;
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
