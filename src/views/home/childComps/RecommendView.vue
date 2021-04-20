<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Recommend",
    props: {
      recommends: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 10px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
  }

  .recommend-item img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>
