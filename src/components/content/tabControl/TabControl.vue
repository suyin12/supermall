<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in titles"
         @click="tabControlItemClick(index)" :class="{active: currentIndex === index}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
    export default {
      name: "TabControl",
      data() {
        return {
          isActive: true,
          currentIndex: 0
        }
      },
      props: {
        titles: {
          type: Array,
          default: []
        }
      },
      methods: {
        tabControlItemClick(index) {
          this.currentIndex = index
        }
      }
    }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
