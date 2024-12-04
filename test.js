let strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
let resArr = [], flag = true, toolArr = [];
strs.forEach(ele => {
    if (flag) {
        resArr.push([ele]);
        toolArr.push(ele.split('').sort().join(''));
        flag = false;
        return;
    }
    let temStr = ele.split('').sort().join('');
    let index = -1;

    if (toolArr.includes(temStr)) {
        index = toolArr.indexOf(temStr);
    } else {
        toolArr.push(ele)
    };

    if (index !== -1) {
        resArr[index].push(ele);
    } else {
        resArr.push([ele])
    }

})


