<template>
  <div class="container">
    <el-form label-position="top" label-width="80px" :model="formDatas">
      <el-form-item label="轮播图标题:">
        <el-input v-model="formDatas.title" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="对应的书籍id:">
        <el-input v-model="formDatas.book._id" class="nameInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="轮播图图片:">
        <uploadImg v-model="formDatas.img" style="float: left"></uploadImg>
        <span style="float: left" class="remark">点击图标进行修改</span>
      </el-form-item>
      <el-form-item label="轮播图排序: (数字越大越靠前)">
        <el-input-number v-model="formDatas.index" :min="1" :max="8"></el-input-number>
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
  import uploadImg from '@/components/uploadImg'

  export default {
    components: {
      uploadImg
    },
    data(){
      return{
        formDatas: {
          title: '',
          img: '',
          book: {},
          index: ''
        }
      }
    },
    methods: {
      async getData(){
        const id = this.$route.query.id
        try {
          const res = await this.$axios.get(`/swiper/${id}`)
          // console.log(res.data);
          this.formDatas = res.data
        }catch (err) {
          alert(err);
        }
      },
      async handleSubmit(){
        const id = this.$route.query.id
        let params = {
          title: this.title,
          img: this.img,
          book: this.book._id,
          index: this.index
        }
        const res = await this.$axios.put(`/swiper/${id}`, params)
        // console.log(res);
        if(res.code === 200){
          this.$message.success(res.msg)
          setTimeout(() => {
            this.$router.push('/layout/swiperList')
          }, 1000)
        }else{
          this.$message.error(res.msg)
        }
      }
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .container{
    padding: 20px;
    .nameInput{
      width: 500px;
    }
    .remark{
      display: block;
      margin-left: 30px;
      margin-top: 15px;
      color: #aaa;
    }
  }
</style>
