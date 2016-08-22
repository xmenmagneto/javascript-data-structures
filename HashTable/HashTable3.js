//创建更好的散列函数
function HashTable() {
    var table = [];

    var ValuePair = function (key, value) {
        this.key = key;
        this.value = value;
        this.toString = function () {  //用来console.log(talbe[i])
            return '[' + this.key + ' - ' + this.value + ']';
        }
    };

    var loseloseHashCode = function (key) {
        var hash = 5381;
        for(var i=0; i<key.length; i++){
            hash = hash*33 + key.charCodeAt(i);
        }
        return hash % 1013;
    };
    this.put = function (key, value) {
        var position = loseloseHashCode(key);

        if(table[position] ==undefined){ //此位置没有被占据
            table[position] = new LinkedList();
        }
        table[position].append(new ValuePair(key, value));
    };

    this.get = function (key) {
        var position = loseloseHashCode(key);

        if(table[position] !== undefined){
            //  遍历链表来寻找键/值
            var current = table[position].getHead();

            while(current.next){  //在第二个~倒数第二个之间
                if(current.element.key === key){
                    return current.element.value;
                }
                current = current.next; //访问下一个节点
            }
            //特殊情况: 判断第一个和最后一个节点
            if(current.element.key === key){
                return current.element.value;
            }
        }
        return undefined;
    };
    this.remove = function (key) {
        var position = loseloseHashCode(key);

        if(table[position] !== undefined){
            var current = table[position].getHead();
            while(current.next){
                if(current.element.key === key){
                    table[position].remove(current.element); //移除链表中该节点
                    if(table[position].isEmpty()){  //该链表也不存在其他节点
                        table[position] = undefined;
                    }
                }
                current = current.next;
            }
            //只有一个节点or 最后一个节点
            if(current.element.key === key){
                table[position].remove(current.element);
                if(table[position].isEmpty()){
                    table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    };
    this.print = function () {
        for(var i=0; i<table.length; i++){
            if(table[i] !== undefined){
                console.log('position:' +i+ ', value: ' + table[i]);
            }
        }
    }
}