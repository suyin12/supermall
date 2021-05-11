<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shop="shopInfo" />
      <detail-info :detail-info="detailInfo"/>
      <detail-params-info ref="params" :item-params="itemParams"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>

    <back-top class="back-top" @click.native="backTop" v-show="isShowBackTop"></back-top>
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
    import {itemListenerMixin, backTopMixin} from "common/mixin";


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
      mixins: [itemListenerMixin, backTopMixin],
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
            navBarScrollY: [0, 1000, 1500, 2000],
            currentIndex: 0
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

          this.$nextTick(() => {
            this.navBarScrollY = []

            this.navBarScrollY.push(0)
            this.navBarScrollY.push(this.$refs.params.$el.offsetTop)
            this.navBarScrollY.push(this.$refs.comment.$el.offsetTop)
            this.navBarScrollY.push(this.$refs.recommend.$el.offsetTop)
            this.navBarScrollY.push(Number.MAX_VALUE)
          })

        })

        //3.获取推荐信息
        getRecommends().then(res => {
          this.recommend = res.data.list
        })

      },
      mounted() {

      },
      methods: {
        titleClick(value) {
          this.$refs.scroll.scrollTo(0, -this.navBarScrollY[value], 200)
        },

        contentScroll(position) {
          const position_y = -position.y
          // console.log(position_y)
          const length = this.navBarScrollY.length
          // console.log(this.navBarScrollY.length)
          // for(let i = 0; i < length; i++) {
          //   if((this.currentIndex !== i) && (((i !== length -1) && this.navBarScrollY[i] < position_y && position_y < this.navBarScrollY[i+1])
          //   || (i === length -1 && this.navBarScrollY[i] < position_y))) {
          //     this.currentIndex = i
          //     this.$refs.nav.currentIndex = this.currentIndex
          //   }
          // }
          // 另外一种空间换时间的做法(执行性能/写代码的时间)
          for(let i = 0; i < length - 1; i++) {
            if((this.currentIndex !== i) && (position_y >= this.navBarScrollY[i] && position_y <= this.navBarScrollY[i+1])) {
              this.currentIndex = i
              this.$refs.nav.currentIndex = this.currentIndex
            }
          }

          // 3.backTop
          // 1.判断BackTop是否显示
          this.listenShowBackTop(position)
        }
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

  .back-top {
    position: fixed;

    /*top: 0;*/
    right: 20px;
    bottom: 60px;
    z-index: 9;
  }
</style>
