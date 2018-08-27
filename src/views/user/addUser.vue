<template>
 <div class="container">
   <el-form label-position="top" label-width="80px">
     <el-form-item label="用户名:">
       <el-input v-model="userInfor.username" class="nameInput" clearable></el-input>
     </el-form-item>
     <el-form-item label="昵称:">
       <el-input v-model="userInfor.nickname" class="nameInput" clearable></el-input>
     </el-form-item>
     <el-form-item label="邮箱:">
       <el-input v-model="userInfor.email" class="nameInput" clearable></el-input>
     </el-form-item>
     <el-form-item label="密码:">
       <el-input v-model="userInfor.password" class="nameInput" clearable></el-input>
     </el-form-item>
     <el-form-item label="头像:">
       <uploadImg v-model="userInfor.avatar" style="float: left"></uploadImg>
       <span style="float: left" class="remark">点击上传</span>
     </el-form-item>
     <el-form-item label="个人描述:">
       <el-input v-model="userInfor.desc" class="nameInput" clearable></el-input>
     </el-form-item>
     <el-form-item>
       <el-button
         type="primary"
         class="btnItem"
         @click="handleSubmit"
       >提交</el-button>
     </el-form-item>
   </el-form>
 </div>
</template>

<script>
  import uploadImg from '@/components/uploadImg'

  export default {
    name: "addUser",
    components: {
      uploadImg
    },
    data(){
      return{
        userInfor: {
          username: '',
          nickname: '',
          email: '',
          password: '',
          avatar: '',
          desc: ''
        }
      }
    },
    methods: {
      handleSubmit(){
        this.$axios.post('/user', this.userInfor).then(res => {
          // console.log(res);
          if(res.code === 200){
            this.$message.success(res.msg)
            this.$router.push('/layout/userList')
          }else if(res.code === 400){
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
