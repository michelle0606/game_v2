<template>
  <div class="login">
    <h1>Login</h1>
    <form action="/login" method="post">
      <div class="form-group row">
        <label for="account" class="col-3 col-form-label">帳號</label>
        <div class="col-9">
          <input type="text" class="form-control" id="account" name="account" />
        </div>
      </div>
      <div class="form-group row">
        <label for="password" class="col-3 col-form-label">密碼</label>
        <div class="col-9">
          <input type="password" class="form-control" id="password" name="password" />
        </div>
      </div>
      <div class="form-group row justify-content-center">
        <button type="button">
          <router-link to="/signup">
            <img src="book.png" alt />
          </router-link>
        </button>
        <button type="submit">
          <router-link to="/">
            <img src="login.png" alt />
          </router-link>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login {
  width: 100%;
  background: gold;
  padding: 50px;
  height: 100vh;
}

img {
  width: 150px;
}

button {
  border: none;
  background: gold;
}

input {
  border: none;
  background: none;
  border-bottom: 1px solid;
  border-radius: 0px;
}
@media screen and (min-width: 768px) {
  .login {
    width: 400px;
    margin: 50px auto;
    padding: 20px;
  }
}
</style>
