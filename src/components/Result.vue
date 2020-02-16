<template>
  <div id="result">
    <div class="box">
      <div class="title">遊戲結束</div>
      <div class="who">
        <div>
          <img src="orange.png" alt="" />
          <div>Walle</div>
        </div>
        <div class="vs">V.S.</div>
        <div>
          <img src="apple.png" alt="" />
          <div>電腦</div>
        </div>
      </div>
      <div class="total-point">答對題數 {{ num }}</div>
      <div class="ex">獲得經驗值 {{ 100 + ex / 4 }}</div>
      <div class="btn-group">
        <!-- <button v-on:click="methodThatForcesUpdate"></button> -->
        <!-- <router-link to="/game">再來一場</router-link> -->
        <router-link to="/">結束這回合</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    },
    cc: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      ex: this.total,
      num: this.cc
    }
  }
}
</script>
<style scoped>
#result {
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 100;
  height: 100%;
}

.box {
  background-color: antiquewhite;
  width: 400px;
  height: 500px;
  margin: auto;
  border-radius: 20px;
  margin-top: 80px;
  box-shadow: 0 0 20px black;
}

.title {
  padding-top: 30px;
  font-size: 30px;
}

.who {
  display: flex;
  justify-content: center;
  margin: 30px;
}

.vs {
  font-size: 20px;
  font-weight: bold;
  margin: auto 15px;
}

.total-point {
  margin-bottom: 5px;
  font-size: 20px;
}

.ex {
  margin-bottom: 40px;
  font-size: 20px;
}

.btn-group > a {
  background: none;
  padding: 5px 0px;
  border: 1px solid;
  border-radius: 10px;
  width: 110px;
}

.btn-group {
  display: flex;
  justify-content: space-evenly;
}

img {
  width: 150px;
}
</style>
