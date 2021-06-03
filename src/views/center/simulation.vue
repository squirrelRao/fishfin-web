<template>
   <div id="simulation" class="main">
    <el-row class="tab_panes">
      <el-col offset=1 span=22>
   <simulation_table  ref="simulation_table" @refresh="refresh" @pageChange="pageChange"></simulation_table>
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

</style>
<script>
import simulation_table from '@/components/simulation_table'

export default {
  name: 'simulation',
  data() {
    return {
      page_no:1,
      page_size:5,
    }
  },
  components:{
    simulation_table
  },
  mounted(){

       this.queryData();
  },
  methods:{
    toIndex:function(){
      this.$router.push({"path":"/"});
    },
    pageChange:function(page_no){
        this.page_no = page_no;
        this.queryData();
    },
     refresh:function(){
      this.queryData();
    },
   queryData:function(){

       this.$api.http("/v1/backtest/get", "post", {"user_id":this.$store.getters.user_id,"page_size":this.page_size,"page_no":this.page_no}).then(res => {
        console.log(res);
        let data= [];
        if(res["rc"] == 0){
          this.totalnum = res["data"]["count"];
          var datas = res["data"]["data"];
          for(var i = 0; i < datas.length;i++){
            var _data = datas[i];
            _data["status_str"] = "等待执行";
            if(_data["status"] == 1){
                _data["status_str"] = "执行中";        
            }else if(_data["status"] ==2){
                _data["status_str"] = "已完成"; 
            }
            _data["avg_ror"]=_data["avg_ror"]+"%"
            _data["total_ror"]=_data["total_ror"]+"%"
            data.push(_data);

          }
          this.$refs.simulation_table.updateData(data,this.totalnum,this.page_size,this.page_no);
        }
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
