<template>
  <div class="navbar">


    <el-dialog ref="form" title="编辑用户" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="users" label-width="80px" size="mini">
        <el-form-item label="姓名">
          <el-input v-model="users.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="users.password"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="users.gender" placeholder="请选择" style="width:100%">
            <el-option v-for="item in genderList" :key="item.value" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="头像">
          <el-upload class="avatar-uploader" action="/api/upload/lunbotu" :headers="token" name="image"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="users.image" :src="users.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="http://www.langjingyiqi.com/templets/web/images/20180412114926_77299.png" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
       
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item >
              首页
            </el-dropdown-item>
          </router-link>



  

          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
          <el-dropdown-item  divided @click.native="update()">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
         
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>

  

</template>

<script>

import { mapGetters ,mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { removeToken } from '@/utils/auth'
import { page, add, update, deleteById, selectById } from "@/api/users.js";
import { getToken } from '@/utils/auth';
export default {
  computed: {
  ...mapState(['sdata']) ,// 将 msg 变量映射到组件的计算属性中
  ...mapGetters([
      'sidebar',
      'avatar'
    ])
},
created() {
    console.log('sdata from Vuex:', this.sdata);
    console.log(this.sdata);
  },
  data() {
  return {
    
    
    dialogVisible: false,
    users: {
        image: "",
        password: "",
      },
      genderList: [{ id: 1, name: "男" }, { id: 2, name: "女" }],
      tableData: [],
      token: { token: getToken() }
  }
},

  components: {
    Breadcrumb,
    Hamburger
  },
  methods: {
    test(){
      console.log("1111111")
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      removeToken();
      this.$router.push('/login')
    },
     //文件上传相关
     handleAvatarSuccess(res, file) {
      this.users.image = res.data;
    },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   // if (!isJPG) {
    //   //   this.$message.error("上传头像图片只能是 JPG 格式!");
    //   // }
    //   // if (!isLt2M) {
    //   //   this.$message.error("上传头像图片大小不能超过 2MB!");
    //   // }
    //   return isJPG && isLt2M;
    // },
    update() {
      const id = this.sdata; // 使用 sdata 的值作为 id
      console.log("111111");
      //1. 打开窗口
      this.dialogVisible = true;
      //2. 发送请求

      selectById(id).then((result) => {
        if (result.data.code == 1) {
         
          this.users = result.data.data;
          this.users;
        }
      });

      
    },
    add() {
      let operator;

      if (this.users.id) {
        //修改
        operator = update(this.users);
      } else {
        operator = add(this.users);
      }
      //console.log(res.data.data);
      operator.then((resp) => {
        if (resp.data.code == "1") {
          this.dialogVisible = false;
          this.page();
          this.$message({ message: "恭喜你，保存成功", type: "success" });
          this.users = { image: "" };
        } else {
          //console.log(resp);
          this.dialogVisible = false;
          this.$message.error(resp.data.msg);
        }
      });
      this.$message.success("恭喜你，修改成功")
    },
  },
  
}

</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 200px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
