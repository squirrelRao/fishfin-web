export function getTargetUserDes(values) {
  var desc = "指定用户";

  for (var i = 0; i < values.length; i++) {
    if (values[i] == "1") {
      // return "全部用户";
      desc = desc + " 全部用户 ";
    }
    var item = values[i];
    if (item == "2") {
      desc = desc + " IOS用户 ";
    } else if (item == "3") {
      desc = desc + " 安卓用户 ";
    } else if (item == "4") {
      desc = desc + " VIP用户 ";
    } else if (item == "5") {
      desc = desc + " 微信注册用户 ";
    } else if (item == "6") {
      desc = desc + " QQ注册用户 ";
    } else if (item == "7") {
      desc = desc + " 手机用户 ";
    }
  }
  return desc;
}

export function getCategoryDesc(value) {
  if (value == "default") {
    //open app

    return "打开app";
  } else if (value == "mvp") {
    //mvp page

    return "进入MVP页面";
  } else if (value == "vip") {
    //vip

    return "进入VIP页面";
  } else if (value == "info") {
    //webpage and  translate

    return "打开网页不翻译";
  } else if (value == "news") {
    //webpage and no translate

    return "打开网页并翻译";
  }
}

export function getChannelNamesAndLines(infos) {
  var channel_names = [];
  var lines = [];

  for (var i = 0; i < infos.length; i++) {
    var item = infos[i];

    const channels = item["data"];

    for (var j = 0; j < channels.length; j++) {
      const _data = channels[j];

      var is_line_exist = false;
      for (var k = 0; k < channel_names.length; k++) {
        if (channel_names[k] == _data["channel"]) {
          is_line_exist = true;
          break;
        }
      }

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

      // line = {name:_data["channel"],data:_data["launch_count"],type:'line',smooth:true};
      // console.log(lines);
    }
  }
  return [channel_names, lines];
}

export function sequence(a, b) {
  if (a.data > b.data) {
    return -1;
  } else if (a.data < b.data) {
    return 1;
  } else {
    return 0;
  }
}

export function groupActionType(_action, extraQuery) {
  var action = "启动应用";
  if (_action == "trans_doc") {
    action = "使用文档翻译";
  } else if (_action == "trans_text") {
    action = "使用文字翻译";
  } else if (_action == "trans_voice") {
    action = "使用语音翻译";
  } else if (_action == "open_url") {
    action = "使用网页翻译";
    if (extraQuery != "") {
      action = action + "-访问:" + extraQuery;
    }
  } else if (_action == "trans_image") {
    action = "使用图片翻译";
  }
  return action;
}
