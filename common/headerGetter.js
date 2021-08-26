const inquirer = require("inquirer");
const chalk = require("chalk");
module.exports = {
    async getCookie() {
        console.log(chalk `{blue.bold 获取Cookie...}`)
        const { data } = await inquirer.prompt({
            type: "editor",
            message: `请提供账号验证信息 (按Enter开始编辑)`,
            default: `Cookie获取方法: 
打开这个网址: https://api.codemao.cn/web/forums/posts/396170/replies
按F12, 找到Network(网络), 然后选择第一项"replies"
从右侧找到"Headers", 往下翻, 找到Cookie后面一大串, 复制即可

下面是格式示例(没有多余的引号或换行): 
__ca_uid_key__=ad26d186-dcd8-46fe-81cc-a41b6970be0f; authorization=eyJ0eXAiOiJnV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDb1RlbWFvIEF1dGgiLCJ1c2VyX3R5cGUiOiJzdHVkZW50IiwiZGV2aWNlX2lkIjowLCJ1c2VyX2lkIjo0MzY0MzYsImlzcyI6IkF1dGggU2VydmljZSIsInBpZCI6IkFOTlJ2SFpUIiwiZXhwIjoxNjMyODA4Njk4LCJpYXQiOjE2Mjg5MjA2OTgsImp0aSI6ImE5ZDY1ZGE3LWVkMDUtNGU3Ni1iNzg5LWU3MTE5NmFjN2ViMyJ9.dPByMaaCsaxftbnU5BZwms1SwlQUVBrJAHSnC6ewHXM; _ga=GA1.2.366175072.16350036; SL_C_23361dd035530_KEY=be556a167e74fcde3a3444a29b25f8e99fb0c59f; SL_C_23361d3035530_VID=Vr9CrEbrFm; acw_tc=2f624a4816297278919198741e7bee4e222f076cc49198d20ec2d9d283853e

[!!!] 请删除这里的所有信息并将你的Cookie信息粘贴在此处
编辑完成后保存并关闭编辑器窗口, 程序将自动处理`,
            name: "data",
            validate: v => /^[A-Za-z0-9\-_; =.%*&/]+$/.test(v) ? true : "输入格式有误. 输入内容应该只包含Cookie, 不能出现其他信息以及多余的换行. (按Enter重新编辑)"
        });
        return data;

    },
}