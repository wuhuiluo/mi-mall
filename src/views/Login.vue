<template>
  <div class="login">
    <div class="header">
      <a href="/">
        <img src="/imgs/login-logo.png" />
      </a>
    </div>
    <div class="container">
      <div class="login-box">
        <img class="logo" src="/imgs/logo.png">
        <div class="title">登陆页面</div>
        <input placeholder="账号" type="text" v-model="loginForm.username" />
        <input placeholder="密码" type="password" v-model="loginForm.password" />
        <div class="denglu">
          <el-button class="enter" round type="primary" @click="login">登陆</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <h1>吴辉洛的小米商城</h1>
    </div>
  </div>
</template>


<script>
import { postLogin, getUserInfo } from "../network/request.js";
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      loginForm: {
        username: "rzcoding",
        password: "rzcoding"
      },
      userId: ""
    };
  },

  methods: {
    ...mapActions(['saveUserName']),

    async login() {
      await postLogin(this.loginForm);
      const data = await getUserInfo();
      console.log(data);
      this.$cookies.set('userId', data.userId, 60 * 60 * 24 * 7)
      this.$message({
        message: "恭喜你,登陆成功",
        type: "success",
        center: true,
        duration: 1000
      });
      this.saveUserName(data.username)
      this.$router.push("/index");
    }
  }
};
</script>


<style lang="less">
.login {
  width: 100%;
  height: 100%;
  .footer {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .header {
    height: 116px;
    a {
      width: 230px;
      height: 116px;
      display: block;
      margin-left: 100px;
      margin-top: 20px;
      img {
        width: 230px;
        height: 116px;
      }
    }
  }
  .container {
    height: 576px;
    background: url("/imgs/login-bg.jpg") no-repeat 50%;
  }
  .login-box {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    height: 400px;
    position: absolute;
    right: 50px;
    bottom: 100px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    font-family: sans-serif;
    .logo {
       width: 96px;
       height: 76px;
       z-index: 99;
       position: absolute;
       top: -30px;
    }
    .title {
      margin-top: 80px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #444;
      font-weight: 700;
    }
    input {
      border: 0;
      background: none;
      display: inline-block;
      margin: 20px auto;
      text-align: center;
      border: 2px solid #3498db;
      padding: 14px 10px;
      width: 200px;
      outline: none;
      border-radius: 24px;
      transition: 0.25s;
    }
    input:focus {
      width: 280px;
    }
    .denglu {
      .enter {
        &:hover {
          width: 100px;
        }
      }
    }
  }
}
</style>