<template>
  <div class="app-container">

    <!--搜索表单-->
    <el-form :inline="true" :model="searchDept" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="searchDept.name" placeholder="请输入产品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clear" >清空</el-button>
        
      </el-form-item>
    </el-form>


   


    <!--按钮-->
    <el-row>
      <el-button type="danger" size="medium" @click="deleteByIds">- 批量删除</el-button>
      <el-button type="primary" size="medium" @click="openDialog">+ 新增产品</el-button>
    </el-row>

    <!--添加数据对话框表单-->
    <el-dialog ref="form" title="编辑案例" :visible.sync="dialogFormVisible" width="70%">
      <el-form ref="form" :model="dept" label-width="80px" size="mini">
        <el-form-item label="产品名称">
          <el-input v-model="dept.name"></el-input>
        </el-form-item>

        <el-form-item label="产品图">
          <el-upload class="avatar-uploader" action="/api/upload/chanpin" :headers="token" name="image"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="dept.image" :src="dept.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <div>
            <el-tiptap id="test" ref="editor" v-model="dept.content" :extensions="extensions" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add()">提交</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <br>
    <!--表格-->
    <template>
      <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <!-- <el-table-column  prop="username"  label="序号"  align="center"></el-table-column> -->
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="image" label="产品图" align="center">
          <template slot-scope="{ row }">
            <el-image style="width: auto; height: 40px; border: none; cursor: pointer" :src="row.image"></el-image>
          </template>
        </el-table-column>

        、
        <el-table-column align="center" label="添加时间">
          <template slot-scope="scope">
            {{ scope.row.updateTime ? scope.row.updateTime.replace('T', ' ') : '' }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="selectById(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteById(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!--分页工具条-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :background="background"
      :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="5"
      layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
import { findAll, page, add, update, deleteById, selectById } from "@/api/dept.js"
import { getToken } from '@/utils/auth'
import { ElementTiptap } from 'element-tiptap'
import { mapState } from 'vuex'
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Link,
  Image,
  Iframe,
  CodeBlock,
  Blockquote,
  TodoItem,
  TodoList,
  TextAlign,
  FontSize,
  FontType,
  SelectAll,
  Fullscreen,
  Print,
  Preview,
  TextHighlight,
  TextColor,
  FormatClear,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  History,
  TrailingNode,
  HardBreak,
  HorizontalRule,
  LineHeight,
  Indent,

} from 'element-tiptap';
import { sidebarLogo } from '@/settings';

export default {
  computed: {
  ...mapState(['sdata']) // 将 msg 变量映射到组件的计算属性中
},
created() {
    console.log('sdata from Vuex:', this.sdata);
    console.log(this.sdata);
  },
  data() {
    return {
      sid:this.sdata,
      extensions: [

        new Image({

          // 图片的上传方法，返回一个 Promise<url>
          uploadRequest(file) {
            // 构建 FormData 对象来上传文件
            const formData = new FormData();
            formData.append('image', file);

            // 发送图片上传请求到内容接口
            return fetch('api/upload/chanpin', {
              method: 'POST',
              body: formData,
              headers: {
                token:getToken()
                
              },
              
            })
              .then(response => {
                console.log(response);
                if (!response.ok) {
                  
                  throw new Error('上传失败');
                }
                return response.json();
              })
              .then(data => {
                if (data.code === 1) {
                  
                  // 上传成功后，将图片 URL 设置为富文本编辑器的内容
                  var test=document.getElementById("test");
                  test.src=data.data
                  console.log("test",test.src);
                 
                  return data.data;
                } else {
                  throw new Error('上传失败');
                }
              });
          },

        }),


        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 6 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Link(),
        new Iframe(),
        new CodeBlock(),
        new Blockquote(),
        new TodoItem(),
        new TodoList(),
        new TextAlign(),
        new FontSize(),
        new FontType(),
        new SelectAll(),
        new Fullscreen(),
        new Print(),
        new Preview(),
        new TextHighlight(),
        new TextColor(),
        new FormatClear(),
        new Table({ resizable: true }),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new History(),
        new TrailingNode(),
        new HardBreak(),
        new HorizontalRule(),
        new LineHeight(),
        new Indent()

      ],
      // // 编辑器的内容
      // content: `
      //         <h1>Heading</h1>
      //         <p>This Editor is awesome!</p>
      //       `,

      background: true,
      // 每页显示的条数
      pageSize: 5,
      // 总记录数
      totalCount: 100,
      // 当前页码
      currentPage: 1,
      // 添加数据对话框是否展示的标记
      dialogFormVisible: false,
      // 品牌模型数据
      searchDept: {
        name: "",
      },
      dept: {
        username: "",
        name: "",
        image: "",
        content: ""

      },
      deptList: [],

      beginTime: "",
      endTime: "",
      entrydate: "",

      // 被选中的id数组
      selectedIds: [],
      // 复选框选中数据集合
      multipleSelection: [],
      // 表格数据
      tableData: [],
      token: { token: getToken() }
    };
  },

  /*  mounted() {
     this.page(); //当页面加载完成后，发送异步请求，获取数据
     findAll().then((result) => {
       this.deptList = result.data.data;
     });
   }, */

  methods: {
 
    openDialog() {
    this.dialogFormVisible = true;
    this.dept = { image: '' };
  },


    // 查询分页数据
    page() {
      page(
        this.searchDept.name,
        this.searchDept.gender,
        this.beginTime,
        this.endTime,
        this.currentPage,
        this.pageSize
      ).then((result) => {
        //console.log(result.data.data.total);
        this.totalCount = result.data.data.total;
        
        this.tableData = result.data.data.rows;
      });
    },

    // 复选框选中后执行的方法
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 查询方法
    onSubmit() {
      this.currentPage = 1;
      this.page();
    },

    clear() {
      this.searchDept = { name: "" };
      this.beginTime = "",
        this.endTime = "";
      this.entrydate = "";
      this.page();
    },
    // 添加数据
    add() {
      let method;// 添加
      if (this.dept.id) {
        method = update(this.dept); // 修改
      } else {
        method = add(this.dept); //添加 
      }
      method.then((result) => {
        if (result.data.code == 1) {
          //修改成功
          this.$message.success("恭喜你，保存成功");
          this.dept = { image: "" };
          //重新查询数据
          this.page();
          this.init();
        } else {
          this.$message.error(result.data.msg);
        }
      });
      // 关闭新建窗口
      this.dialogFormVisible = false;

      // 清空模型数据
      this.dept = {};
    },
    
    //根据ID查询部门 -- 回显
    selectById(id) {
      this.dialogFormVisible = true;
      selectById(id).then((result) => {
        if (result.data.code == 1) {
          this.dept = result.data.data;
          this.dept;
        }
      });
    },

    //分页
    handleSizeChange(val) {
      // 重新设置每页显示的条数
      this.pageSize = val;
      this.page();
    },

    handleCurrentChange(val) {
      // 重新设置当前页码
      this.currentPage = val;
      this.page();
    },


    //删除员工信息
    deleteById(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteById(id).then((result) => {
          if (result.data.code == 1) {
            this.$message({
              message: "恭喜你，删除成功",
              type: "success",
            });
          } else {
            this.$message.error(result.data.msg);
          }
          //重新查询数据
          this.init();
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
    },


    // 批量删除员工信息
    deleteByIds() {
      // 弹出确认提示框
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //用户点击确认按钮
        //1. 创建id数组, 从 this.multipleSelection 获取即可
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.selectedIds[i] = this.multipleSelection[i].id;
        }

        //2. 发送AJAX请求
        deleteById(this.selectedIds).then((result) => {
          if (result.data.code == "1") {
            //删除成功
            this.$message.success("恭喜你，删除成功")
            this.page();
          } else {
            this.$message.error(result.data.msg);
          }
        });
      }).catch(() => {
        //用户点击取消按钮
        this.$message.info("已取消删除");
      });
    },


    //文件上传相关
    handleAvatarSuccess(res, file) {
      this.dept.image = res.data;
      console.log(res);
    },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //  /*  if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   } */
    //   return isJPG && isLt2M;
    // },

    init() {
      findAll().then((result) => {
        
        if (result.data.code == 1) {
          this.tableData = result.data.data.rows;
          this.totalCount = result.data.data.total;
          console.log(result.data.data.rows);
          
          
        }
      });
      this.page();
    },
  },
  mounted() {
    //当页面加载完成后自动执行。
    this.page();
    this.init();
  },

  watch: {
    entrydate(val) {
      if (val && val.length >= 2) {
        this.beginTime = val[0];
        this.endTime = val[1];
      } else {
        this.beginTime = "";
        this.endTime = "";
      }
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
