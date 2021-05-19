<template>
    <tab-bar>
        <tab-bar-item path="/home">
            <div slot="item-icon"><img src="~assets/img/tabbar/home.svg" /></div>
            <div slot="item-icon-active"><img src="~assets/img/tabbar/home_active.svg" /></div>
            <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item path="/category">
            <div slot="item-icon"><img src="~assets/img/tabbar/category.svg" /></div>
            <div slot="item-icon-active"><img src="~assets/img/tabbar/category_active.svg" /></div>
            <div slot="item-text">分类</div>
        </tab-bar-item>
        <tab-bar-item path="/cart">
            <div slot="item-icon"><img src="~assets/img/tabbar/shopcart.svg" /></div>
            <div slot="item-icon-active"><img src="~assets/img/tabbar/shopcart_active.svg" /></div>
            <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item path="/profile">
            <div slot="item-icon"><img src="~assets/img/tabbar/profile.svg" /></div>
            <div slot="item-icon-active"><img src="~assets/img/tabbar/profile_active.svg" /></div>
            <div slot="item-text">我的</div>
        </tab-bar-item>
    </tab-bar>
</template>

<script>
    import TabBarItem from "components/common/tabbar/TabBarItem";
    import TabBar from "components/common/tabbar/TabBar";
    export default {
        name: "MainTabBar",
        components: {TabBar, TabBarItem}
    }
</script>

<style scoped>

</style>
