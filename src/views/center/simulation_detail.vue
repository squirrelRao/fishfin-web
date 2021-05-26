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
      sortable
      width="130">
      <template slot-scope="scope">
      <span style="margin-left:0px;font-weight:bold;font-size:16px">{{ scope.row.currency }}</span>/<span style="font-size:14px;;">{{ scope.row.base_currency }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="strategy"
      label="交易策略"
      sortable
      width="100">
    </el-table-column>
   <el-table-column
      prop="freq"
      label="交易频率"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="starttime"
      label="开始时间"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="endtime"
      label="结束时间"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="start_amount"
      label="初始金额"
      sortable
      width="130">
    </el-table-column>
     <el-table-column
      prop="max_exchange_amount"
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
      prop="status"
      label="状态"
      sortable
      width="80">
    </el-table-column>
    <el-table-column
      prop="datetime"
      label="创建时间"
      sortable
      width="">
    </el-table-column>
    
  </el-table>
      </el-col>
    </el-row>
    <el-row>
            <el-col offset=1 span="22">
              <div id="chart" style="margin-top:20px">
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
      phone: '',
      code:'',
      symbol:'doge/usdt',
      data: [{
          symbol: 'doge/usdt',
          currency:'doge',
          base_currency:'usdt',
          strategy: 'RSI',
          freq:'1min',
          starttime: '2021-05-01',
          endtime: '2021-05-12',
          start_amount: '5000usdt',
          max_exchange_amount: '1000usdt',
          ror:'2.12%',
          status:'模拟完成',
          datetime:'2021-05-12 09:30:11'
        }
        
        ]
    }
  },
  components:{
    simulation_table
  },
  mounted:{

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
