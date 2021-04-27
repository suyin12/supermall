<template>
  <div>
    <detail-nav-bar />
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
    import DetailNavBar from "./childCompons/DetailNavBar";
    import DetailSwiper from "./childCompons/DetailSwiper"

    //从服务器获取数据
    import {getDetail} from "network/detail";

    export default {
      name: "Detail",
      components: {
        DetailNavBar,
        DetailSwiper
      },
      data() {
          return {
            iid: null,
            topImages: []
          }
      },
      created() {
        //1.保存iid
        this.iid = this.$route.params.iid

        //2.根据iid请求数据
        getDetail(this.iid).then((res) => {
          console.log(res)
          //保存轮播图数据
          this.topImages = res.result.itemInfo.topImages
        })
      }
    }
</script>

<style scoped>

</style>
