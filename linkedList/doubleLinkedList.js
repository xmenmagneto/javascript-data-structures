function LinkedList() {
    var Node = function (element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    };

    var length =0;
    var head = null;
    var tail = null;
    this.append = function(element){
        var node = new Node(element),
            curruent;
        if(head === null){
            head = node;
        }else{
            current = head;
            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        length++;
    };
    this.insert = function(position, element){ //在某个位置之前插入元素
        if(position >= 0 && position <= length){  //{1}
            var node = new Node(element), //创建要增加的节点
                current = head,
                previous,
                index = 0;

            if(position === 0) {  //在第一个位置添加
                if (!head) {   //空链表
                    head = node;
                    tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    head = node;
                }
            }
            else if(position === length){  //最后一项
                    current = tail; //{3} 把最后一个元素赋给current
                    current.next = node;
                    node.prev = current;
                    tail = node;
            }else{  //在中间插入
                while(index++ < position){  //{4}
                    previous = current;
                    current = current.next;
                }
                node.next = current;  //{5}
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            length++;
            return true;
        }else {
            return false;
        }
    };
    this.removeAt = function(position){
        if(position > -1 && position < length){
            var current = head,
                previous,
                index = 0;
            //移除第一项
            if(position ===0){
                head = current.next; //1

                //若只有一项,更新tail
                if(length === 1){  //2
                    tail = null;
                }else {
                    head.prev = null; //3,本来是指向current
                }
            }else if(position === length-1){ //移除最后一项
                current = tail; //4
                tail = current.prev;  //倒数第二个元素
                tail.next = null;
            } else{
                while(index++ < position){  //5
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;//6
                current.next.prev = previous;
            }
            length--;
            return current.element;
        }else {
            return null;
        }
    };
    this.remove = function(element){
        var index = this.indexOf(element);//找位置
        return this.removeAt(index);
    };
    this.indexOf = function(element){
        var current = head,
            index = -1;
        while(current){
            if(element === current.element){
                return index;
            }
            index++;
            current = current.next;
        }
        reuturn -1;
    };
    this.isEmpty = function() {
        return length === 0;
    };
    this.size = function() {
        return length;
    };
    this.toString = function(){
        var current = head,
            string = '';
        while(current){
            string += current.element;
            current = current.next;
        }
        return string;
    };
    this.print = function(){};
    this.getHead =function () {
        return head;
    }
}