export default {
    addToCart(context, payload) {
        //数组常用的方法 push/pop/unshift/shift/sort/reduce/map/filter/forEach/reverse/join/find

        let oldProduct = context.state.productList.find(item => item.iid === payload.iid)

        if(oldProduct) {
            context.commit('addProductCount', oldProduct)
        }else {
            context.commit('addToCart', payload)
        }
    }
}