<template>
    <div class="container">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column label="用户头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="user-avatar">
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="username">
        </el-table-column>
        <el-table-column label="昵称" prop="nickname">
        </el-table-column>
        <el-table-column label="创建时间" prop="createdTime">
        </el-table-column>
        <el-table-column label="邮箱" prop="email">
        </el-table-column>
        <el-table-column label="个人描述" prop="desc">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      name: "userList",
      data(){
        return{
          tableData: []
        }
      },
      methods: {
        async getData(){
          const res = await this.$axios.get('/user')
          // console.log(res);
          this.tableData = res.data
        }
      },
      created(){
        this.getData()
      }
    }
</script>

<style scoped lang="scss">
  .user-avatar{
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-sizing: border-box;
  }
</style>
