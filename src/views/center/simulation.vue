<template>
   <div id="simulation" class="main">
    <el-row class="tab_panes">
      <el-col offset=1 span=22>
   <simulation_table :symbol="symbol"></simulation_table>
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
  name: 'simulation',
  data() {
    return {
      phone: '',
      code:'',
      symbol:'doge/usdt'
    }
  },
  components:{
    simulation_table
  },
  mounted:{

  },
  methods:{
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
