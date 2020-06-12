<template>
  <div class="order-confirm">
    <order-header title="订单确认"></order-header>
    <div class="wrapper">
      <div class="container w">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearfix">
              <div class="addr-info" v-for="(item, index) in addrList" :key="index" @click="selectedAddrId = item.id" :class="{ checked: item.id == selectedAddrId }">
                <h2>{{ item.username }}</h2>
                <div class="phone">{{ item.mobile }}</div>
                <div class="street">{{ item.address }}</div>
                <div class="action">
                  <a href="javascript:;" class="fl" @click="delAddrById(item.id)">
                    <i class="el-icon-delete"></i>
                  </a>
                  <a href="javascript:;" class="fr" @click="diglogOpen('edit', item)">
                    <i class="el-icon-edit"></i>
                  </a>
                </div>
              </div>
              <div class="addr-add" @click="diglogOpen('add')">
                <div class="icon-add">
                  <i class="el-icon-circle-plus-outline"></i>
                </div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul v-for="(item, index) in cartList" :key="index">
              <li>
                <div class="good-name">
                  <img :src="item.img" alt="" />
                  <span>{{ item.name }}</span>
                </div>
                <div class="good-price">{{ item.price }}元 x {{ item.quantity }}</div>
                <div class="good-total">{{ item.cartCmount }}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{ productCnt }}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{ cartTotalAmount }}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{ cartTotalAmount }}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
          </div>
        </div>
      </div>
      <!-- 添加收货地址对话框 -->
      <el-dialog :title="diglogTitle" :visible.sync="diglogVisable" width="39%" @close="diglogClose" :close-on-click-modal="false">
        <!-- 内容主体区域 -->
        <el-form :model="addrForm" :rules="formRules" ref="addrFormRef" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addrForm.username" style="width: 217px;" placeholder="姓名，如 rzcoding"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addrForm.mobile" style="width: 217px;" placeholder="请填写正确的11位手机号码"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" prop="addrZone">
            <el-cascader v-model="addrForm.addrZone" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange" clearable></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="addrDetail">
            <el-input type="textarea" v-model="addrForm.addrDetail" placeholder="街道、小区、楼牌号等，无须重复填写省市区"></el-input>
          </el-form-item>
          <!-- 底部按钮区域 -->
          <div class="addr-foot">
            <el-button @click="diglogVisable = false">取 消</el-button>
            <el-button type="primary" @click="addrOnSubmit">确 定</el-button>
          </div>
        </el-form>
        <!-- 底部区域 -->
        <!--         <span slot="footer" class="dialog-footer">
          <el-button @click="diglogVisable = false">取 消</el-button>
          <el-button type="primary" @click="addrOnSubmit">确 定</el-button>
        </span>  -->
      </el-dialog>
    </div>
  </div>
</template>
<script>
import OrderHeader from 'components/order/OrderHeader'
import { getAddrList, getCartList, addAddress, updAddress, delAddress, addOrder } from 'network/request.js'
export default {
  components: {
    OrderHeader
  },
  data() {
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      addrList: [], //收货地址列表
      cartList: [], //购物车中需要结算的商品列表
      cartTotalAmount: 0,
      productCnt: 0,
      selectedAddrId: 1, //当前收货地址选中索引
      diglogVisable: false, //是否显示新增或者编辑弹框
      diglogTitle: '',
      addrForm: {
        id: 0,
        username: '',
        mobile: '',
        addrZone: [],
        addrDetail: ''
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        addrZone: [{ required: true, message: '请选择所在地区', trigger: 'blur' }],
        addrDetail: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
      },
      options: [
        {
          value: '北京',
          label: '北京',
          children: [
            {
              value: '北京市',
              label: '北京市',
              children: [
                { value: '东城区', label: '东城区' },
                { value: '西城区', label: '西城区' },
                { value: '朝阳区', label: '朝阳区' },
                { value: '海淀区', label: '海淀区' },
                { value: '丰台区', label: '丰台区' }
              ]
            }
          ]
        },
        {
          value: '天津',
          label: '天津',
          children: [
            {
              value: '天津市',
              label: '天津市',
              children: [
                { value: '和平区', label: '和平区' },
                { value: '南开区', label: '南开区' },
                { value: '津南区', label: '津南区' },
                { value: '北辰区', label: '北辰区' },
                { value: '武清区', label: '武清区' }
              ]
            }
          ]
        },
        {
          value: '上海',
          label: '上海',
          children: [
            {
              value: '上海市',
              label: '上海市',
              children: [
                { value: '黄浦区', label: '黄浦区' },
                { value: '徐汇区', label: '徐汇区' },
                { value: '静安区', label: '静安区' },
                { value: '普陀区', label: '普陀区' },
                { value: '虹口区', label: '虹口区' },
                { value: '浦东新区', label: '浦东新区' }
              ]
            }
          ]
        },
        { value: '重庆', label: '重庆', children: [{ value: '重庆', label: '重庆', children: [{ value: '江津区', label: '江津区' }] }] },
        {
          value: '四川省',
          label: '四川省',
          children: [
            { value: '成都市', label: '成都市', children: [{ value: '锦江区', label: '锦江区' }] },
            { value: '自贡市', label: '自贡市', children: [{ value: '自流井区', label: '自流井区' }] },
            { value: '攀枝花市', label: '攀枝花市', children: [{ value: '盐边县', label: '盐边县' }] }
          ]
        },
        {
          value: '浙江省',
          label: '浙江省',
          children: [
            { value: '杭州市', label: '杭州市', children: [{ value: '西湖区', label: '西湖区' }] },
            { value: '宁波市', label: '宁波市', children: [{ value: '余姚市', label: '余姚市' }] },
            { value: '温州市', label: '温州市', children: [{ value: '龙湾区', label: '龙湾区' }] }
          ]
        },
        {
          value: '江苏省',
          label: '江苏省',
          children: [
            { value: '南京市', label: '南京市', children: [{ value: '玄武区', label: '玄武区' }] },
            { value: '无锡市', label: '无锡市', children: [{ value: '崇安区', label: '崇安区' }] },
            { value: '苏州市', label: '苏州市', children: [{ value: '平江区', label: '平江区' }] }
          ]
        }
      ]
    }
  },
  created() {
    this._getAddrList()
  },
  methods: {
    async _getAddrList() {
      let addrList = await getAddrList()
      this.addrList = addrList

      let cartData = await getCartList({ selected: 1 })
      if (!cartData) {
        return false
      }
      let { amount, CartProducts, selectedCartCnt } = cartData
      this.cartList = CartProducts
      this.cartList.map(item => {
        this.productCnt += item.quantity
        item.cartCmount = Number(item.price) * Number(item.quantity)
      })
      this.cartTotalAmount = amount
      this.addCnt = this.cartList.length
    },
    async delAddrById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该收货地址, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      let addrList = await delAddress(id)
      this.addrList = addrList
      this.$message.success('删除收货地址成功')
    },
    //监听对话框关闭事件
    diglogClose() {
      this.$refs.addrFormRef.resetFields()
    },
    diglogOpen(operation, item) {
      this.diglogVisable = true
      if (operation === 'add') {
        this.addrForm = {
          id: 0,
          username: '',
          mobile: '',
          addrZone: [],
          addrDetail: ''
        }
        this.diglogTitle = '添加收货地址'
      } else if (operation === 'edit') {
        this.diglogTitle = '修改收货地址'
        let addrZone = []
        let addrDetail = ''
        let { id, username, mobile, address } = item
        let addrList = address.split(' ')
        if (addrList.length > 3) {
          addrZone = addrList.slice(0, 3)
          addrDetail = addrList.slice(3, addrList.length).join('')
        }
        this.addrForm = {
          id,
          username,
          mobile,
          addrZone,
          addrDetail
        }
      }
    },
    async addrOnSubmit() {
      this.$refs.addrFormRef.validate(async valid => {
        if (!valid) return
        let { id, username, mobile, addrZone, addrDetail } = this.addrForm
        let newAddr = {
          id: id,
          username,
          mobile,
          address: addrZone.join(' ') + ' ' + addrDetail
        }
        if (id !== 0) {
          let addrList = await updAddress(id, newAddr)
          this.addrList = addrList
          this.$message.success('修改收货地址成功')
        } else {
          let addrList = await addAddress(newAddr)
          this.addrList = addrList
          this.$message.success('添加收货地址成功')
        }
        this.$refs.addrFormRef.resetFields()
        this.diglogVisable = false
      })
    },
    handleChange(value) {
      if (this.addrForm.addrZone.length != 3) {
        this.addrForm.addrZone = []
        return
      }
    },
    // 订单提交
    async orderSubmit() {
      let selectAddrCnt = this.addrList.filter(item => item.id === this.selectedAddrId).length
      if (selectAddrCnt != 1) {
        this.$message.error('请选择一个收货地址')
        return
      }
      if (this.cartList && this.cartList.length != 0) {
        let orderId = await addOrder({ addressId: this.selectedAddrId })
        this.$router.push({
          path: '/order/pay',
          query: {
            orderNo: orderId
          }
        })
      } else {
        this.$message.error('劝你善良，不要重复提交，狗腿给你打断警告！')
        return
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~assets/css/mixin.less';
.order-confirm {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 84px;
    .order-box {
      background-color: #fff;
      padding-left: 40px;
      padding-bottom: 40px;
      .item-address {
        padding-top: 38px;
        .addr-title {
          color: #333;
          margin-bottom: 21px;
        }
        .addr-list {
          .addr-info,
          .addr-add {
            box-sizing: border-box;
            float: left;
            width: 271px;
            height: 180px;
            border: 1px solid #e5e5e5;
            margin-right: 15px;
            padding: 15px 24px;
            font-size: 14px;
            color: #757575;
          }
          .addr-info {
            cursor: pointer;
            h2 {
              height: 27px;
              font-size: 18px;
              font-weight: 300;
              color: #333;
              margin-bottom: 10px;
            }
            .street {
              margin: 7px 0;
              height: 50px;
            }
            .action {
              height: 30px;
              line-height: 30px;
              i {
                font-size: 25px;
                color: #757575;
              }
            }
            &.checked {
              border: 1px solid #ff6700;
            }
          }
          .addr-add {
            text-align: center;
            color: #999999;
            cursor: pointer;
            .icon-add {
              margin: 0 auto;
              margin-top: 45px;
              margin-bottom: 10px;
              i {
                font-size: 30px;
              }
            }
          }
        }
      }
      .item-good {
        margin-top: 34px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 12px;
        h2 {
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 5px;
        }
        li {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          font-size: 16px;
          color: #333333;
          .good-name {
            flex: 5;
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
              margin-right: 15px;
            }
          }
          .good-price {
            flex: 2;
          }
          .good-total {
            padding-right: 44px;
            color: #ff6600;
          }
        }
      }
      .item-shipping,
      .item-invoice {
        margin-top: 31px;
        line-height: 20px;
        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: 20px;
          width: 80px;
        }
        span,
        a {
          font-size: 16px;
          color: #ff6700;
          margin-right: 23px;
        }
      }
      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
        text-align: right;
        font-size: 16px;
        color: #666666;
        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }
        .item-val {
          color: #ff6700;
          display: inline-block;
          width: 150px;
        }
        .item-total {
          .item-val {
            font-size: 28px;
          }
        }
      }
      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }
    /deep/ .el-dialog {
      .el-dialog__header {
        border-bottom: 1px solid #ddd;
        .el-dialog__title {
          font-size: 20px;
          color: #333;
        }
      }
      .el-form {
        .addr-foot {
          .flex(flex-end);
        }
      }
    }
  }
}
</style>