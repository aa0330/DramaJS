/** 
 * 防抖和节流：都是一种借助闭包来实现的优化策略
 * 
 *      防抖： 和手机自动息屏一样，每次触发重新计时
 *      
 *      节流： 多次触发在固定的时间段内只执行一次
 * 
 */

function antiShake(func: Function, await: number) {
    let timer;
    return function (...arg) {
        const ctx = this;
        clearTimeout(timer)
        timer = setTimeout(() => func.apply(ctx, arg), await)
    }
}
let deBounce = antiShake(() => console.log('111'), 1000)

deBounce()
setTimeout(() => deBounce(), 500)


function saveFlow(func: Function, limit) {
    let timer;
    return function (...arg) {
        let ctx = this;
        timer = Date.now();
        if (Date.now() < timer + limit) return;

    }
}




