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
      <i class="el-icon-star-on" style="color:#f2b635;cursor:pointer" ></i>
      <span style="margin-left:0px;font-weight:bold;font-size:16px">{{ scope.row.currency }}</span>/<span style="font-size:14px;;">{{ scope.row.base_currency }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="close"
      label="最新价"
      sortable
      width="120">
    </el-table-column>
   <el-table-column
      prop="high"
      label="最高价"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="low"
      label="最低价"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="power"
      label="成交量"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="advice"
      label="建议策略"
      sortable
      width="120">
    </el-table-column>
     <el-table-column
      prop="rsi"
      label="RSI"
      sortable
      width="120">
    </el-table-column>
     <el-table-column
      prop="buy_rsi"
      label="买入RSI"
      sortable
      width="120">
    </el-table-column>
     <el-table-column
      prop="sale_rsi"
      label="卖出RSI"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="datetime"
      label="时刻"
      sortable
      width="160">
    </el-table-column>
    <el-table-column
      label="提醒"
      width="100">
       <template slot-scope="scope">
                <el-switch
            v-model="scope.row.remind"
            active-color="#13ce66"
            >
          </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="260">
      <template slot-scope="scope">
        <el-tooltip content="策略设置" placement="bottom" effect="light">
          <el-button  icon="el-icon-set-up" @click="showSetStrategy" circle ></el-button>
        </el-tooltip>
         <el-tooltip content="模拟交易" placement="bottom" effect="light">
          <el-button icon="el-icon-cpu" @click="showCreateSimulation(scope.$index, scope.row)" circle></el-button>
        </el-tooltip>
         <el-tooltip content="K线" placement="bottom" effect="light">
          <el-button icon="el-icon-data-analysis" @click="openKline(scope.$index, scope.row)" circle></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <div style="text-align: center;margin-top:50px;">
            <el-pagination
              layout="total, prev, pager, next"
              :total="totalnum"
              :page-size="page_size"
            ></el-pagination>
   </div>
   <!-- set strategy params dialog -->
  <el-dialog title="策略参数设置" width="30%" :visible.sync="strategySettingVisible" >
    <el-row style="text-align:left;margin-bottom:20px">
                <el-col>
                 交易对: <span style="font-weight:bold">doge/usdt</span>
                </el-col>
      </el-row>
       <el-row style="text-align:left;margin-bottom:20px">
                <el-col>
                 策  略: <span style="font-weight:bold">RSI</span>
                </el-col>
      </el-row>
       <el-row style="text-align:left;margin-bottom:20px">
                <el-col>
                 交易频率: <span style="font-weight:bold">1min</span>
                </el-col>
      </el-row>
      <el-row style="text-align:left;margin-bottom:20px">
                <el-col >
                买入RSI值: <el-input v-model="low_buy_rsi" placeholder="" style="width:200px"/>
                </el-col>
      </el-row>
      <el-row style="text-align:left;margin-bottom:20px">
                <el-col >
                卖出RSI值: <el-input v-model="max_sale_rsi" placeholder="" style="width:200px"/>
                </el-col>
      </el-row>
      <el-row style="text-align:center;">
                <el-col >
               <el-button>提 交</el-button>
                </el-col>
      </el-row>
  </el-dialog>
   <!-- create simulation dialog -->
   <el-dialog title="创建模拟交易" width="30%" :visible.sync="createSimulationVisible" >
    <el-row style="text-align:left;margin-bottom:20px">
                <el-col>
                 交易对: <span style="font-weight:bold">doge/usdt</span>
                </el-col>
      </el-row>
       <el-row style="text-align:left;margin-bottom:20px">
                <el-col>
                 策  略: <span style="font-weight:bold">RSI</span>
                </el-col>
      </el-row>
       <el-row style="text-align:left;margin-bottom:20px">
                <el-col>
                 交易频率: <span style="font-weight:bold">1min</span>
                </el-col>
      </el-row>
      <el-row style="text-align:left;margin-bottom:20px">
                <el-col >
                初始额度: <el-input v-model="low_buy_rsi" placeholder="" style="width:200px"/> usdt
                </el-col>
      </el-row>
       <el-row style="text-align:left;margin-bottom:20px">
                <el-col >
                交易限额: <el-input v-model="low_buy_rsi" placeholder="" style="width:200px"/> usdt
                </el-col>
      </el-row>
      <el-row style="text-align:left;margin-bottom:20px">
                <el-col >
                买入RSI值: <el-input v-model="low_buy_rsi" placeholder="" style="width:200px"/>
                </el-col>
      </el-row>
      <el-row style="text-align:left;margin-bottom:20px">
                <el-col >
                卖出RSI值: <el-input v-model="max_sale_rsi" placeholder="" style="width:200px"/>
                </el-col>
      </el-row>
      <el-row style="text-align:center;">
                <el-col >
               <el-button>创 建</el-button>
                </el-col>
      </el-row>
  </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'focus_table',
  methods:{

    showSetStrategy:function(){

        this.strategySettingVisible = true;

    },
    showCreateSimulation:function(){

      this.createSimulationVisible = true;
    },
    openKline:function(){
        window.open("https://www.huobi.pe/zh-cn/exchange/btc_usdt/", '_blank');
    }
  },
  data () {
    return {
      totalnum:2,
      page_size:2,
      strategySettingVisible:false,
      createSimulationVisible:false,
      data: [{
          symbol: 'doge/usdt',
          currency:'doge',
          base_currency:'usdt',
          close: '1.32',
          high: '1.34',
          low: '1.21',
          power: '1000',
          advice: '持有',
          rsi:'2.1203',
          buy_rsi:'1.2',
          sale_rsi:'3.41',
          datetime:'2021-05-12 09:30:11'
        },
        {
         symbol: 'eos/usdt',
          currency:'eos',
          base_currency:'usdt',
          close: '1.02',
          high: '1.14',
          low: '0.21',
          power: '41000',
          advice: '持有',
          rsi:'1.1203',
          buy_rsi:'0.2',
          sale_rsi:'5.41',
          datetime:'2021-05-12 09:31:11'
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
