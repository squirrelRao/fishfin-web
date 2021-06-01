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
          <el-link type="primary" @click="toDetail(scope.row)" >详情</el-link>
          <el-link type="primary" @click="handleEdit(scope.row)" >重算</el-link>
          <el-link type="primary" @click="handleEdit(scope.row)" >删除</el-link>
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
