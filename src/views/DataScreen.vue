<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-show="loading">Loading...</dv-loading>
      <div class="host-body">
        <div>
          <!-- 顶部title部分 -->
          <el-row>
            <el-col :span="6"
              ><dv-decoration-8
                class="title_right"
                :color="['#008CFF', '#00ADDD']"
            /></el-col>
            <el-col :span="12"
              ><div class="title_text">农 产 品 数 据 可 视 化 系 统</div>
              <dv-decoration-5
                class="title_center"
                :color="['#008CFF', '#00ADDD']"
            /></el-col>
            <el-col :span="6"
              ><div class="title_time">{{ dateYear + ' ' + dateWeek + ' ' + dateDay }}</div>
              <dv-decoration-8
                :reverse="true"
                class="title_left"
                :color="['#008CFF', '#00ADDD']"
            /></el-col>
          </el-row>
          <!-- 主体部分 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="6">
              <!-- 饼图部分 -->
              <div class="left_box1">
                <dv-border-box-12>
                  <div id="Rose_diagram"></div>

                  <dv-active-ring-chart
                    :config="config"
                    class="left_box1_rose_right"
                  />
<!--                  <div-->
<!--                    class="rose_text"-->
<!--                    v-for="(item, index) in numberData"-->
<!--                    :key="index"-->
<!--                  >-->
<!--                    <p>-->
<!--                      <span class="coin">￥</span>-->
<!--                      <span class="rose_text_nmb">{{-->
<!--                        item.number.number-->
<!--                      }}</span>-->
<!--                    </p>-->
<!--                    <p>-->
<!--                      <span>{{ item.text }}</span>-->
<!--                      <span class="colorYellow">(件)</span>-->
<!--                    </p>-->
<!--                  </div>-->
                </dv-border-box-12>
              </div>
              <!-- 柱状图部分 -->
              <div class="left_box2">
                <dv-border-box-12 style="padding-top: 10px">
                  <p style="margin-left: 15px;color: #008cff;font-size: 20px;font-weight: bold">产品产地统计</p>
                  <div id="columnar"></div>
                </dv-border-box-12>
              </div>
              <!-- 轮播表格部分 -->
              <div class="left_box3">
                <dv-border-box-12 style="padding-top: 10px">
                  <p style="margin-left: 15px;color: #008cff;font-size: 20px;font-weight: bold">产品检测</p>
                  <dv-scroll-board
                    :config="board_info"
                    class="carousel_list"
                    oddRowBGC="#fff"
                  />
                </dv-border-box-12>
              </div>
            </el-col>
            <!-- 第二列 -->
            <el-col :span="12">
              <!-- 中国地图 -->
              <div id="china-map"></div>
              <!-- 折线图 -->
              <div class="line_center">
                <dv-border-box-8>
                  <div id="line_center_diagram"></div>
                </dv-border-box-8>
              </div>
            </el-col>
            <!-- 第三列 -->
            <el-col :span="6">
              <!-- 轮播排行榜部分 -->
              <div class="right_box1">
                <dv-border-box-12>
                  <dv-decoration-7 style="width: 100%; height: 30px;color: #008cff;font-size: 20px;font-weight: bold"
                    >产 品 检 测 通 过 率</dv-decoration-7
                  >
                  <dv-scroll-ranking-board
                    :config="config1"
                    style="width: 95%; height: 85%; margin-left: 2%"
                  />
                </dv-border-box-12>
              </div>
              <!-- 虚线柱状图部分 -->
              <div class="right_box2">
                <dv-border-box-12 :reverse="true">
                  <dv-decoration-7 style="width: 100%; height: 30px;color: #008cff;font-size: 20px;font-weight: bold"
                  >产 品 销 售 排 行 榜</dv-decoration-7
                  >
                  <dv-conical-column-chart :config="cone" class="cone_box" />
                </dv-border-box-12>
              </div>
              <!-- 部分 -->
              <div class="right_box3">
                <dv-border-box-12 :reverse="true">
                  <dv-decoration-7 style="width: 100%; height: 30px;color: #008cff;font-size: 20px;font-weight: bold"
                  >物 流 情 况</dv-decoration-7
                  >
                  <div id="dotter_bar"></div>
                </dv-border-box-12>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawMixin from '../utils/drawMixin' //自适应缩放
import { formatTime } from '@/utils' //日期格式转换
import * as echarts from 'echarts'
export default {
  name: 'DataScreen',
  mixins: [drawMixin],
  data() {
    return {
      //定时器
      timing: null,
      //loading图
      loading: true,
      //时分秒
      dateDay: null,
      //年月日
      dateYear: null,
      //周几
      dateWeek: null,
      //周几
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      //轮播排行榜
      config1: {
        data: [
          {
            name: '牛肉干',
            value:99,
          },
          {
            name: '苹果牛奶',
            value:94,
          },
          {
            name: '大米',
            value: 91,
          },
          {
            name: '老陈醋',
            value: 87,
          },
          {
            name: '西蓝花',
            value: 84,
          },
          {
            name: '毛尖',
            value: 88,
          },
          {
            name: '青蟹',
            value: 89,
          },
        ],
        unit: "%",
      },
      config: {
        data: [
          {
            name: '审核通过数',
            value: 6,
          },
          {
            name: '待审核数',
            value: 4,
          },
        ],
        color:['#89d798', '#e790cc'],
        digitalFlopStyle: {
          fontSize: 20,
        },
      },
      //左侧饼图文字
      numberData: [
        {
          number: {
            number: 15,
          },
          text: '今日构建总量',
        },
        {
          number: {
            number: 1144,
          },
          text: '总共完成数量',
        },
        {
          number: {
            number: 361,
          },
          text: '正在编译数量',
        },
      ],
      //左侧轮播表格配置项
      board_info: {
        header: ['产品名称', '检测数量', '检测时间'],
        data: [
          ['牛肉干 ', '1083', '2022-03-07'],
          ['苹果牛奶', '1350', '2022-03-07'],
          ['原阳大米', '1030', '2022-05-07'],
          ['老陈醋',   '1300', '2022-05-16'],
          ['莱阳梨 ',  '2500', '2022-06-08'],
          ['猕猴桃',   '1500', '2022-08-07'],
          ['西兰花',   '500', '2022-09-17'],
          ['青蟹',     '360', '2022-10-11'],
          ['龙井',     '567', '2022-11-01'],
          ['毛尖',     '721', '2022-12-13'],
        ],
        evenRowBGC: '#0a1338',
        oddRowBGC: '#360f73',
        headerBGC: '#19235e',
      },
      // 定义颜色
      colorList: {
        linearYtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#f5b44d',
            },
            {
              offset: 1,
              color: '#28f8de',
            },
          ],
        },
        linearGtoB: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#43dfa2',
            },
            {
              offset: 1,
              color: '#28f8de',
            },
          ],
        },
        linearBtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#1c98e8',
            },
            {
              offset: 1,
              color: '#28f8de',
            },
          ],
        },
        areaBtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(35,184,210,.2)',
            },
            {
              offset: 1,
              color: 'rgba(35,184,210,0)',
            },
          ],
        },
      },
      //锥形柱状图
      cone: {
        data: [
          {
            name: '牛肉干',
            value: 120,
          },
          {
            name: '苹果牛奶',
            value: 55,
          },
          {
            name: '西蓝花',
            value: 71,
          },
          {
            name: '猕猴桃',
            value: 66,
          },
          {
            name: '龙井',
            value: 35,
          },
          {
            name: '毛尖',
            value: 15,
          },
        ],
        showValue: true,
      },
    }
  },

  mounted() {
    //获取实时时间
    this.timeFn()
    //加载loading图
    this.cancelLoading()
    //中国地图
    this.china_map()
    //左侧玫瑰饼图
    this.Rose_diagram()
    //左侧柱状图
    this.columnar()
    //中间折线图
    this.line_center_diagram()
    //虚线柱状图
    this.dotter_bar()
  },
  beforeUnmount() {
    //离开时删除计时器
    clearInterval(this.timing)
  },
  methods: {
    //右上角当前日期时间显示：每一秒更新一次最新时间
    timeFn() {
      this.timing = setInterval(() => {
        //获取当前时分秒
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        //获取当前年月日
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        //获取当前周几
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    //loading图
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    //中国地图
    china_map() {
      let mapChart = this.$echarts.init(document.getElementById('china-map')) //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize //如果容器变大小，自适应从新构图
      let series = [] //存放循环配置项
      let res = [] //存放射线的起始点和结束点位置
      let province = [] //存放有射线的省的名字，以此来拿到对应省份的坐标
      //提前存好的所有省份坐标，用于后面根据名字拿到对应的左边
      let chinaGeoCoordMap = {
        新疆: [86.9023, 41.148],
        西藏: [87.8695, 31.6846],
        内蒙古: [110.5977, 41.3408],
        青海: [95.2402, 35.4199],
        四川: [102.9199, 30.1904],
        黑龙江: [128.1445, 46.7156],
        甘肃: [102.7129, 38.166],
        云南: [101.0652, 24.6807],
        广西: [108.7813, 23.6426],
        湖南: [111.5332, 27.3779],
        陕西: [108.5996, 33.7396],
        广东: [113.8668, 22.8076],
        吉林: [126.1746, 43.5938],
        河北: [115.4004, 38.1688],
        湖北: [112.2363, 30.8572],
        贵州: [106.6113, 26.6385],
        山东: [118.2402, 36.2307],
        江西: [115.7156, 27.99],
        河南: [113.0668, 33.8818],
        辽宁: [123.0438, 41.0889],
        山西: [112.4121, 36.6611],
        安徽: [117.2461, 31.0361],
        福建: [118.3008, 25.9277],
        浙江: [120.498, 29.0918],
        江苏: [119.8586, 32.915],
        重庆: [107.7539, 29.8904],
        宁夏: [105.9961, 37.1096],
        海南: [109.9512, 19.2041],
        台湾: [120.8254, 23.5986],
        北京: [116.4551, 40.2539],
        天津: [117.4219, 39.4189],
        上海: [121.4648, 31.2891],
        香港: [114.6178, 22.3242],
        澳门: [113.5547, 21.6484],
      }
      //后台给的数据模拟
      let lineData = [
        {
          val: 1, //数据
          blat: [110.5977, 41.3408], //发射点
          elon: [120.498, 29.0918], //接收点
          bcitysim: '内蒙古', //发射省的名字
          ecitysim: '浙江', //接收省的名字
        },
        {
          val: 1,
          blat: [87.8695, 31.6846],
          elon: [120.498, 29.0918],
          bcitysim: '西藏',
          ecitysim: '浙江',
        },
        {
          val: 1,
          blat: [86.9023, 41.148],
          elon: [119.8586, 32.915],
          bcitysim: '新疆',
          ecitysim: '江苏',
        },
        // {
        //   val: 33,
        //   blat: [120.8254, 23.5986],
        //   elon: [109.9512, 19.2041],
        //   bcitysim: '台湾',
        //   ecitysim: '海南',
        // },
        // {
        //   val: 33,
        //   blat: [120.498, 29.0918],
        //   elon: [115.7156, 27.99],
        //   bcitysim: '浙江',
        //   ecitysim: '江西',
        // },
        // {
        //   val: 33,
        //   blat: [117.2461, 31.0361],
        //   elon: [119.8586, 32.915],
        //   bcitysim: '安徽',
        //   ecitysim: '江苏',
        // },
        // {
        //   val: 33,
        //   blat: [117.2461, 31.0361],
        //   elon: [105.9961, 37.1096],
        //   bcitysim: '安徽',
        //   ecitysim: '宁夏',
        // },
        // {
        //   val: 33,
        //   blat: [117.2461, 31.0361],
        //   elon: [107.7539, 29.8904],
        //   bcitysim: '安徽',
        //   ecitysim: '重庆',
        // },
        // {
        //   val: 33,
        //   blat: [117.2461, 31.0361],
        //   elon: [123.0438, 41.0889],
        //   bcitysim: '安徽',
        //   ecitysim: '辽宁',
        // },
        // {
        //   val: 33,
        //   blat: [119.8586, 32.915],
        //   elon: [102.7129, 38.166],
        //   bcitysim: '江苏',
        //   ecitysim: '甘肃',
        // },
        // {
        //   val: 33,
        //   blat: [119.8586, 32.915],
        //   elon: [128.1445, 46.7156],
        //   bcitysim: '江苏',
        //   ecitysim: '黑龙江',
        // },
        // {
        //   val: 33,
        //   blat: [119.8586, 32.915],
        //   elon: [110.5977, 41.3408],
        //   bcitysim: '江苏',
        //   ecitysim: '内蒙古',
        // },
        // {
        //   val: 33,
        //   blat: [119.8586, 32.915],
        //   elon: [101.0652, 24.6807],
        //   bcitysim: '江苏',
        //   ecitysim: '云南',
        // },
        // {
        //   val: 33,
        //   blat: [119.8586, 32.915],
        //   elon: [86.9023, 41.148],
        //   bcitysim: '江苏',
        //   ecitysim: '新疆',
        // },
        // {
        //   val: 33,
        //   blat: [86.9023, 41.148],
        //   elon: [110.5977, 41.3408],
        //   bcitysim: '新疆',
        //   ecitysim: '内蒙古',
        // },
        // {
        //   val: 33,
        //   blat: [86.9023, 41.148],
        //   elon: [102.9199, 30.1904],
        //   bcitysim: '新疆',
        //   ecitysim: '四川',
        // },
      ]
      //循环拿到处理好的数据
      for (var i = 0; i < lineData.length; i++) {
        province.push(lineData[i].bcitysim) //存进去每个省的名字
        province.push(lineData[i].ecitysim) //存进去每个省的名字
        res.push({
          fromName: lineData[i].bcitysim, //发射的省名，保存用于弹框显示
          toName: lineData[i].ecitysim, //接收的省名，保存用于弹框显示
          coords: [
            lineData[i].blat, //发射
            lineData[i].elon, //接收
          ],
          count: lineData[i].val, //数据
        })
      }
      let index_data = new Set(province) //把省的名字去重
      let data_res = [] //定义一个新的变量存放省的坐标

      //注意这里一定要用name和value的形式。不是这个格式的散点图显示不出来
      index_data.forEach((item) => {
        data_res.push({
          name: item, //每个省的名字
          value: chinaGeoCoordMap[item], //每个省的坐标
        })
      })
      //循环往series内添加配置项
      series.push(
        {
          //射线效果图层
          type: 'lines', //类型：射线
          zlevel: 1, //类似图层效果
          effect: {
            show: true, //是否显示图标
            symbol: 'arrow', //箭头图标
            symbolSize: 5, //图标大小
            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          },
          label: {
            show: true,
          },
          lineStyle: {
            color: '#fff',
            normal: {
              color: '#00A0FF',
              width: 1, //尾迹线条宽度
              opacity: 0.5, //尾迹线条透明度
              curveness: 0.1, //尾迹线条曲直度
            },
          },
          //提示框信息
          tooltip: {
            formatter: function (param) {
              return (
                param.data.fromName +
                '>' +
                param.data.toName +
                '<br>数量：' +
                param.data.count
              )
            },
          },
          data: res, //拿到射线的起始点和结束点
        },
        //散点图
        // {
        //   type: "effectScatter",//散点图
        //   coordinateSystem: "geo",//这个不能删，删了不显示
        //   zlevel: 1,
        //   rippleEffect: {
        //     //涟漪特效
        //     period: 4, //动画时间，值越小速度越快
        //     brushType: "stroke", //波纹绘制方式 stroke, fill
        //     scale: 4, //波纹圆环最大限制，值越大波纹越大
        //   },
        //   //设置文字部分
        //   label: {
        //     normal: {
        //       show: true, //省份名显示隐藏
        //       position: "right", //省份名显示位置
        //       offset: [5, 0], //省份名偏移设置
        //       formatter: function (params) {
        //         //圆环显示省份名
        //         return params.name;  //这个名字是根据data中的name来显示的
        //       },
        //       fontSize: 12,//文字大小
        //     },
        //     emphasis: {
        //       show: true,
        //     },
        //   },
        //   symbol: "circle",//散点图
        //   symbolSize: 5,//散点大小
        //   itemStyle: {//散点样式
        //     normal: {
        //       show: true,
        //       color: "#fff",
        //     },
        //   },
        //   data: data_res, //处理好后的散点图坐标数组
        // },
        //点击高亮
        {
          type: 'map',
          mapType: 'china',
          zlevel: 1,
          roam: true,
          geoIndex: 0,
          tooltip: {
            show: true,
          },
          itemStyle: {
            areaColor: '#00196d',
            borderColor: '#0a53e9',
          },
          emphasis: {
            show: true,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: '#fff',
                },
              },
            },
            itemStyle: {
              areaColor: '#00196d',
              borderColor: '#0a53e9',
            },
          },
        }
      )
      //配置
      let option = {
        //title可要可不要
        title: {
          text: "物流统计",
          textStyle: {
            color: "#008cff",
            fontSize:20,
            textAlign:'center',
          },
        },
        legend: {
          show: true,
          selected: {},
          x: 'left',
          orient: 'vertical',
          textStyle: {
            color: 'white',
          },
          data: [],
        },
        //鼠标移上去的弹框
        tooltip: {
          trigger: 'item',
          show: true,
        },
        //geo：这是重点
        geo: {
          map: 'china', //中国地图
          zoom: 1.2, //缩放倍数
          roam: false, //是否允许缩放和拖拽地图
          label: {
            normal: {
              show: true, // 是否显示省份名字，现在是隐藏的状态，因为和散点图的名字重叠了。如果需要就true
              textStyle: {
                //名字的样式
                color: '#fff',
              },
            },
            emphasis: {
              show: true,
            },
          },
          //地图样式
          itemStyle: {
            normal: {
              borderColor: '#293171', //地图边框颜色
              borderWidth: '2', //地图边框粗细
              areaColor: '#0A0F33', //地图背景色
            },
            //省份地图阴影
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: '#fff',
            },
          },
        },
        series: series, //图表配置
      }
      mapChart.setOption(option) //生成图表
    },
    //玫瑰饼图
    Rose_diagram() {
      let mapChart = this.$echarts.init(document.getElementById('Rose_diagram')) //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize //如果容器变大小，自适应从新构图
      let option = {
        color: [
          '#9fe6b8',
          '#ffdb5c',
          '#fb7293',
          '#8378ea',
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        toolbox: {
          show: true,
        },
        calculable: true,
        legend: {
          orient: 'horizontal',
          icon: 'circle',
          top:210,
          // x: 'center',
          data: ['供应商总数', '产品总数', '用户总数' ,'查询次数'],
          textStyle: {
            color: '#fff',
            fontSize:18,
          },
        },
        series: [
          {
            name: '数据统计',
            type: 'pie',
            radius: [40, 90],
            label:{
              normal:{
                show:false
              }
            },
            roseType: 'area',
            center: ['50%', '38%'],
            data: [
              { value: 130, name: '查询次数' },
              { value: 6, name: '供应商总数' },
              { value: 32, name: '产品总数' },
              { value: 16, name: '用户总数' },
            ],
          },
        ],
      }
      mapChart.setOption(option) //生成图表
    },
    //柱状图
    columnar() {
      let mapChart = this.$echarts.init(document.getElementById('columnar')) //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize //如果容器变大小，自适应从新构图
      let option = {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
          fontSize:15,
          axisPointer: {
            label: {
              show: true,
              backgroundColor: '#7B7DDC',
              fontSize:15,
            },
          },
        },
        legend: {
          data: ['产品数量'],
          textStyle: {
            color: '#ffffff',
            fontSize:18,
          },
          top: '0%',
        },
        grid: {
          x: '8%',
          width: '90%',
          y: '4%',
        },
        xAxis: {
          data: [
              '河北',
              '山西',
              '辽宁',
              '吉林',
              '黑龙江',
              '江苏',
              '浙江',
              '安徽',
              '福建',
              '江西',
             ' 山东',
              '河南',
              '湖北',
              '湖南',
              '广东',
              '海南',
              '四川',
              '贵州',
              '云南',
              '陕西',
              '甘肃',
              '青海',
              '台湾',
              '内蒙古',
              '广西',
              '西藏',
              '宁夏',
              '新疆',
              '北京',
              '天津',
              '上海',
              '重庆',
              '香港',
              '澳门',
          ],
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              fontSize:15,
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: '#ffffff',
                fontSize:15,
              },
            },
            axisLabel: {
              formatter: '{value} ',
            },
          },
        ],
        series: [
          {
            name: '产品数量',
            type: 'bar',
            barWidth: 9,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#956FD4' },
                  { offset: 1, color: '#3EACE5' },
                ]),
              },
            },
            data: [
              2, 1, 3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 2, 0,
              4, 1, 3, 1, 2, 1, 2, 2, 1, 2, 0, 2, 1, 1, 2,
              3, 2, 2, 2, 1,
            ],
          },
          // {
          //   name: '计划贯通',
          //   type: 'bar',
          //   barGap: '-100%',
          //   barWidth: 10,
          //   itemStyle: {
          //     normal: {
          //       barBorderRadius: 5,
          //       color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //         { offset: 0, color: 'rgba(156,107,211,0.8)' },
          //         { offset: 0.2, color: 'rgba(156,107,211,0.5)' },
          //         { offset: 1, color: 'rgba(156,107,211,0.2)' },
          //       ]),
          //     },
          //   },
          //   z: -12,
          //   data: [
          //     180, 207, 240, 283, 328, 360, 398, 447, 484, 504, 560, 626, 595,
          //     675, 180, 207, 240, 283, 328, 360, 398, 447, 484, 504, 360, 398,
          //     447, 484, 504, 500, 326, 495, 328,
          //   ],
          // },
        ],
      }
      mapChart.setOption(option) //生成图表
    },
    //折线图
    line_center_diagram() {
      let mapChart = this.$echarts.init(
        document.getElementById('line_center_diagram')
      ) //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize //如果容器变大小，自适应从新构图
      // let category = []
      // let dottedBase = +new Date()
      // for (let i=0; i <7; i++) {
      //   let date = new Date((dottedBase = (dottedBase+3600 * 24 * 1000))-3600 * 24 * 1000*10)
      //   category.push(
      //       [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
      //   )
      let option = {
        xAxis: {
          type: 'category',
          data: ['12-8', '12-9', '12-10', '12-11', '12-12', '12-13', '12-14'],
          // data:category,
          position: 'bottom',
          axisLine: true,
          axisLabel: {
            color: 'rgba(255,255,255,.8)',
            fontSize: 12,
          },
        },
        yAxis: {
          type: 'value',
          name: '用户查询次数',
          nameLocation: 'end',
          nameGap: 24,
          nameTextStyle: {
            color: '#008cff',
            fontSize: 20,
            fontWeight:'bold',
          },
          splitNumber: 4,
          axisLine: {
            lineStyle: {
              opacity: 0,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#fff',
              opacity: 0.1,
            },
          },
          axisLabel: {
            color: 'rgba(255,255,255,.8)',
            fontSize: 12,
          },
        },
        grid: {
          left: 70,
          right: 10,
          bottom: 25,
          top: '20%',
        },
        series: [
          {
            data: [82, 93, 90, 93, 120, 130, 132],
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#fff',
                fontSize:20,
              },
            },
            //线的颜色样式
            lineStyle: {
              normal: {
                color: this.colorList.linearBtoG,
                width: 3,
              },
            },
            //填充颜色样式
            areaStyle: {
              normal: {
                color: this.colorList.areaBtoG,
              },
            },
          },
        ],
      }
      mapChart.setOption(option) //生成图表
    },
    //右侧虚线柱状图图
    dotter_bar() {
      let mapChart = this.$echarts.init(document.getElementById('dotter_bar')) //图表初始化，china-map是绑定的元素
      window.onresize = mapChart.resize //如果容器变大小，自适应从新构图
      // Generate data
      let category = []
      let dottedBase = +new Date()
      let lineData = []
      let barData = []
      let Data = []
      for (let i=0; i <10; i++) {
        let date = new Date((dottedBase = (dottedBase+3600 * 24 * 1000))-3600 * 24 * 1000*10)
        category.push(
          [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
        )
        // let b = [3,5,7,4,5,8,9]
        // let d = [0,4,4,4,3,2,1]
        barData = [3,5,7,4,5,8,9,4,2,3]
        lineData = [0,4,4,4,3,2,1,2,1,0]
        // barData.push(b)
        // lineData.push(d + b)
        // Data.push(d+b)
      }
      // option
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'shadow',
          },
        },
        grid: {
          left: 50,
          right: 10,
          bottom: 25,
          top: '18%',
        },
        legend: {
          data: ['line', 'bar'],
          textStyle: {
            color: '#ccc',
          },
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            name: '完成的物流数量',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: lineData,
          },
          {
            name: '总需物流数量',
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              borderRadius: 8,
              // color: "#14c8d4",
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#14c8d4' },
                { offset: 1, color: '#43eec6' },
              ]),
            },
            data: barData,
          },
          // {
          //   name: 'line',
          //   type: 'bar',
          //   barGap: '-100%',
          //   barWidth: 10,
          //   itemStyle: {
          //     // color: "rgba(20,200,212,0.5)",
          //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //       { offset: 0, color: 'rgba(20,200,212,0.5)' },
          //       { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
          //       { offset: 1, color: 'rgba(20,200,212,0)' },
          //     ]),
          //   },
          //   z: -12,
          //   data:Data,
          // },
          // {
          //   name: 'dotted',
          //   type: 'pictorialBar',
          //   symbol: 'rect',
          //   itemStyle: {
          //     color: '#0f375f',
          //   },
          //   symbolRepeat: true,
          //   symbolSize: [12, 4],
          //   symbolMargin: 1,
          //   z: -10,
          //   data: lineData,
          // },
        ],
      }
      mapChart.setOption(option) //生成图表
    },
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
  outline: none;
  box-sizing: border-box;
}
html {
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.2em;
  background-color: #f1f1f1;
  margin: 0;
  padding: 0;
}
a {
  color: #343440;
  text-decoration: none;
} /*//页面样式部分！！！！*/
#index {
  color: #d3d6dd;
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
  .bg {
    //整体页面背景
    width: 100%;
    height: 100%;
    padding: 16px 16px 0 16px;
    background-image: url('../assets/pageBg.png'); //背景图
    background-size: cover; //背景尺寸
    background-position: center center; //背景位置
  }
  //顶部右边装饰效果
  .title_left {
    width: 100%;
    height: 50px;
  }
  //顶部左边装饰效果
  .title_right {
    width: 100%;
    height: 50px;
    margin-top: 18px;
  }
  //顶部中间装饰效果
  .title_center {
    width: 100%;
    height: 50px;
  }
  //顶部中间文字数据可视化系统
  .title_text {
    text-align: center;
    font-size: 35px;
    font-weight: bold;
    margin-top: 14px;
    color: #008cff;
  }
  //时间日期
  .title_time {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }
  //中国地图
  #china-map {
    height: 660px;
    width: 100%;
  }
  //中间折线图
  .line_center {
    width: 100%;
    height: 288px;
  }
  //左1模块
  .left_box1 {
    height: 310px;
    width: 100%;
    margin-bottom: 10px;
    position: relative;
  }
  //左2模块
  .left_box2 {
    height: 310px;
    width: 100%;
    margin-bottom: 10px;
  }
  //左3模块
  .left_box3 {
    height: 310px;
    width: 100%;
  }
  //右1模块
  .right_box1 {
    height: 310px;
    width: 100%;
    margin-bottom: 10px;
  }
  //右2模块
  .right_box2 {
    height: 310px;
    width: 100%;
    margin-bottom: 10px;
  }
  //右3模块
  .right_box3 {
    height: 310px;
    width: 100%;
  }
  //左1模块-玫瑰饼图
  #Rose_diagram {
    height: 100%;
    width: 55%;
  }
  //左1模块-圆环图
  .left_box1_rose_right {
    height: 100%;
    width: 55%;
    position: absolute;
    right: 0;
    top: 0;
  }
  //左1模块-文字部分
  //.rose_text {
  //  display: inline-block;
  //  margin-top: 4%;
  //  margin-left: 4%;
  //}
  // 左1模块-￥符号样式
  .coin {
    font-size: 20px;
    color: #ffc107;
  }
  //左1模块-（件）样式
  .colorYellow {
    color: yellowgreen;
  }
  //左1模块-数字样式
  .rose_text_nmb {
    font-size: 20px;
    color: #00b891;
  }
  //左2模块 柱状图
  #columnar {
    height: 97%;
    width: 95%;
    margin-left: 3%;
    margin-top: 5px;
  }
  //折线图
  #line_center_diagram {
    height: 100%;
    width: 100%;
  }
  //轮播表格
  .carousel_list {
    width: 90%;
    height: 90%;
    margin-left: 20px;
  }
  //虚线柱状图
  #dotter_bar {
    width: 95%;
    height: 80%;
  }
  //锥形图
  .cone_box {
    width: 95%;
    height: 85%;
    margin-left: 3%;
  }
}
</style>
