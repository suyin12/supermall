<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-upLoad="true"
            @pullingUp="loadMore"
            @scroll="contentScroll">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']"
                   @tabControlItemClick="tabControlItemClick"></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top class="back-top" @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import Navbar from "components/common/navbar/Navbar";
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop";

  //网络请求
  import {getMultiData, getProductData} from "network/home";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import {debounce} from "common/utils"

  export default {
    name: "Home",
    components: {
      GoodsList,
      TabControl,
      Navbar,
      HomeSwiper,
      FeatureView,
      RecommendView,
      Scroll,
      BackTop,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0, list:[]},
          'new': {page:0, list:[]},
          'sell': {page:0, list:[]}
        },
        goodType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.goodType].list
      }
    },
    created() {
      //1.请求轮播等数据
      this.__getMultiData();
      //2.请求商品数据
      this.__getProductData('pop')
      this.__getProductData('new')
      this.__getProductData('sell')
    },
    mounted() {
      //图片加载完成，重新刷新一下
      const refresh = debounce(this.$refs.scroll.refresh)
      this.$bus.$on('imageLoad' ,() => {
        refresh()
      })
    },
    methods: {
      //网络请求
      //轮播图，推荐数据
      __getMultiData() {
        getMultiData().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      //商品数据
      __getProductData(type) {
        const page = this.goods[type].page + 1
        getProductData(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },

      // 事件监听
      tabControlItemClick(index) {
        switch(index){
          case 0:
            this.goodType = 'pop'
            break
          case 1:
            this.goodType = 'new'
            break
          case 2:
            this.goodType = 'sell'
            break
        }
      },

      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.__getProductData(this.goodType)
      },
      backTop() {
        this.$refs.scroll.scrollTo(0, 0)
      },
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;

    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: sticky;
    top:44px;
    z-index: 9;
  }

  /*.content {*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/

  .back-top {
    position: fixed;

    /*top: 0;*/
    right: 20px;
    bottom: 60px;
    z-index: 9;
  }
</style>
