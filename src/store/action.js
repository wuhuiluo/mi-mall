export default {
    saveUserName(context, username) {
        context.commit('saveUserName', username)
    },
    saveCartCnt(context, cartCnt) {
        context.commit('saveCartCnt', cartCnt)
    }
}