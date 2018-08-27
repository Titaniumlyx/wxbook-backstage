<template>
    <div class="container">
      <div class="navBar">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :router = true
          background-color="#545C64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/layout/userList">用户列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/layout/addUser">添加用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>分类管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/layout/categoryList">分类列表</el-menu-item>
              <el-menu-item index="/layout/addCategory">添加分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main-content">
        <div class="conTop">
          <h2 class="title fll">云书后台操作系统</h2>
          <el-dropdown class="user-avatar flr">
            <div class="selfAvatar">
              <img :src="userInfo.avatar" v-if="userInfo.avatar">
            </div>
            <div class="selfUsername">
              <span class="word">{{userInfo.nickname}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handlePerson">个人信息</el-dropdown-item>
              <el-dropdown-item @click.native="handleOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "layout",
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      handlePerson(){
        this.$router.push('/layout/personCenter')
      },
      handleOut(){
        let payload = {
          username: '',
          nickname: '',
          email: '',
          desc: '',
          avatar: ''
        }
        this.$axios.get('/logout').then(res => {
          // console.log(res);
          if(res.code === 200){
            this.$message.success(res.msg)
            this.$store.commit('SET_USERINFO', payload)
            this.$router.push('/Login')
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .navBar{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 200px;
    height: 100%;
    background: #545C64;
  }
  .main-content{
    margin-left: 200px;
    .conTop{
      height: 100px;
      border-bottom: 1px solid #545C64;
    }
    .title{
      position: absolute;
      left: 50%;
      top: 30px;
      transform: translateX(-50%);
      /*height: 80px;*/
      /*line-height: 80px;*/
      /*text-align: center;*/
    }
    .user-avatar{
      width: 100px;
      height: 80px;
      position: absolute;
      top: 10px;
      right: 10px;
      .selfAvatar{
        margin: 0 auto;
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .selfUsername{
        text-align: center;
        margin-top: 5px;
      }
    }
  }
</style>
