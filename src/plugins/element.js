import Vue from 'vue'
import {
    Button,
    FormItem,
    Input,
    Form,
    Message,
    Row,
    Col,
    Dialog,
    MessageBox,
    Alert,
    Pagination,
    Cascader,
} from 'element-ui'
Vue.use(Button)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Alert)
Vue.use(Pagination)
Vue.use(Cascader)


Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm