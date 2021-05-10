import {debounce} from "./utils";

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