// console.log(process.argv[2]);

const execa = require('execa');
const moment = require('moment');

const branch = process.argv[2] || 'staging';

async function publish() {
    await execa.shell(`git checkout ${branch}`);
    await execa.shell('npm run build', { stdout: 'inherit' });
    await execa.shell('git add -A');
    await execa.shell(
        `git commit -m 'build: luban auto build and prepublish: ${moment().format('YYYY:MM-DD:HH:mm:ss')}'`
    );
    await execa.shell('git push');
}
publish().catch(e => {
    console.log('err', e);
});
