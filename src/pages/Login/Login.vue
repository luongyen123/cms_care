<template>
  <div class="text-center container">
    <div class="form-signin" id="validated-form">
      <h1 class="h3 mb-3 font-weight-normal">Please Login</h1>
      <div class="form-group">
        <label for="inputUserID" class="sr-only">UserID</label>
        <input
          ref="userId"
          type="text"
          id="inputUserID"
          class="form-control"
          placeholder="UserID"
          name="userId"
          v-model="loginForm.userId"
          v-on:keyup="checkUserID"
        />
        <p v-if="userIDValidate" class="error">{{userIDValidate}}</p>
      </div>
      <div class="form-group">
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          ref="password"
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          v-on:keyup="checkPassword"
          v-model="loginForm.password"
        />
        <p v-if="passwordValidate" class="error">{{passwordValidate}}</p>
      </div>
      <button class="btn btn-lg btn-primary btn-block" v-on:click="handleLogin">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      userIDValidate: "",
      passwordValidate: "",
      loginForm: {
        userId: null,
        password: null
      },
      loadingID: false,
      loadingPass: false,
      redirect: "/",
      otherQuery: {},
    };
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (!this.loginForm.userId) {
      this.$refs.userId.focus();
    } else if (!this.loginForm.password) {
      this.$refs.password.focus();
    }
  },
  methods: {
    handleLogin() {
      this.checkUserID()
      this.checkPassword()
      if (this.loadingID && this.loadingPass) {
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push("/dashboard")
            }).catch((error) =>{
              console.log(error)
            })
      }
     
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    checkUserID(e) {
      this.userIDValidate = ""
      if (!this.loginForm.userId) {
        this.userIDValidate = "UserID required"
      } else if(this.loginForm.userId.length <3) {
        this.userIDValidate = "UserID must be at least 3 characters"
      }
      if(this.userIDValidate === ""){
        this.loadingID =  true
      }
    },
    checkPassword(e) {
      this.passwordValidate = ""
      if (!this.loginForm.password) {
        this.passwordValidate = "Password required"
      } else if(this.loginForm.password.length < 6){
        this.passwordValidate = "Password must be at least 6 characters"
      }
      if(this.passwordValidate === ""){
        this.loadingPass = true
      }
    }
  }
};
</script>

<style lang="scss">
  html,
  body {
    height: 100%;
  }

  .error{
    color: red
  }
  .form-signin {
    max-width: 400px;
    width: 100%;
    padding: 15px;
    margin: 0 auto;
    input {
      border: 1px solid #ced4da;
      border-radius: 0.25rem !important;
      background: #fff;
    }
  }
</style>
