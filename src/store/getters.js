export default {
    cartLength(state) {
        return state.productList.length || 0
    },
    productList(state) {
        return state.productList
    }
}