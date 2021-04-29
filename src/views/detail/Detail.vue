<template>
  <div>
    <detail-nav-bar />
    <scroll>
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo" />
    </scroll>
  </div>
</template>

<script>
    import DetailNavBar from "./childCompons/DetailNavBar"
    import Scroll from "components/common/scroll/Scroll"
    import DetailSwiper from "./childCompons/DetailSwiper"
    import DetailBaseInfo from "./childCompons/DetailBaseInfo"

    //从服务器获取数据
    import {getDetail, Goods} from "network/detail";

    export default {
      name: "Detail",
      components: {
        DetailBaseInfo,
        DetailNavBar,
        DetailSwiper,
        Scroll,
      },
      data() {
          return {
            iid: null,
            topImages: [],
            goodsInfo: {}
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
        })
      }
    }
</script>

<style scoped>

</style>
