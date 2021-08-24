const axios = require("axios");
const {prompt} = require("inquirer");
const chalk = require("chalk");
module.exports = {
  async main() {
    let {workID, times, interval, threads} = await prompt([
      {
        name: "workID",
        message: "输入作品号(示例: 38514435)",
        type: "input",
        validate: v => /^[0-9]+$/.test(v) ? true : "请输入正确的贴号"
      },
      {
        name: "times",
        message: "目标浏览量(数量过多可能导致封禁)",
        type: "number",
        default: 1000,
        validate: v => v > 0 ? true : "最低为1"
      },
      {
        name: "interval",
        message: "间隔时间 单位: 毫秒 (间隔太短可能导致封禁 默认100)",
        type: "number",
        default: 100,
        validate: v => v >= 0 ? true : "最低为0"
      },
      {
        name: "threads",
        message: "异步线程数量(过多或过少都会影响速度请根据电脑以及网络配置决定, 默认为25)",
        type: "number",
        default: 25,
        validate: v => v > 0 ? true : "最低为1"
      }
    ]);

    let count = 0;

    async function _() {
      while (count < times) {
        try {
          count = (await axios.get(`https://api.codemao.cn/creation-tools/v1/works/${workID}`, {
            headers: {
              Host: "api.codemao.cn",
            }
          })).data["view_times"];
        } catch (e) {

          if (e.response && e.response.status === 404) {
            console.error(chalk`{red 404错误: 帖子不存在}`)
            process.exit()
          }
          console.log(chalk`{red.bold 线程出错, 正在重启...}\n{red 错误: ${e}}`)
        }
        await new Promise(r => setTimeout(r, interval));
      }
    }


    let countThreads = 0, lastCount = 0;
    while (count < times) {
      while (countThreads < threads) {
        _();
        console.clear();
        console.log(chalk`{yellow.bold 正在启动线程: ${countThreads}/${threads} }`)
        await new Promise(r => setTimeout(r, 1));
        countThreads++
      }
      await new Promise(r => setTimeout(r, 1000))
      console.clear();
      console.log(chalk`{blue.bold 作品刷浏览量} {red.bold 作品号: ${workID}}\n温馨提示: 多个电脑一起刷同一个作品速度会更快\n`)
      console.log(chalk`{blue 当前浏览量: ${count}} {green 目标进度: ${(count / times * 100).toFixed(2)}%}\n{cyan.bold 速度: ${(count - lastCount)}次/秒} {red 预计剩余时间: ${((times - count) / (count - lastCount)).toFixed(1)}秒}`);
      console.log(chalk`{yellow.bold 按 Ctrl+C 或关闭窗口来中断此操作}`);
      lastCount = count;
    }
    console.log(chalk`{green.bold 完成}`)
  }
}

