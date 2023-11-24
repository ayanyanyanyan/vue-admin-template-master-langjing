<template>
 <el-container class="shouye-background">
  <el-aside width="200px">侧边栏</el-aside>
  <el-main>这是网站首页</el-main>
</el-container>
</template>

<script>
import { getIndexData } from "@/api/index.js";
import { page } from "@/api/users";
export default {
  name: 'Dashboard',
  mounted () {
    getIndexData().then((result) => {
        console.log(result);
        //TODO 
     page()
    });
  }
}

</script>
<style lang="scss" scoped>
.shouye-background{
  background-color: #FFF720#3CD500;
}
</style>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
