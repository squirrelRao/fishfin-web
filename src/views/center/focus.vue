<template>

  <div id="focus" class="main">
    <el-row align="right">
 
    </el-row>
    <el-row class="tab_panes">
      <el-col offset=1 span=22>
      <el-tabs v-model="activeName" @tab-click="tabClick">
    <el-tab-pane label="1min" name="1min"><focus_table1 ref="focus_table1"/></el-tab-pane>
    <el-tab-pane label="5min" name="5min"><focus_table2 ref="focus_table2"/></el-tab-pane>
    <el-tab-pane label="30min" name="30min"><focus_table3 ref="focus_table3"/></el-tab-pane>
    <el-tab-pane label="60min" name="60min"><focus_table4 ref="focus_table4"/></el-tab-pane>
      </el-tabs>
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
.auto_search{
border-radius:2px;
}
.tab_panes{

   width: auto;
   margin-top:20px;
}

</style>
<script>
import focus_table from '@/components/focus_table'

export default {
  name: 'focus',
  data() {
    return {
      phone: '',
      code:'',
      activeName:"1min",
      data:[],
      page_no:1,
      page_size:5
    }
  },
  components:{
    focus_table1:focus_table,
    focus_table2:focus_table,
    focus_table3:focus_table,
    focus_table4:focus_table
  },
  mounted(){
    this.queryData();
  },
  methods:{

    tabClick:function(tab, event){
        this.activeName = tab.name;
        this.queryData();
    },
    queryData:function(){

       this.$api.http("/v1/focus/data", "post", {"user_id":this.$store.getters.user_id,"period":this.activeName,"page_size":this.page_size,"page_no":this.page_no}).then(res => {
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
            item["is_signal"] = _data["watch"]["open_signal"];

            this.data.push(item);

          }
          if(this.activeName == "1min"){
            this.$refs.focus_table1.updateData(this.data,res["count"],this.page_size,this.page_no);
          }else if(this.activeName == "5min"){
            this.$refs.focus_table2.updateData(this.data,res["count"],this.page_size,this.page_no);
          }else if(this.activeName == "30min"){
            this.$refs.focus_table3.updateData(this.data,res["count"],this.page_size,this.page_no);
          }else if(this.activeName == "60min"){
            this.$refs.focus_table4.updateData(this.data,res["count"],this.page_size,this.page_no);
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

    },
    toIndex:function(){
      this.$router.push({"path":"/"});
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
