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
      width="160">
      <template slot-scope="scope">
      <span style="margin-left:0px;font-weight:bold;font-size:16px">{{ scope.row.currency }}</span>/<span style="font-size:14px;;">{{ scope.row.base_currency }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="strategy"
      label="交易策略"
      sortable
      width="120">
    </el-table-column>
   <el-table-column
      prop="freq"
      label="交易频率"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="starttime"
      label="开始时间"
      sortable
      width="160">
    </el-table-column>
    <el-table-column
      prop="endtime"
      label="结束时间"
      sortable
      width="160">
    </el-table-column>
    <el-table-column
      prop="start_amount"
      label="初始金额"
      sortable
      width="120">
    </el-table-column>
     <el-table-column
      prop="max_exchange_amount"
      label="最大交易额"
      sortable
      width="120">
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
      width="160">
    </el-table-column>
    <el-table-column
      label="操作"
      width="260">
      <template slot-scope="scope">
        <el-tooltip content="详情" placement="bottom" effect="light">
          <el-button  icon="el-icon-postcard" @click="handleEdit(scope.$index, scope.row)" circle></el-button>
        </el-tooltip>
         <el-tooltip content="重算" placement="bottom" effect="light">
          <el-button icon="el-icon-cpu" @click="handleEdit(scope.$index, scope.row)" circle></el-button>
        </el-tooltip>
         <el-tooltip content="删除" placement="bottom" effect="light">
          <el-button icon="el-icon-delete" @click="handleEdit(scope.$index, scope.row)" circle></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <div style="text-align: center;margin-top:50px;">
            <el-pagination
              layout="total, prev, pager, next"
              :total="totalnum"
              :page-size="page_size"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
  </div>
</template>
<script>
export default {
  name: 'focus_table',
  data () {
    return {
      totalnum:2,
      page_size:2,
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
  props:{
    data_type:"",
    user_id:""
  }
}
</script>

<style>


</style>
