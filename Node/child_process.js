// exec 、execSync、spawn、spawenSync、fork

// 1、exec：执行shell命令但是有20kb的大小限制
// 2、spawn：执行命令但是没有大小限制
// 3、fork：创建node子进程

const { exec, execSync, spawn, spawnSync, fork } = require('child_process')
// exec('node -v', (err, stdout, stderr) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log(stdout);

// })
const testProcess = fork('./test.js')
testProcess.send('我是主线程')
// testProcess.on('mesage', msg => {
//     console.log(111, msg);

// })