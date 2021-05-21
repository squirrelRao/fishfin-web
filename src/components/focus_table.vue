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
      prop="vol"
      label="成交量"
      sortable
      width="160">
    </el-table-column>
    <el-table-column
      prop="advice"
      label="建议"
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
      label="RSI买"
      sortable
      width="100">
    </el-table-column>
     <el-table-column
      prop="sale_rsi"
      label="RSI卖"
      sortable
      width="100">
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
      width="200">
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
                初始额度: <el-input v-model="init_amount" placeholder="" style="width:200px"/> usdt
                </el-col>
      </el-row>
       <el-row style="text-align:left;margin-bottom:20px">
                <el-col >
                交易限额: <el-input v-model="max_trade_amount" placeholder="" style="width:200px"/> usdt
                </el-col>
      </el-row>
      <el-row style="text-align:left;margin-bottom:20px">
                <el-col >
                买入RSI: <el-input v-model="low_buy_rsi" placeholder="" style="width:200px"/>
                </el-col>
      </el-row>
      <el-row style="text-align:left;margin-bottom:20px">
                <el-col >
                卖出RSI: <el-input v-model="max_sale_rsi" placeholder="" style="width:200px"/>
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
  mounted(){
     this.queryData();
  },
  methods:{

    showSetStrategy:function(){

        this.strategySettingVisible = true;

    },
    showCreateSimulation:function(){

      this.createSimulationVisible = true;
    },
    openKline:function(){
        window.open("https://www.huobi.pe/zh-cn/exchange/btc_usdt/", '_blank');
    },
    queryData:function(){
      console.log(this.data_type);

       this.$api.http("/v1/focus/data", "post", {"user_id":this.$store.getters.user_id,"period":this.data_type,"page_size":this.page_size,"page_no":this.page_no}).then(res => {
        console.log(res);
        this.data= [];
        if(res["rc"] == 0){
          this.totalnum = res["count"];
          var datas = res["data"];
          for(var i = 0; i < datas.length;i++){
            var _data = datas[i];
            var item = {}
            var base_currency = "usdt";
            item["symbol"] = _data["symbol"];
            item["currency"] = _data["symbol"].replace(base_currency,"");
            item["base_currency"] = base_currency;
            item["close"] = _data["kline"]["close"];
            item["high"] = _data["kline"]["high"];
            item["low"] = _data["kline"]["low"];
            item["vol"] = _data["kline"]["vol"];
            if(_data["signal"] != null){
              item["advice"] = _data["signal"]["advice"];
              item["rsi"] = _data["signal"]["rsi"];
            }else{
              item["advice"] = "暂无";
              item["rsi"] = "-";
            }
            item["buy_rsi"] = _data["strategy"]["min_buy_rsi"];
            item["sale_rsi"] = _data["strategy"]["max_sell_rsi"];
            item["datetime"] = _data["kline"]["ktime_str"];

            this.data.push(item);

          }
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
  },
  data () {
    return {
      totalnum:0,
      page_size:10,
      strategySettingVisible:false,
      createSimulationVisible:false,
      data: [],
      low_buy_rsi:0,
      max_sale_rsi:0,
      init_amount:5000,
      max_trade_amount:1000
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
