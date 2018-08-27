<template>
  <div class="container">
    <h1 class="login-title">This is WXbook-backstage</h1>
    <div class="login-content">
      <h2 class="loginIn">请登录</h2>
      <div class="loginInItem">
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="ruleForm.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="password" v-model="ruleForm.password" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="loginIn"
              :loading="isLoading"
              class="btnItem"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        ruleForm: {
          username: '12121',
          password: '12121'
        },
        isLoading: false
      };
    },
    methods: {
      // 一、 不使用 store(mapActions)
      // async loginIn(){
      //   this.isLoading = true
      //   const data = await this.$axios.post('/login', this.ruleForm)
      //   this.isLoading = false
      //   // console.log(data);
      //   if(data.code === 200){
      //     this.$router.push('/layout/index')
      //   }else{
      //     this.$message.error(data.msg);
      //   }
      // }
      // 二、  使用 store , 不使用 mapActions
      loginIn(){
        this.isLoading = true
        // this.$store.dispatch('login', this.ruleForm).then((isLogin) => {
        //   this.isLoading = false
        //   // console.log(isLogin);
        //   if(isLogin){
        //     this.$router.push('/layout/index')
        //   }
        // })
        // 三、  使用 mapActions
        // this.login(this.ruleForm).then((isLogin) => {
        //   this.isLoading = false
        //   if(isLogin){
        //     this.$router.push('/layout/index')
        //   }
        // })
        // 四、 不使用 actions
          this.isLoading = true
          this.$axios.post('/login', this.ruleForm).then((data) => {
            this.isLoading = false
            // console.log(data);
            if(data.code === 200){
              this.$message.success(data.msg);
              this.$store.commit('SET_USERINFO', data.data)
              this.$router.push('/layout/index')
            }else{
              this.$message.error(data.msg);
            }
          }).catch(err => {
            this.isLoading = false
            this.$message.error('请求超时，请检查你的网络')
          })
      },
      ...mapActions(['login'])
    }
  }
</script>

<style scoped lang="scss">
  .container{
    background: #404040;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    .login-title{
      display: block;
      color: #fff;
      padding-top: 100px;
    }
    .login-content{
      background: #fff;
      padding: 50px 20px;
      width: 570px;
      margin: 22px auto;
      .loginIn{
      }
      .loginInItem{
        margin-top: 26px;
        .btnItem{
          width: 300px;
        }
      }
    }
  }
</style>
