<template>
  <div>
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
      prop="limit_trade_count"
      label="交易限额"
      sortable
      width="130">
    </el-table-column>
     <el-table-column
      prop="init_amount"
      label="初始金额"
      sortable
      width="130">
    </el-table-column>
     <el-table-column
      prop="last_current_value"
      label="最终金额"
      sortable
      width="130">
    </el-table-column>
     <el-table-column
      prop="buy_rsi"
      label="RSI买"
      sortable
      width="90">
            <template slot-scope="scope">
      <el-tooltip content="「 RSI 」>=「 RSI买 」时发出「 买入 」信号" placement="bottom" effect="light">
              <span>{{scope.row["buy_rsi"]}}</span>
       </el-tooltip>
            </template>
    </el-table-column>
     <el-table-column
      prop="sale_rsi"
      label="RSI卖"
      sortable
      width="90">
      <template slot-scope="scope">
       <el-tooltip content="「 RSI 」<=「 RSI卖 」时发出「 卖出 」信号" placement="bottom" effect="light">
              <span>{{scope.row["sell_rsi"]}}</span>
       </el-tooltip>
      </template>
    </el-table-column>
     <el-table-column
      prop="avg_ror"
      label="日均收益率"
      sortable
      width="120">
        <template slot-scope="scope">
             <el-tooltip :content="scope.row.advice" placement="bottom" effect="light">

              <span :style="{'color':scope.row.avg_ror_color}">{{scope.row["avg_ror"]}}</span>
             </el-tooltip>
      </template>
    </el-table-column>
     <el-table-column
      prop="total_ror"
      label="累计收益率"
      sortable
      width="120">
        <template slot-scope="scope">
             <el-tooltip :content="scope.row.advice" placement="bottom" effect="light">

              <span :style="{'color':scope.row.total_ror_color}">{{scope.row["total_ror"]}}</span>
             </el-tooltip>
      </template>
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
          <el-link type="primary" @click="toDetail(scope.row)" >详情</el-link>
          <!-- <el-link type="primary" @click="handleEdit(scope.row)" >重算</el-link> -->
          <el-link type="primary" @click="remove(scope.row)" >删除</el-link>
      </template>
    </el-table-column>
  </el-table>
<div style="text-align: center;margin-top:0px;">
            <el-pagination
              layout="total, prev, pager, next"
              :total="totalnum"
              :page-size="page_size"
              :current-page="page_no"
              @current-change="pageChange"
            ></el-pagination>
   </div>
  </div>
</template>
<script>
export default {
  name: 'focus_table',
  data () {
    return {
      totalnum:0,
      page_size:5,
      page_no:1,
      data: []
    }
  },
  methods:{
      pageChange:function(cur_page){
              this.$emit("pageChange",cur_page);
      },
      updateData:function(data,total_count,page_size,page_no){
              this.data = data;
              this.page_size = page_size;
              this.totalnum = total_count;
    },

    remove:function(row){


       this.$confirm('此操作将删除该任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.http("/v1/backtest/remove", "post", {"task_id":row["_id"]}).then(res => {
        console.log(res);

        if(res["rc"] == 0){
          
            this.$emit("refresh");
            this.$message({
          showClose: true,
          message: "任务已删除!",
          type: "success"
        });

        }
      }).catch(err => {
        console.log(err);
        this.$message({
          showClose: true,
          message: "操作失败",
          type: "error"
        });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      
    },

      toDetail:function(row){

          this.$router.push({"path":"/center/simulation_detail/"+row._id});

      }
  },
  props:{
    user_id:""
  }
}
</script>

<style>


</style>
