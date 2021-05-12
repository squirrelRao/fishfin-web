<template>

  <div id="focus" class="main">
    
    <el-row class="tab_panes">
      <el-col offset=1 span=22>
      <el-tabs v-model="activeName" @tab-click="tabClick">
    <el-tab-pane label="1min" name="1min"><focus_table :data_type="data_type"></focus_table></el-tab-pane>
    <el-tab-pane label="5min" name="5min"><focus_table :data_type="data_type"></focus_table></el-tab-pane>
    <el-tab-pane label="30min" name="30min"><focus_table :data_type="data_type"></focus_table></el-tab-pane>
    <el-tab-pane label="60min" name="60min"><focus_table :data_type="data_type"></focus_table></el-tab-pane>
      </el-tabs>
      </el-col>

    </el-row>
    
    </div>
</template>


<style>
.main{
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

}

.tab_panes{

   width: auto;
   margin-top:20px;
}

</style>
<script>
import focus_table from '@/components/focus_table'

export default {
  name: 'focus',
  data() {
    return {
      phone: '',
      code:'',
      activeName:"1min"
    }
  },
  components:{
    focus_table
  },
  mounted:{

  },
  methods:{

    tabClick:function(tab, event){
        this.activeName = tab.name;
        this.data_type = tab.name;
    },
    toIndex:function(){
      this.$router.push({"path":"/"});
    },
    hi(){
        this.reqHttp()
    },
    reqHttp: function() {
     
      this.$api.http("/", "get", {}).then(res => {
        console.log(res);
        this.$message({
          showClose: true,
          message: res["data"],
          type: "success"
        });
      }).catch(err => {
        console.log(err);
        this.$message({
          showClose: true,
          message: "",
          type: "error"
        });
      });
    }
    
  }
}
</script>

<style>

</style>
