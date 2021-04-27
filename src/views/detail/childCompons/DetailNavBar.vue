<template>
  <div>
    <navbar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" />
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             class="title-item"
             :class="{active: currentIndex === index}"
             @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </navbar>
  </div>
</template>

<script>
    import Navbar from "components/common/navbar/Navbar";
    export default {
        name: "DetailNavBar",
      components: {Navbar},
      data() {
          return {
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
          }
      },
      methods: {
        itemClick(index) {
          this.currentIndex = index
        },
        back() {
          this.$router.back()
        }
      }
    }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-tint);
  }

  .back img{
    margin-top: 10px;
  }
</style>
