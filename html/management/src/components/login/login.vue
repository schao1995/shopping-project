<template>
  <div class="login">
    <el-form :rules="rules" status-icon :model="formLogin" ref="formLogin" :label-position="labelPosition" label-width="80px">
      <el-form-item label="用户名" prop="loginName">
        <el-input v-model="formLogin.loginName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="loginPass">
        <el-input type="password" v-model="formLogin.loginPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formLogin')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import POWERMODE from '../../../static/js/activate'
export default {
  name: 'login',
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'right',
      formLogin: {
        loginName: '',
        loginPass: ''
      },
      rules: {
        loginName: [
          { validator: validateName, trigger: 'blur' }
        ],
        loginPass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    let sw = window.screen.width
    if (sw > 1200) {
      POWERMODE.colorful = true
      POWERMODE.shake = false
      document.body.addEventListener('input', POWERMODE)
    }
  },
  methods: {
    submitForm (formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // eslint-disable-next-line no-undef
          this.$axios({
            method: 'post',
            url: '/api/users',
            /* data: {
              username: this.formLogin.loginName,
              password: this.formLogin.loginPass
            } */
            data: this.$qs.stringify({
              username: this.formLogin.loginName,
              password: this.formLogin.loginPass
            })
          }).then(function (response) {
            console.log(response.data)
            if (response.data.code === -1) {
              that.$message.error(response.data.msg)
            } else {
              sessionStorage.setItem('token', response.data.token)
              that.$router.push({ path: '/public' })
            }
          }).catch(function (error) {
            console.log(error)
          })
          // this.$router.push({ path: '/public' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    width: 100%;
    height: 100%;
  }
  .el-form {
    width: 320px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .el-button {
    width: 100%;
  }
</style>
