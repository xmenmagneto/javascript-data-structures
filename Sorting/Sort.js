function ArrayList() {
    var array = [];

    this.insert = function (item) {
        array.push(item);
    };

    this.toString = function () {
        return array.join();
    };

    //==================================
    //冒泡排序
    //==================================
    this.bubbleSort = function () {
        var length = array.length;
        for(var i=0; i<length; i++){  //每个数字都经过一轮
            for(var j=0; j<length-1; j++){ //内循环, 从第一位比较到倒数第二位
                if(array[j] > array[j+1]){
                    swap(j, j+1);  // 交换位置
                }
            }
        }
    };

    //私有函数
    var swap = function (index1, index2) {
        var aux = array[index1]; //暂时存储
        array[index1] = array[index2];
        array[index2] = aux;
    };

    //输入下段代码——测试冒泡排序法
    /*var createNonSortedArray = function (size) {
        var array = new ArrayList();
        for(var i=size; i>0; i--){
            array.insert(i);
        }
        return array;
    };*/

    //改进冒泡排序————已经在正确位置上的数字不再比较
    this.modifiedBubbleSort = function () {
        var length = array.length;
        for(var i=0; i<length; i++){
            for(var j=0; j<length-1-i; j++){  //i:已经在正确位置的元素的个数
                if(array[j] > array[j+1]){
                    swap(j, j+1);
                }
            }
        }
    };



    //==================================
    //选择排序
    //==================================
    this.selectionSort = function () {
        var length = array.length,
            indexMin; //最小数的索引
        for(var i=0; i<length-1; i++){
            indexMin = i;  //把本轮次的第一个数字索引设置为最小值
            //开始与其后面的数字比较
            for(var j=i+1; j<length; j++){
                if(array[indexMin] > array[j]){ //发现更小的值
                    indexMin = j; //更新索引
                }
            }
            if(i !== indexMin){ //若第一个数字不是本轮的最小值
                swap(i, indexMin); //更换两个数字的位置
            }
        }
    };


    //==================================
    //插入排序
    //==================================
    this.insertionSort = function () {
        var length = array.length,
            j, temp; //temp用来存当前被比较数字的临时值
        for(var i=1; i<length; i++){ //认为第一个值已经排好
            j=i; //临时存储当前值的位置
            temp = array[i]; //临时存储当前数字的值
            while(j>0 && array[j-1] > temp){ //temp与前面每一项进行比较
                array[j] = array[j-1]; //把大的依次放在后面的位置
                j--; //去比较前面的值
            }
            console.log('value of j: '+ j);  //j的值还是被保存的
            array[j] = temp; //插入最终位置
        }
    };

    /*var test = function () {
        var j=4;
        while(j>0){
            j--;
        }
        console.log(j);  //j的值是0
    }*/
}