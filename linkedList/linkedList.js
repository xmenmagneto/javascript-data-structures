function LinkedList() {
	var Node = function (element) {
		this.element = element;
		this.next = null;
	};

	var length =0;
	var head = null;
	this.append = function(element){
		var node = new Node(element);
		var	current = null;

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
		return node;
	};
	this.insert = function(position, element){ //在某个位置之前插入元素
		if(position >= 0 && position <= length){  //{1}
			var node = new Node(element), //创建要增加的节点
				current = head,
				previous,
				index = 0;
			
			if(position === 0){
				node.next = current; //{2}
				head = node;
			}else{
				while(index++ < position){  //{3}
					previous = current;
					current = current.next;
				}
				node.next = current;  //{4}
				previous.next = node;  //{5}
			}
			length++;
			return true;
		}else {
			return false; //{6}
		}
	};
	this.removeAt = function(position){
		if(position > -1 && position < length){
			var current = head,
				previous,
				index = 0;

			if(position ===0){
				head = current.next;
			}else{
				while(index++ < position){
					previous = current;
					current = current.next;
				}
				previous.next = current.next;
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
			index = 0;  //从头开始
		while(current){
			if(element === current.element){
				return index;
			}
			index++;
			current = current.next;
		}
		return -1;
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
	
	this.getHead = function () {
		return head;
	}
}