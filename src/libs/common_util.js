//排序函数
export function sequence(a,b){
  if (a.data>b.data) {
      return -1;
  }else if(a.data<b.data){
      return 1;
  }else{
      return 0;
  }
}

//loading基础组件
export function loadingOption(selector_name){

      return  {
      target: document.querySelector(selector_name),
      fullscreen: false,
      text: "正在查询数据,请稍等..."
    };
  }

  //AB测试代码对应的内容含义
  export function getAbTestCodeName(code){

    if(code == "G001" || code =="GW001" || code=="GW002"  || code=="GW003"){
        return  "APP新旧版本";
    }

    if(code == "Y003"){
        return  "小译开屏AB";
    }
  }

  //推送类型
export  function  getCategory(value){

  if(value == "1"){ //open app

      return "default";

  }else if(value == "2"){ //mvp page

      return "mvp";

  }else if(value == "3"){ //vip

      return "vip";

  }else if(value == "4"){ //webpage and  translate

      return "news";

  }else if(value == "5"){ //webpage and no translate

      return "info";
  }
}







