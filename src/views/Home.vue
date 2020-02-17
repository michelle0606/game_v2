<template>
  <div class="home">
    <h2>歡迎 Walle</h2>
    <div class="avatar">
      <img src="orange.png" alt />
    </div>
    <div class="info">
      <div>等級：2</div>
      <div>
        <div>勝率：25.0%</div>
        <div>【4T.1W.3L】</div>
      </div>
      <div>經驗值：300/2000</div>
    </div>
    <div class="btns">
      <router-link class="btn btn-info" to="/">排行榜</router-link>
      <div class="row-group">
        <router-link class="btn btn-info" to="/">限時比賽</router-link>
        <router-link class="btn btn-info" to="/">搶答競賽</router-link>
      </div>
      <router-link class="btn btn-info" to="/game">考試模式</router-link>
    </div>
    <div class="signout">
      <router-link to="/signout" class="btn btn-success">登出</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style >
.home {
  margin-top: 50px !important;
}

.avatar > img {
  width: 180px;
}

.info > div {
  margin: 10px;
  font-size: 20px;
}

.btns {
  width: 330px;
  margin: auto;
}

.btns > a {
  display: flex;
  flex-flow: column;
  margin: 10px 0px;
}
.btns > a:nth-child(1) {
  width: 70%;
  margin: 10px auto;
}

.row-group > a {
  width: 48%;
}

.row-group > a:nth-child(1) {
  margin-right: 10px;
}

.signout {
  width: 330px;
  margin: auto;
  text-align: right;
}
</style>
