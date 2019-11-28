const core = require('@actions/core');
const github = require('@actions/github');

try {
    const myToken = core.getInput('token');
    const octokit = new github.GitHub(myToken);
    const data = await octokit.issues.listForRepo({
        owner: 'leejim',
        repo: 'web.anyhub'
    });
    console.log(data);
} catch (error) {
    core.setFailed(error.message);
}