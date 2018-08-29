<template>
  <div class="container">
    <el-form label-position="top" label-width="80px">
      <el-form-item label="标题:">
        <el-input v-model="title" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="轮播图图片:">
        <uploadImg v-model="img" style="float: left"></uploadImg>
        <span style="float: left" class="remark">点击上传</span>
      </el-form-item>
      <el-form-item label="对应图书链接:">
        <el-input v-model="book" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="轮播图排序: (数字越大越靠前)">
        <el-input-number v-model="index" :min="1" :max="8"></el-input-number>
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
    components: {
      uploadImg
    },
    data(){
      return{
        title: '',
        img: '',
        index: 1,
        book: ''
      }
    },
    methods: {
      handleSubmit(){
        // console.log(id);
        let params = {
          title: this.title,
          img: this.img,
          book: this.book,
          index: this.index
        }
        this.$axios.post('/swiper', params).then(res => {
          console.log(res);
          if(res.code === 200){
            this.$message.success(res.msg)
            this.$router.push('/layout/swiperList')
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
