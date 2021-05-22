<template>
  <div id="foot">
      <el-row align="middle" type="flex" :gutter="20">
        <el-col><el-link @click="showAbout">关于鱼鳍</el-link></el-col>
      </el-row>
      <el-dialog title="" :visible.sync="aboutDialogVisible" :append-to-body='true' width="30%" style="text-align:center">
      <el-image :src="require('@/assets/logo.png')" style="width:128px;cursor:Pointer"></el-image>
      <h3>鱼鳍 v1.0</h3>
      <h3>一个量化分析和交易模拟工具</h3>
      <p>仅供用于学习研究参考，不可用于真实交易</p>
      <p><span style="font-size:10px">* 由于虚拟货币的数据是开放的，所以使用了虚拟货币作为分析对象</span></p>
      <p>反馈: hqraop@163.com</p>
      <p>@2021 squirrelRao</p>
      </el-dialog>
    </div>
    
</template>

<style>

.el-menu.el-menu--horizontal {
  border-bottom-color:#ffffff!important;
  border-bottom: none;
  line-height: 0rem;
  text-align: center;
}
.el-menu--horizontal > .el-menu-item.is-active {
    border-bottom-color:#ffffff!important;
  border-bottom: none;
  font-weight: bold;
  font-size:18px;
}
</style>
<script>
export default {
  name: 'foot',
   data() {
      return {
        activeIndex: '1',
        state:'',
        query_symbol:[],
        aboutDialogVisible:false
      };
    },
  methods:{

    showAbout:function(){
      this.aboutDialogVisible = true;
    }
  }
}
</script>

<style>
#foot{
    position: fixed;
    bottom: 0;
    height: 60px;
    text-align: center;
    width:100%;

}

</style>
