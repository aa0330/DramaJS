console.log(process.platform);
console.log(process.argv);
console.log(process.cwd());     // 获取当前的工作目录 esm模式下使用不了 __dirname
console.log(process.memoryUsage());

//  exit() 退出进程
//  kill 杀死进程 需要进程id参数   进程id---process.pid
//  env环境变量  获取操作系统的所有环境变量，可以修改，但是只能在当前进程下生效，不会影响系统的环境变量

setTimeout(() => {
    console.log('5s');
}, 5000)

process.on('exit', () => {
    console.log('进程退出了');
})

setTimeout(() => {
    console.log(process.pid);

    process.exit()
}, 2000)