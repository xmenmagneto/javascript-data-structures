this.sequetialSearch = function (item) {
    for(var i= 0; i<array.length; i++){
        if(item === array[i]){
            return i;
        }
    }
    return -1;
};


//二分搜索
this.binarySearch = function (item) {
    this.quickSort();  //快速排序

    var low = 0,
        high = array.length-1,
        element = array[mid]; //中间索引的值

    while(low <= high){
        mid = Math.floor(low + high); //获得中间索引
        if(element < item){ //小于目标值
            low = mid + 1;
        }else if(element > item){
            high = mid -1;
        }else{
            return mid;
        }
    }
    return -1; //没找到
};