const core = require('@actions/core');
const github = require('@actions/github');

let upload = require('./upload')

(async function() {
    try {
        const myToken = core.getInput('token');
        const octokit = new github.GitHub(myToken);
        const res = await octokit.issues.listForRepo({
            owner: 'leejim',
            repo: 'web.anyhub'
        });

        if (res.status !== 200) return;

        let { data } = res;
        let resData = [];
        
        data.forEach(item => {
            let arr = item.body.split('\r\n');
            let tmp = {}
            arr.forEach(str => {
                if (str.startsWith('name:')) {
                    tmp.name = str.split(':')[1].trim();
                }
                if (str.startsWith('url:')) {
                    tmp.url = str.split(':')[1].trim();
                }
                if (str.startsWith('reporter:')) {
                    tmp.reporter = str.split(':')[1].trim();
                }
                if (str.startsWith('label:')) {
                    tmp.label = str.split(':')[1].trim();
                }
            });
            if (['name', 'url', 'reportor', 'label'].every((key => key in tmp))) {
                resData.push(tmp);
            }
        })
        console.log(data);
        
        upload(data)        
    } catch (error) {
        core.setFailed(error.message);
    }
}())

/**
 * body: 'name: 百度脑图 - 便捷的思维工具\r' +
        '\nurl: http://naotu.baidu.com\r' +
        '\ndescription: 在线脑图工具\r' +
        '\nreporter: leejimqiu\r' +
        '\nlabel: 工具,在线'
 */