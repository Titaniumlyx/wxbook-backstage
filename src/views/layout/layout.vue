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
        <div class="title">
          <h2>后台操作系统</h2>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "layout"
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
    .title{
      height: 80px;
      line-height: 80px;
      text-align: center;
      border-bottom: 1px solid #545C64;
    }
  }
</style>
