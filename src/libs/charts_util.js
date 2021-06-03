import { sequence } from "@/libs/common_util";

//绘图所需要的option的数据结构及定义
export function getChartOption() {
  return {
    title: "",
    legend: [],
    series: [],
    x_type: "",
    x_data: [],
    y_type: "",
    y_name: "",
    y_unit: "",
    subtext:"",
    min_interval: 0.5,
    tooltip_formatter: this.tooltipBasicFormatter
  };
}

//绘图提示函数
export function tooltipBasicFormatter(params, unit) {
  var content = "";
  params = params.sort(sequence);
  var total = 0;
  for (var i = 0; i < params.length; i++) {
    total += params[i].data
    content += params[i].seriesName + ":" + params[i].data + unit + "<br>";
  }

  if(params.length > 1 && content.indexOf("总") == -1){
    content = "总计:"+total + unit +"<br>"+content;
  }

  content = params[0].name + "<br>" + content;
  
  return content;
}

//自动以绘图函数点击事件，点击图例以后，只显示点击的数据曲线
export function echartLegendSelect(chart,obj){
  console.log(obj.name);
 var selected = obj.selected;
 var legend = obj.name;
 if (selected != undefined) {
   var toggleSelected=[];
   for(var _name in selected){
     console.log(_name,legend)
     if(_name != legend){
     toggleSelected.push({name:_name})
    }
   }
   console.log(toggleSelected);
   chart.dispatchAction({type:"legendSelect",name:legend});
   chart.dispatchAction({type:"legendToggleSelect",batch:toggleSelected});
 }
}

//绘图函数-根据传入的option进行绘制
export function drawChart(chart_id, option) {
  var dom = document.getElementById(chart_id);
  dom.style.display = "";
  let echarts = require("echarts");
  var chart = echarts.init(dom);

  var tooltip = {
    trigger: "axis"
  };
  if (option.tooltip_formatter) {
    tooltip["formatter"] = function(params) {
      return option.tooltip_formatter(params, option.y_unit);
    };
  }
  var chart_option = {
    title: {
      text: option.title,
      subtext: option.subtext,
      x: "center"
    },
    legend: {
      data: option.legend,
      type: 'scroll',
      bottom: 0,
    },
    tooltip: tooltip,
    xAxis: {
      type: option.x_type,
      data: option.x_data
    },
    yAxis: {
      type: option.y_type,
      name: option.y_name,
      axisLine: { onZero: false },
      axisLabel: {
        formatter: option.y_unit_fn
          ? option.y_unit_fn
          : "{value}" + option.y_unit
      },
      boundaryGap: false,
      minInterval: option.min_interval
    },
    series: option.series
  };

  chart.on('legendselectchanged', function(obj){echartLegendSelect(chart,obj);});

  if (chart_option && typeof chart_option === "object") {
    chart.setOption(chart_option, true);
  }

  return chart;
}

//通过返回结果，组装出渠道名、曲线等
export function getChannelNamesAndLines(infos) {
  var channel_names = [];
  var lines = [];

  for (var i = 0; i < infos.length; i++) {
    var item = infos[i];

    var channels = item["data"];

    for (var j = 0; j < channels.length; j++) {
      var _data = channels[j];

      var is_line_exist = false;
      for (var k = 0; k < channel_names.length; k++) {
        if (channel_names[k] == _data["channel"]) {
          is_line_exist = true;
          break;
        }
      }

      if (is_line_exist == false) {
        channel_names.push(_data["channel"]);
        var line = {
          name: _data["channel"],
          data: [],
          type: "line",
          smooth: true
        };
        lines.push(line);
      }
      console.log(lines);

      if (is_line_exist == false) {
        channel_names.push(_data["channel"]);
        const line = {
          name: _data["channel"],
          data: [],
          type: "line",
          smooth: true
        };
        lines.push(line);
      }
      console.log(lines);
    }
  }
  return [channel_names, lines];
}
