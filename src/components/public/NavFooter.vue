<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>             
    <div class="footer-link">
      <a href="http://rzi2016.online" target="_blank">rzi2016.online</a><span>|</span>
      <a href="http://music.rzi2016.online" target="_blank">仿网易云播放器</a><span>|</span>
      <a href="http://admin.rzi2016.online" target="_blank">电商后台管理系统</a><span>|</span>
      <a href="http://jd.rzi2016.online" target="_blank">移动端老版本京东金融布局</a>
    </div>
    <div class="copyright">Copyright ©2020 <span class="domain">rzi2016.online</span> All Rights Reserved.</div>
  </div>
</template>
<script>
  export default{
    name:'nav-footer'
  }
</script>
<style lang="less" scoped>
  .footer{
    height:234px;
    border-top:4px solid #FF6600;
    background-color:#333333;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-logo{
      margin-top:46px;
      margin-bottom:31px;
      img{
        width:53px;
        height:36px;
        margin-bottom:13px;
      }
    }
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
      margin-bottom:13px;
    }
    .copyright{
      .domain{
        color:#FF6600;
      }
    }
  }
</style>