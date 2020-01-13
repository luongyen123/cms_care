<template>
  <div class="text-center bg-light">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please Login</h1>
      <div class="form-group">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="text"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
        />
      </div>
      <div class="form-group">
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      errors: [],
      loginForm: {
        userId: null,
        password: null
      },
      passwordType: "password",
      loading: false,
      redirect: "/",
      otherQuery: {},
      ...validations
    };
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.userId === "") {
      this.$refs.userId.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    handleLogin() {
      console.log(this.$refs.loginForm);
      this.$refs.userId.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    checkForm(e) {
      this.errors = [];
      if (!this.userId) {
        this.errors.push(" UserID required");
      } else if (!this.password) {
        this.errors.push(" Password required");
      }
      if (!this.errors.length) {
        return true;
      }
      e.preventDefault();
    }
  }
};
</script>

<style lang="scss">
  html,
  body {
    height: 100%;
  }

  body {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  .form-signin {
    min-width: 400px;
    max-width: 100%;
    padding: 15px;
    margin: 0 auto;
    input {
      border: 1px solid #ced4da;
      border-radius: 0.25rem !important;
      background: #fff;
    }
  }

  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
