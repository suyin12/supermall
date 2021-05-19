<template>
    <div class="bottom-bar">
        <div class="bottom-bar-item">
            客服
        </div>
        <div class="bottom-bar-item">
            店铺
        </div>
        <div class="bottom-bar-item">
            收藏
        </div>
        <div class="bottom-bar-item" @click="addCart">
            加入购物车
        </div>
        <div class="bottom-bar-item">
            购买
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailBottomNav",
        methods: {
            addCart() {
                this.$emit('addCart')
            }
        }
    }
</script>

<style scoped>
    .bottom-bar{
        background-color: var(--color-tint);
        height: 49px;
        line-height: 49px;
        display: flex;

        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;

        z-index: 100;
        text-align: center;
        font-size: 12px;
    }
    .bottom-bar-item {
        flex: 1;
        color: #fff;
    }
</style>