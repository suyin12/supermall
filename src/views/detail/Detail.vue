<template>
  <div class="detail">
    <detail-nav-bar />
    <scroll class="content">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shop="shopInfo" />
      <detail-info :detail-info="detailInfo" />
    </scroll>
  </div>
</template>

<script>
    import DetailNavBar from "./childCompons/DetailNavBar"
    import Scroll from "components/common/scroll/Scroll"
    import DetailSwiper from "./childCompons/DetailSwiper"
    import DetailBaseInfo from "./childCompons/DetailBaseInfo"
    import DetailShopInfo from "./childCompons/DetailShopInfo";

    //从服务器获取数据
    import {getDetail, Goods} from "network/detail";
    import DetailInfo from "./childCompons/DetailInfo";

    export default {
      name: "Detail",
      components: {
        DetailInfo,
        DetailShopInfo,
        DetailBaseInfo,
        DetailNavBar,
        DetailSwiper,
        Scroll,
      },
      data() {
          return {
            iid: null,
            topImages: [],
            goodsInfo: {},
            shopInfo: {},
            detailInfo: {},
          }
      },
      created() {
        //1.保存iid
        this.iid = this.$route.params.iid

        //2.根据iid请求数据
        getDetail(this.iid).then((res) => {
          // 1.获取数据
          const data = res.result
          //2.保存轮播图数据
          this.topImages = res.result.itemInfo.topImages

          //3.创建商品的对象
          this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
console.log(res)
          //4.获取店铺信息
          this.shopInfo = res.result.shopInfo

          //5.获取详情信息
          this.detailInfo = res.result.detailInfo
        })
      }
    }
</script>

<style scoped>
  .detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }

  .content {
    background-color: #fff;
    height: calc(100% - 44px)
  }
</style>
