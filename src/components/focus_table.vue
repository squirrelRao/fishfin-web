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
      <i class="el-icon-star-on" style="color:#f2b635;cursor:pointer" @click="removeFocus(scope.row)"></i>
      <span style="margin-left:0px;font-weight:bold;font-size:16px">{{ scope.row.currency }}</span>/<span style="font-size:14px;;">{{ scope.row.base_currency }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="close"
      label="最新价"
      sortable
      width="100">
    </el-table-column>
   <el-table-column
      prop="high"
      label="最高价"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="low"
      label="最低价"
      sortable
      width="100">
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
      width="100">
             <template slot-scope="scope">

      <el-tag>{{scope.row.advice}}</el-tag>
             </template>
    </el-table-column>
     <el-table-column
      prop="rsi"
      label="RSI"
      sortable
      width="100">
    </el-table-column>
     <el-table-column
      prop="buy_rsi"
      label="RSI买"
      sortable
      width="90">
    </el-table-column>
     <el-table-column
      prop="sale_rsi"
      label="RSI卖"
      sortable
      width="90">
    </el-table-column>
    <el-table-column
      prop="datetime"
      label="时刻"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      label="智能提醒"
      width="80"
      >
       <template slot-scope="scope">
       <el-tooltip content="当系统判断出信号足够明确，时机足够恰当，将自动发送邮件进行提醒" placement="bottom" effect="light">
                <el-switch
            v-model="scope.row.is_signal"
            active-color="#13ce66"
            :active-value=1
            :inactive-value=0
            @change="updateSignal(scope.row)"
            >
          </el-switch>
       </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
      <el-row>
                <el-link type="primary" size="small" @click="showSetStrategy(scope.row)"  >策略设置</el-link>

      </el-row>
      <el-row>
                <el-link size="small" type="primary" @click="showCreateSimulation(scope.$index, scope.row)" >交易模拟</el-link>

      </el-row>
      <el-row>
          <el-link  type="primary"  size="small" @click="openKline(scope.$index, scope.row)" >K线</el-link>

      </el-row>
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
   <!-- set strategy params dialog -->
  <el-dialog title="策略参数设置" width="30%" :visible.sync="strategySettingVisible" >
    <el-row style="text-align:left;margin-bottom:20px">
                <el-col>
                 交易对: <span style="font-weight:bold">{{symbol}}</span>
                </el-col>
      </el-row>
       <el-row style="text-align:left;margin-bottom:20px">
                <el-col>
                 策  略: <span style="font-weight:bold">RSI</span>
                </el-col>
      </el-row>
      <el-row style="text-align:left;margin-bottom:20px">
                <el-col>
                 频  率: <span style="font-weight:bold">{{period}}</span>
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
               <el-button @click="updateStrategy">提 交</el-button>
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
  },
  methods:{
    pageChange:function(cur_page){
      console.log(cur_page)
        this.$emit("pageChange",cur_page);
    },
    removeFocus:function(row){

       let action = 1;
       if(row.is_signal == 1){
         action = 0;
       }
       this.$api.http("/v1/symbol/watch/remove", "post", {"user_id":this.$store.getters.user_id,"symbol":row.symbol}).then(res => {
        
        if(res["rc"] == 0){
          this.$message({
          showClose: true,
          message: "已取消关注"+row.symbol,
          type: "success"
        });
        this.$emit("refresh");
        }
       
      }).catch(err => {
        console.log(err);
        this.$message({
          showClose: true,
          message: "操作失败",
          type: "error"
        });
      });

    },
    updateSignal:function(row){
      
       let action = row.is_signal;
       this.$api.http("/v1/symbol/watch/signal", "post", {"user_id":this.$store.getters.user_id,"symbol":row.symbol,"action":action}).then(res => {
        
        if(res["rc"] == 0){

          this.$message({
          showClose: true,
          message: "操作成功！",
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
    },
    updateData:function(data,total_count,page_size,page_no){
      this.data = data;
      this.page_size = page_size;
      this.totalnum = total_count;
    },
    showSetStrategy:function(row){

        this.strategySettingVisible = true;
        this.low_buy_rsi = row.buy_rsi;
        this.max_sale_rsi = row.sale_rsi
        this.symbol = row.symbol.replace("usdt","/usdt");
        console.log(row);
        console.log(row.period);
        this.period = row.period;

    },
    updateStrategy:function(){

      this.$api.http("/v1/strategy/update", "post", {"user_id":this.$store.getters.user_id,"period":this.period,"symbol":this.symbol.replace("/",""),"strategy":"rsi","min_buy_rsi":this.low_buy_rsi,"max_sell_rsi":this.max_sale_rsi}).then(res => {
        
        if(res["rc"] == 0){

          this.$message({
          showClose: true,
          message: "策略更新成功，将在"+this.symbol+"("+this.period+")"+"上生效！",
          type: "success"
        });
        this.strategySettingVisible = false;
        this.$emit("refresh");
        }
       
      }).catch(err => {
        console.log(err);
        this.$message({
          showClose: true,
          message: "操作失败",
          type: "error"
        });
      });

    },
    showCreateSimulation:function(){
      this.$alert('暂未开放', '消息', {
          confirmButtonText: '确定'
        });
      // this.createSimulationVisible = true;
    },
    openKline:function(){
        window.open("https://www.huobi.pe/zh-cn/exchange/btc_usdt/", '_blank');
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
      symbol:"",
      period:"",
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
