/**
 *  1、冒泡排序
 * 2、
 */

let arr = [1, 35, 54, 22, 3, 21, 8]

// 冒泡排序
function bubbing(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
    }
}
// 快速排序
function quickSort(arr: number[]) {

}


// 归并排序
function mergeSort(arr: number[]) {


}

// 原生的排序
function nativeSort(arr: number[]) {
    arr.sort((a, b) => a - b)
}




bubbing(arr)



