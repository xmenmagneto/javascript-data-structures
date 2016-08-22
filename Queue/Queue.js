function Queue() {
    var items = [];

    this.enqueue = function (element) {
        items.push(element);
    };
    this.dequeue = function () {
        return items.shift(); //弹出第一个元素
    };
    this.front = function () {
        return items[0];  //返回第一个
    };
    this.isEmpty = function () {
        return items.length == 0;  //判断队列是否为空
    };
    this.clear = function () {
        items = [];
    };
    this.size = function () {
        return items.length;
    };
    this.print = function () {
        console.log(items.toString());
    }
}