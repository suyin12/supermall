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
    <detail-bottom-nav @addCart="addCart" />
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
    import DetailBottomNav from "./childCompons/DetailBottomNav";

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
        DetailBottomNav,
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
            currentIndex: 0,
            getThemeTopY: null,
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

          //这里获取实不正确的值，DOM还没渲染完
          // this.navBarScrollY = []
          //
          // this.navBarScrollY.push(0)
          // this.navBarScrollY.push(this.$refs.params.$el.offsetTop)
          // this.navBarScrollY.push(this.$refs.comment.$el.offsetTop)
          // this.navBarScrollY.push(this.$refs.recommend.$el.offsetTop)
          // this.navBarScrollY.push(Number.MAX_VALUE)
          //
          // console.log(this.navBarScrollY)

          //这里也不行，数据是渲染完成了，但是图片没有被计算在内
          // this.$nextTick(() => {
          //   this.navBarScrollY = []
          //
          //   this.navBarScrollY.push(0)
          //   this.navBarScrollY.push(this.$refs.params.$el.offsetTop)
          //   this.navBarScrollY.push(this.$refs.comment.$el.offsetTop)
          //   this.navBarScrollY.push(this.$refs.recommend.$el.offsetTop)
          //   this.navBarScrollY.push(Number.MAX_VALUE)
          //
          //   console.log(this.navBarScrollY)
          // })

        })

        //3.获取推荐信息
        getRecommends().then(res => {
          this.recommend = res.data.list
        })

        // 放在 created 肯定不行，压根不能获取元素
        // this.navBarScrollY = []
        //
        // this.navBarScrollY.push(0)
        // this.navBarScrollY.push(this.$refs.params.$el.offsetTop)
        // this.navBarScrollY.push(this.$refs.comment.$el.offsetTop)
        // this.navBarScrollY.push(this.$refs.recommend.$el.offsetTop)
        // this.navBarScrollY.push(Number.MAX_VALUE)
        //
        // console.log(this.navBarScrollY)

      },
      mounted() {
        //放在mounted 里面也不行，因为数据还没获取到
        // this.navBarScrollY = []
        //
        // this.navBarScrollY.push(0)
        // this.navBarScrollY.push(this.$refs.params.$el.offsetTop)
        // this.navBarScrollY.push(this.$refs.comment.$el.offsetTop)
        // this.navBarScrollY.push(this.$refs.recommend.$el.offsetTop)
        // this.navBarScrollY.push(Number.MAX_VALUE)
        //
        // console.log(this.navBarScrollY)
        //4.getThemeTopY
        this.getThemeTopY = debounce(() => {
          this.navBarScrollY = []

          this.navBarScrollY.push(0)
          this.navBarScrollY.push(this.$refs.params.$el.offsetTop)
          this.navBarScrollY.push(this.$refs.comment.$el.offsetTop)
          this.navBarScrollY.push(this.$refs.recommend.$el.offsetTop)
          this.navBarScrollY.push(Number.MAX_VALUE)

          console.log(this.navBarScrollY)
        }, 200)

        this.$bus.$on('imageLoad', () => {
          this.getThemeTopY()
        })
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
        },

        //加入购物车
        addCart() {
          // 获取购物车需要展示的信息
          const product = {}
          product.image = this.topImages[0]
          product.title = this.goodsInfo.title
          product.desc = this.detailInfo.desc
          product.price = this.goodsInfo.price
          product.iid = this.iid

          //将信息添加到购物车store
          this.$store.dispatch('addToCart', product)

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
    height: calc(100% - 44px - 49px)
  }

  .back-top {
    position: fixed;

    /*top: 0;*/
    right: 20px;
    bottom: 60px;
    z-index: 9;
  }
</style>
