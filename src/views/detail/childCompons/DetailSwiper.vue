<template>
  <div class="detail-swiper">
    <swiper class="swiper">
      <swiper-item v-for="item in topImages" class="swiper-item">
        <img :src="item" alt="" @load="imageLoad"/>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper"

    export default {
        name: "DetailSwiper",
      components: {
        Swiper,
        SwiperItem
      },
      props: {
        topImages: {
          type: Array,
          default: []
        }
      },
      methods: {
        imageLoad() {
          console.log('imageLoad')
        }
      }
    }
</script>

<style scoped>
  .swiper {
    height: 300px;
    /*overflow: hidden;*/
  }

  .swiper-item img {
    width: 100%;
  }
</style>
