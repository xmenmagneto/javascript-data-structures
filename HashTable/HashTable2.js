//线性探查
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
        var hash = 0;
        for(var i=0; i<key.length; i++){
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    };
    this.put = function (key, value) {
        var position = loseloseHashCode(key);

        if(table[position] ==undefined){ //此位置没有被占据
            table[position] = new ValuePair(key, value);
        }else {
            var index = ++position;
            while(table[index] !== undefined){  //不是空的
                index++;
            }
            table[index] = new ValuePair(key, value);
        }
    };

    this.get = function (key) {
        var position = loseloseHashCode(key);

        if(table[position] !== undefined){
            if(table[position].key === key){
                return table[position].value;
            }else{
                var index = ++position;
                while(table[index] === undefined || table[index].key !== key){
                    index++;
                }
                if(table[index].key === key){  //验证一下是不是符合key
                    return table[index].value;
                }
            }
        }
        return undefined;
    };
    this.remove = function (key) {
        var position = loseloseHashCode(key);

        if(table[position] !== undefined) {  //位置不是空的
            if(table[position].key === key){
                table[position] = undefined;
                return true;
            }else{
                var index = ++position;
                while(table[index] === undefined || table[index].key !== key ){
                    index++;
                }
                if(table[index].key === key){
                    table[index] = undefined;
                    return true;
                }
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