<template>
  <div class="login">
    <h1>微積分知識王</h1>
    <h2>帳號註冊</h2>
    <form action="/login" method="post">
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">姓名</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            placeholder="請輸入本名"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="account" class="col-sm-2 col-form-label">帳號</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="account"
            name="account"
            placeholder="請輸入帳號"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="password" class="col-sm-2 col-form-label">密碼</label>
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="請輸入密碼"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="password2" class="col-sm-3 col-form-label">密碼確認</label>
        <div class="col-sm-9">
          <input
            type="password"
            class="form-control"
            id="password2"
            name="password2"
            placeholder="再輸入一次密碼"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="departments" class="col-sm-2 col-form-label">系所</label>
        <select name="departments" id="departments">
          <option value="">應用數學系</option>
          <option value="">電子物理學系</option>
          <option value="">應用化學系</option>
          <option value="">生物機電工程學系</option>
          <option value="">土木與水資源工程學系</option>
          <option value="">資訊工程學系</option>
        </select>
      </div>
      <div class="form-group row justify-content-center">
        <button type="submit" class="btn btn-lg btn-dark">送出</button>
      </div>
      <div class="form-group back">
        <button type="button" class="btn btn-light">
          <router-link to="/login">登入</router-link>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login {
  width: 400px;
  margin: 50px auto;
  background: gold;
  padding: 20px;
}

img {
  width: 150px;
}

input {
  border: none;
  background: none;
  border-bottom: 1px solid;
  border-radius: 0px;
}

select {
  background: none;
  border: none;
}

.back {
  text-align: left;
}
</style>
