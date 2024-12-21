/**
 * os模块  
 * platform  编译nodejs的操作系统的字符串  
 * 
 * 
 *  
 */

var os = require("node:os")
console.log(os.platform());
console.log(os.release());

console.log(os.version());
console.log(os.homedir());
console.log(os.cpus());
console.log(os.cpus().length);
console.log(os.networkInterfaces());
