<template>
  <div class="container">
    <el-form label-position="top" label-width="80px">
      <el-form-item label="图书链接:">
        <el-input v-model="url" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="作者:">
        <el-input v-model="author" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="图书封面:">
        <uploadImg v-model="img" style="float: left"></uploadImg>
        <span style="float: left" class="remark">点击上传</span>
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
  import uploadImg from '../../components/uploadImg'

  export default {
    name: "addBook",
    components: {
      uploadImg
    },
    data(){
      return{
        url: '',
        author: '',
        img: ''
      }
    },
    methods: {
      handleSubmit(){
        let id = this.$route.query.id
        // console.log(id);
        let params = {
          typeId: id,
          url: this.url,
          author: this.author,
          img: this.img
        }
        this.$axios.post('/book', params).then(res => {
          console.log(res);
          if(res.code === 200){
            this.$message.success(res.msg)
            this.$router.push('/layout/categoryList')
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
