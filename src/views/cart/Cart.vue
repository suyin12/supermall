<template>
  <div class="cart">
    <navbar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </navbar>
  </div>
</template>

<script>
  import Navbar from "../../components/common/navbar/Navbar";

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {Navbar},
    computed: {
      //两种用法1
      ...mapGetters(['cartLength', 'productList'])
      //2

    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
