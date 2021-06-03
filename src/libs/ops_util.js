
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
