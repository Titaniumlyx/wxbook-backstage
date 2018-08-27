<template>
  <el-upload
    class="avatar-uploader"
    action="https://upload-z1.qiniup.com"
    :data="uploadData"
    :show-file-list="false"
    :on-success="uploadSuccess">
    <img v-show="imageUrl" :src="imageUrl" class="cateIcon">
  </el-upload>
</template>

<script>
    export default {
      name: "uploadImg",
      props: {
        value: String
      },
      data(){
        return{
          uploadData: {
            token: ''
          },
          imageUrl: this.value
        }
      },
      methods: {
        uploadSuccess(file){
          this.$emit('input', file.url)
        },
        getToken(){    // 获取上传凭证
          this.$axios.get('http://upload.yaojunrong.com/getToken').then(res => {
            // console.log(res.data);
            this.uploadData.token = res.data
          })
        }
      },
      watch: {
        value(val){
          this.imageUrl = val
        }
      },
      created(){
        this.getToken()
      }
    }
</script>

<style scoped lang="scss">
  .cateIcon{
    display: block;
    width: 80px;
    height: 80px;
  }
</style>
