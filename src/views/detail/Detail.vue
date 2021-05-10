<template>
  <div class="detail">
    <detail-nav-bar />
    <scroll class="content"
            ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shop="shopInfo" />
      <detail-info :detail-info="detailInfo"/>
      <detail-params-info :item-params="itemParams"/>
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommend"/>
    </scroll>
  </div>
</template>

<script>
    import DetailNavBar from "./childCompons/DetailNavBar"
    import Scroll from "components/common/scroll/Scroll"
    import DetailSwiper from "./childCompons/DetailSwiper"
    import DetailBaseInfo from "./childCompons/DetailBaseInfo"
    import DetailShopInfo from "./childCompons/DetailShopInfo";
    import DetailParamsInfo from "./childCompons/DetailParamsInfo";
    import DetailCommentInfo from "./childCompons/DetailCommentInfo";
    import GoodsList from "components/content/goods/GoodsList";

    //从服务器获取数据
    import {getDetail, getRecommends, Goods} from "network/detail";
    import DetailInfo from "./childCompons/DetailInfo";
    import {debounce} from "common/utils"
    import {itemListenerMixin} from "common/mixin";


    export default {
      name: "Detail",
      components: {
        GoodsList,
        DetailCommentInfo,
        DetailParamsInfo,
        DetailInfo,
        DetailShopInfo,
        DetailBaseInfo,
        DetailNavBar,
        DetailSwiper,
        Scroll,
      },
      mixins: [itemListenerMixin],
      data() {
          return {
            iid: null,
            topImages: [],
            goodsInfo: {},
            shopInfo: {},
            detailInfo: {},
            itemParams: {},
            commentInfo: {},
            recommend: {},
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
          this.shopInfo = data.shopInfo

          //5.获取详情信息
          this.detailInfo = data.detailInfo

          //6.获取参数信息
          this.itemParams = data.itemParams

          //7.获取评论信息
          if(data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }

        })

        //3.获取推荐信息
        getRecommends().then(res => {
          this.recommend = res.data.list
        })
      },
      mounted() {
        //图片加载完成，重新刷新一下
        // const refresh = debounce(this.$refs.scroll.refresh, 300)
        // this.$bus.$on('detailImageLoad' ,() => {
        //   refresh()
        // })
      },
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
