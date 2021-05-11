import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
    data() {
        return {
            itemListener: null,
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 100)

        this.itemListener = () => {
            this.newRefresh()
        }

        this.$bus.$on('imageLoad', this.itemListener)
        console.log('我是混入的内容')
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
            tabOffsetTop: 0,
        }
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0)
        },
        listenShowBackTop(position) {
            // 1.判断BackTop是否显示
            this.isShowBackTop = (-position.y) > 1000
        }
    }
}