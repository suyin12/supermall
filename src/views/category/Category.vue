<template>
  <div class="wrapper" ref="aaa">
    <ul class="content">
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    //组件创建完之后，模板还没挂载
    created() {
      // console.log(this.$refs.aaa)
      // console.log(document.querySelector('.wrapper'))
      // this.scroll = new BScroll(this.$refs.aaa, {
      //
      // })
    },
    //模板已挂载的时候
    mounted() {

      // this.scroll = new BScroll(this.$refs.aaa, {
      //
      // })
      this.scroll = new BScroll(document.querySelector('.wrapper'), {

      })
    }
  }
</script>

<style scoped>
  .content {
    /*height: 200px;*/
    /*background-color: red;*/
    /*!*原生实现滚动*!*/
    /*!*overflow: hidden;*!*/
    /*overflow-y: scroll;*/
  }

  .wrapper {
    height: 150px;
    background-color: #eeeeee;

    overflow: hidden;
  }
</style>
