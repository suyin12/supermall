export default {
    addProductCount(state, payload) {
        payload.count += 1
    },
    addToCart(state, payload) {
        payload.count = 1
        state.productList.push(payload)
    }
}