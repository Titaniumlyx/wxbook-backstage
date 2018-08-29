<template>
  <div class="container">
    <el-form :model="formDatas" label-position="top">
      <el-form-item label="图书链接:">
        <el-input v-model="formDatas.url" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="作者:">
        <el-input v-model="formDatas.author" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="图书封面:">
        <div style="clear: both; display: block">
          <el-switch
            v-model="showWhich"
            active-text="填写链接"
            inactive-text="手动上传"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
        <uploadImg v-model="formDatas.img" v-show="!showWhich" style="float: left"></uploadImg>
        <el-input v-model="formDatas.img" v-show="showWhich" class="nameInput" clearable></el-input>
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
        formDatas: {
          url: '',
          author: '',
          img: ''
        },
        showWhich: true
      }
    },
    methods: {
      handleSubmit(){
        let id = this.$route.query.id
        // console.log(id);
        let params = {
          typeId: id,
          ...this.formDatas
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
