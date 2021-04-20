<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control :titles="['流行', '新款', '精选']"></tab-control>
    <ul>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
      <li>test</li>
    </ul>
  </div>
</template>

<script>
  import Navbar from "components/common/navbar/Navbar";
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  //网络请求
  import {getMultiData, getProductData} from "network/home";
  import TabControl from "../../components/content/tabControl/TabControl";


  export default {
    name: "Home",
    components: {
      TabControl,
      Navbar,
      HomeSwiper,
      FeatureView,
      RecommendView
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0, list:[]},
          'new': {page:0, list:[]},
          'sell': {page:0, list:[]}
        }
      }
    },
    created() {
      //1.请求轮播等数据
      this.__getMultiData();
      //2.请求商品数据
      this.__getProductData('pop', 1)
    },
    methods: {
      //网络请求
      //轮播图，推荐数据
      __getMultiData() {
        getMultiData().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
          console.log(this.banners)
          // console.log(this.recommends)
        })
      },
      //商品数据
      __getProductData(type, page) {
        getProductData(type, page).then(res => {
          this.goods.type = res.data.list
        })
      }

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
    position: relative;
    z-index: 9;
  }

  /*.content {*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/
</style>
