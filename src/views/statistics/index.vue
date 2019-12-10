<template>
  <div class="statistics">
    <van-nav-bar>
      <div slot="title">
        <van-icon class="title-icon" name="bar-chart-o"></van-icon>
        <span>战况统计</span>
      </div>
    </van-nav-bar>
    <div>
      <div class="chart">
        <canvas id="myChart" height="220"></canvas>
      </div>
      <div class="chart">
        <canvas id="myPie" height="220"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
  import { NavBar, Icon } from 'vant';
  import F2 from '@antv/f2';
  import _ from 'lodash';
  export default {
    name: "Statistics",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon
    },
    mounted() {

      const data = [{
        name: '获胜',
        type: '抢三十',
        value: 18.9,
      }, {
        name: '获胜',
        type: '推三十',
        value: 28.8
      }, {
        name: '获胜',
        type: '合计',
        value: 39.2
      }, {
        name: '败北',
        type: '抢三十',
        value: 12.4
      }, {
        name: '败北',
        type: '推三十',
        value: 23.2
      }, {
        name: '败北',
        type: '合计',
        value: 34.5
      }, {
        name: '逃跑',
        type: '抢三十',
        value: 12.4
      }, {
        name: '逃跑',
        type: '推三十',
        value: 23.2
      }, {
        name: '逃跑',
        type: '合计',
        value: 34.5
      }];
      const chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio
      });
      chart.source(data);
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
          const legend = chart.get('legendController').legends.top[0];
          const tooltipItems = obj.items;
          const legendItems = legend.items;
          const map = {};
          legendItems.forEach(function(item) {
            map[item.name] = _.clone(item);
          });
          tooltipItems.forEach(function(item) {
            const name = item.name;
            const value = item.value;
            if (map[name]) {
              map[name].value = value;
            }
          });
          legend.setItems(_.values(map));
        },
        onHide: function onHide() {
          const legend = chart.get('legendController').legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        }
      });

      chart.interval()
        .position('type*value')
        .color('name')
        .adjust({
          type: 'dodge',
          marginRatio: 0.05 // 设置分组间柱子的间距
        });
      chart.render();

      this.drawPie();

    },
    methods: {
      // 绘制柱状图
      drawChart() {

      },
      // 绘制饼状图
      drawPie() {
        const map = {
          芳华: '40%',
          妖猫传: '20%',
          机器之血: '18%',
          心理罪: '15%',
          寻梦环游记: '5%',
          其他: '2%'
        };
        const data = [{
          name: '芳华',
          percent: 0.4,
          a: '1'
        }, {
          name: '妖猫传',
          percent: 0.2,
          a: '1'
        }, {
          name: '机器之血',
          percent: 0.18,
          a: '1'
        }, {
          name: '心理罪',
          percent: 0.15,
          a: '1'
        }, {
          name: '寻梦环游记',
          percent: 0.05,
          a: '1'
        }, {
          name: '其他',
          percent: 0.02,
          a: '1'
        }];
        const chart = new F2.Chart({
          id: 'myPie',
          pixelRatio: window.devicePixelRatio
        });
        chart.source(data, {
          percent: {
            formatter: function formatter(val) {
              return val * 100 + '%';
            }
          }
        });
        chart.legend({
          position: 'right',
          itemFormatter: function itemFormatter(val) {
            return val + '  ' + map[val];
          }
        });
        chart.tooltip(false);
        chart.coord('polar', {
          transposed: true,
          radius: 0.85
        });
        chart.axis(false);
        chart.interval()
          .position('a*percent')
          .color('name', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0' ])
          .adjust('stack')
          .style({
            lineWidth: 1,
            stroke: '#fff',
            lineJoin: 'round',
            lineCap: 'round'
          })
          .animate({
            appear: {
              duration: 1200,
              easing: 'bounceOut'
            }
          });

        chart.render();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .statistics {
    height: calc(100vh - 50px);
    background-color: #EFEFEF;

    .title-icon {
      margin-right: 3px;
      color: #323233;
      position: relative;
      top: -2px
    }

    .chart {
      background-color: #FFF;
      margin-top: 2px;
      text-align: center;
    }

    .content {
      background-color: #FFF;
      margin-top: 2px;
      text-align: center;
      height: calc(100vh - 90px);
    }
  }
</style>
