//改进--计算开销
var sequentialSearch = function (array, item) {
    var cost = 0;
    for(var i=0; i<array.length; i++){
        cost++;
        if(item === array[i]){
            console.log('Cost with input size ' + array.length + ' is ' + cost);
            return i;  //返回索引
        }
    }
    return -1;
};

//用冒泡排序做O(n2)的例子
var swap = function (array, index1, index2) {
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
};

var bubbleSort = function (array) {
    var length = array.length;
    var cost = 0;
    for(var i=0; i<length; i++){ //外层循环
        cost++;
        for(var j=0; j<length-1; j++){
            cost++;
            if(array[j] > array[j+1]){
                swap(array, j, j+1);
            }
        }

    }
    console.log('Cost with input size ' +length+' is' + cost);
};