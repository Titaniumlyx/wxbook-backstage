<template>
  <div class="container">
    <el-form label-position="top" label-width="80px">
      <el-form-item label="用户名:">
        <el-input v-model="userInfo.username" class="nameInput" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="昵称:">
        <el-input v-model="userInfo.nickname" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="userInfo.email" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="头像:">
        <uploadImg v-model="userInfo.avatar" style="float: left"></uploadImg>
        <span style="float: left" class="remark">点击图标进行修改</span>
      </el-form-item>
      <el-form-item label="个人描述:">
        <el-input v-model="userInfo.desc" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="btnItem"
          @click="handleSubmit"
        >提交修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import uploadImg from '@/components/uploadImg'

  export default {
    name: "personCenter",
    computed: {
      ...mapState(['userInfo'])
    },
    components: {
      uploadImg,
    },
    methods: {
      handleSubmit(){
        this.$axios.put('/user/userInfo', this.userInfo).then(res => {
          console.log(res);
          if(res.code === 200){
            this.$message.success(res.msg)
            this.$store.commit('SET_USERINFO', this.userInfo)
            setTimeout(() => {
              this.$router.push('/layout/index')
            }, 1000)
          }else{
            this.$message.error(res.msg)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    padding: 20px;
    .nameInput{
      width: 300px;
    }
    .remark{
      display: block;
      margin-left: 30px;
      margin-top: 15px;
      color: #aaa;
    }
  }
</style>
