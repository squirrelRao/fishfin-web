<template>
   <div id="simulation_detail" class="main">
      <el-row class="tab_panes">
        <el-col offset=1 span=22>
          <div style="text-align:left;margin-top:10px;margin-bottom:0px;">
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
      label="累计收益"
      width="120">
      <template slot-scope="scope">

              <span :style="{'color':scope.row.total_ror_color}">{{scope.row["total_ror_value"]}}</span>
      </template>
    </el-table-column>
     <el-table-column
      prop="total_ror"
      label="累计收益率"
      width="120">
      <template slot-scope="scope">

              <span :style="{'color':scope.row.total_ror_color}">{{scope.row["total_ror"]}}</span>
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
      width="">
    </el-table-column>
  </el-table>
      </el-col>
    </el-row>
    <el-row>
            <el-col offset=1 span="22">
              <div id="total_ror_chart" style="margin-top:10px;margin-bottom:10px;height:360px">
                累计收益率
              </div>
            </el-col>
    </el-row>
    <el-row>
            <el-col offset=1 span="22">
              <div id="rsi_chart" style="margin-top:10px;margin-bottom:10px;height:360px">
                RSI
              </div>
            </el-col>
    </el-row>
    <el-row>
            <el-col offset=1 span="22">
              <div id="price_chart" style="margin-top:10px;margin-bottom:10px;height:360px">
                价格变化
              </div>
            </el-col>
    </el-row>
         <el-row>
            <el-col offset=1 span="22">
              <div id="base_currency_chart" style="margin-top:10px;margin-bottom:10px;height:360px">
                USDT变化
              </div>
            </el-col>
    </el-row>
     <el-row>
            <el-col offset=1 span="22">
              <div id="quote_currency_chart" style="margin-top:10px;margin-bottom:10px;height:360px">
                quote变化
              </div>
            </el-col>
    </el-row>
    
     <el-row>
            <el-col offset=1 span="22">
              <div id="daily_ror_chart" style="margin-top:10px;margin-bottom:10px;height:360px">
                每日收益
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
import { drawChart } from "@/libs/charts_util"

export default {
  name: 'simulation_detail',
  data() {
    return {
      data: [],
      ror:[],
      task_id:this.$route.params.id,
      backtest:[],
      base_currency:"usdt",
      quote_currency:"",
      rsi_buy:0,
      rsi_sell:0
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
        
            var _data = res["task"];
            
            this.quote_currency = _data["quote_currency"];
            this.base_currency = _data["base_currency"];
            this.backtest = res["backtest"]   
            this.rsi_buy =  _data["buy_rsi"];
            this.rsi_sell =  _data["sell_rsi"];

            _data["status_str"] = "等待执行";
            if(_data["status"] == 1){
                _data["status_str"] = "执行中";        
            }else if(_data["status"] ==2){
                _data["status_str"] = "已完成"; 
            }
           if(_data["total_ror"] > 0){
              _data["total_ror_color"] = "#00b464";
            }else if(_data["total_ror"] < 0){
              _data["total_ror_color"] = "#fa4d56";
            }else{
               _data["total_ror_color"] = "";
            }
            if(_data["total_ror"] ==0){
                _data["last_current_value"] = _data["init_amount"];
            }
            _data["total_ror_value"] = (_data["last_current_value"] - _data["init_amount"]).toFixed(6);

             _data["avg_ror"]=_data["avg_ror"].toFixed(2)+"%"
            _data["total_ror"]=_data["total_ror"].toFixed(2)+"%"
            this.data.push(_data);

             this.drawChart(this.backtest["back_result"],"total_ror_chart","累计收益率","%");
             this.drawChart(this.backtest["back_result"],"daily_ror_chart","每日收益","usdt");
             this.drawChart(this.backtest["back_result"],"base_currency_chart",this.base_currency,this.base_currency);
             this.drawChart(this.backtest["back_result"],"quote_currency_chart",this.quote_currency,this.quote_currency);
             this.drawChart(this.backtest["back_result"],"price_chart",this.quote_currency+"价格",this.base_currency);
             this.drawChart(this.backtest["back_result"],"rsi_chart","RSI","");

          }
      }).catch(err => {
        console.log(err);
        this.$message({
          showClose: true,
          message: "",
          type: "error"
        });
      });
   },
    drawChart(infos,chart_id,chart_title,chart_unit) {
      var x_data = [];
      var y_data = [];
      var _legend = [chart_title];
      var _series = [];
      var colorList =[];
     
     if(chart_title=="RSI"){
       y_data.push(this.rsi_sell);
       y_data.push(this.rsi_buy);
     }
      for(var i = 0; i < infos.length; i++){
          var item = infos[i];
          x_data.push(item["start_ktime_str"]);
          if(chart_title == "累计收益率"){
            y_data.push(item["total_ror"])
          }else if(chart_title == this.base_currency){
            y_data.push(item["current_base_currency_balance"]);
           
          }else if(chart_title == this.quote_currency){
            y_data.push(item["current_quote_currency_balance"]);

          }else if(chart_title== this.quote_currency+"价格"){
            y_data.push(item["end_price"]);
            
          }else if(chart_title== "RSI"){
            y_data.push(item["rsi"]);
            
          }else{
            let y = (item["end_value"] - item["start_value"]).toFixed(6);
            y_data.push(y);
            if(y >= 0){
              colorList.push("#00b464");
            }else{
              colorList.push("#fa4d56");
            }
           
          }
          
       }

      if(chart_title=="累计收益率"  || chart_title == this.quote_currency || chart_title == this.base_currency || chart_title == this.quote_currency+"价格"){
                let series ;
   series = { name:_legend[0],
            data: y_data,
            type: "line",
            smooth: true};
        _series.push(series);

      }else if(chart_title == "RSI"){

      let series = { name:_legend[0],
            data: y_data,
            type: "line",
            smooth: true,
            markLine: {
                data: [
                    {
                                
                               silent:false,             //鼠标悬停事件  true没有，false有
                               lineStyle:{               //警戒线的样式  ，虚实  颜色
                                   color:"#fa4d56",
                               },
                                   label:{
                                   position:'end',
                                   formatter:"RSI买("+this.rsi_buy+")"
                               },
                               yAxis:this.rsi_buy         
                              
                    },
                    {
                                
                               silent:false,             //鼠标悬停事件  true没有，false有
                               lineStyle:{               //警戒线的样式  ，虚实  颜色
                                   color:"#00b464",
                               },
                                   label:{
                                   position:'end',
                                   formatter:"RSI卖("+this.rsi_sell+")"
                               },
                               yAxis:this.rsi_sell         
                              
                    }
                ]
            }
            };
        _series.push(series);
          

      } else{
               let bar = { name:_legend[0],
            data: y_data,
            type: "bar",
            barWidth:'20%',
            itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
            smooth: true};
          _series.push(bar);
      }

     
      drawChart(chart_id, {
        title: chart_title,
        legend: _legend,
        x_type: "category",
        x_data: x_data,
        y_type: "value",
        y_name: chart_unit,
        y_unit_fn: function(value) {return value;},
        series:_series,
        tooltip_formatter: function(params) {
          
          var content = params[0].data+chart_unit;
          return content;
        }
      });
    }
  }
}
</script>

<style>

</style>
