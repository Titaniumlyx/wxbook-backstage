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
        <el-table-column label="创建时间" prop="creatTime">
        </el-table-column>
        <el-table-column label="邮箱" prop="email">
        </el-table-column>
        <el-table-column label="个人描述" prop="desc">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--<el-button-->
              <!--size="mini"-->
              <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" icon="el-icon-arrow-left" @click="handleReduce">上一页</el-button>
      <el-button type="primary" @click="handleAdd">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>
</template>

<script>
  import timeSwitch from '../../util/myTime';

  export default {
    name: "userList",
    data(){
      return{
        tableData: [],
        arr1: [],
        params: {
          pn: 1,
          size: 4
        }
      }
    },
    methods: {
      async getData(){
        const res = await this.$axios.get('/user', this.params)
        // console.log(res.data);
        this.arr1 = res.data.map((person) => {
          let str = timeSwitch.getTime(person.createdTime).time();
          person.creatTime = str
          return person.creatTime
        })
        this.tableData = res.data
      },
      handleDelete(id){
        // console.log(id);
        this.$axios.post('/user/delete', {userIds: [id]}).then(res => {
          // console.log(res);
          if(res.code === 200){
            this.$message.success('成功删除用户')
            this.getData()
          }
        })
      },
      handleReduce(){
        this.params.pn -= 1
        if(this.params.pn <= 0){
          this.params.pn =1
          this.getData()
          this.$message({
            showClose: true,
            message: '这是第一页哦'
          });
        }
        this.getData()
      },
      handleAdd(){
        this.params.pn += 1
        this.$axios.get('/user', this.params).then(res => {
          // console.log(res);
          if(res.data.length === 0){
            this.params.pn -= 1
            this.$message({
              showClose: true,
              message: '最后一页咯'
            });
          }else{
            this.tableData = res.data
          }
        })
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
