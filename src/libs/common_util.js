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




