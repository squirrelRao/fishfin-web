<template>
   <div id="simulation_detail" class="main">
      <el-row class="tab_panes">
        <el-col offset=1 span=22>
          <div style="text-align:left;margin-top:20px;margin-bottom:20px;">
            <el-page-header @back="goBack" content="模拟详情" ></el-page-header>
          </div>
        </el-col>
      </el-row>
    <el-row class="tab_panes">
      <el-col offset=1 span=22>
  <el-table
    :data="data"
    stripe
    style="width:100%"
    :default-sort = "{prop: 'symbol', order: 'ascending'}"
    >
    <el-table-column
      label="交易对"
      width="130">
      <template slot-scope="scope">
      <span style="margin-left:0px;font-weight:bold;font-size:16px">{{ scope.row.quote_currency }}</span>/<span style="font-size:14px;;">{{ scope.row.base_currency }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="strategy"
      label="交易策略"
      sortable
      width="100">
    </el-table-column>
   <el-table-column
      prop="period"
      label="交易频率"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="start_time"
      label="开始时间"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="end_time"
      label="结束时间"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="init_amount"
      label="初始金额"
      sortable
      width="130">
    </el-table-column>
     <el-table-column
      prop="limit_trade_count"
      label="最大交易额"
      sortable
      width="130">
    </el-table-column>
     <el-table-column
      prop="ror"
      label="收益率"
      sortable
      width="120">
    </el-table-column>
     <el-table-column
      prop="status_str"
      label="状态"
      sortable
      width="80">
    </el-table-column>
    <el-table-column
      prop="create_time_str"
      label="创建时间"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      label="操作"
      >
      <template slot-scope="scope">
          <el-link type="primary" @click="handleEdit(scope.row)" >重算</el-link>
      </template>
    </el-table-column>
  </el-table>
      </el-col>
    </el-row>
    <el-row>
            <el-col offset=1 span="22">
              <div id="chart" style="margin-top:20px;margin-bottom:20px;height:550px">
                交易记录图
              </div>
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
  name: 'simulation_detail',
  data() {
    return {
      data: [],
      ror:[],
      task_id:this.$route.params.id
    }
  },
  components:{
    simulation_table
  },
  mounted(){
    console.log(this.task_id);
    this.queryData();
  },
  methods:{
    goBack:function(){
        this.$router.push({"name":"simulation"});
    },
    toSimulation:function(){
      this.$router.push({"name":"simulation"});
    },
    toIndex:function(){
      this.$router.push({"path":"/"});
    },
    queryData:function(){

       this.$api.http("/v1/backtest/detail", "post", {"task_id":this.task_id}).then(res => {
        console.log(res);
        this.data = [];
        if(res["rc"] == 0){
          this.ror = res["ror"];
            var _data = res["data"];
            _data["status_str"] = "等待执行";
            if(_data["status"] == 1){
                _data["status_str"] = "执行中";        
            }else if(_data["status"] ==2){
                _data["status_str"] = "已完成"; 
            }
            _data["ror"] = _data["ror"]+"%";
            this.data.push(_data);

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
