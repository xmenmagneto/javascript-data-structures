function BinarySearchTree() {
    var Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };
    var root = null;

    //=======================================
    //插入节点
    //=======================================
    this.insert = function (key) {
        var newNode = new Node(key);
        if(root === null){  //树是空的
            root = newNode;
        }else{
            insertNode(root, newNode); //辅助函数, 找到正确位置
        }
    };

    //插入前的比较,用来确定位置
    var insertNode = function (node, newNode) {
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
            }else{
                insertNode(node.left, newNode);
            }
        }else {  //newNode.key大于或等于当前节点值
            if(node.right === null){
                node.right = newNode;
            }else {
                insertNode(node.right, newNode);
            }
        }
    };

    //=======================================
    //遍历的callback函数, 三种遍历都要用
    //=======================================
    var printNode = function(value) {
        console.log(value);
    };

    //=======================================
    //中序遍历, 先访问左侧子节点, 在访问节点本身, 再访问右侧子节点
    //=======================================
    this.inOrderTraverse = function (callback) {
        inOrderTraverseNode(root, callback);
    };
    //私有辅助函数
    var inOrderTraverseNode = function (node, callback) {
        if(node !== null){//检查树是否为空
            inOrderTraverseNode(node.left, callback); //先检查比该节点小的
            callback(node.key);  //输出当前节点
            inOrderTraverseNode(node.right, callback);//再检查比该节点大的
        }
    };


    //=======================================
    //先序遍历, 先访问节点本身,在访问左侧子节点,在访问右侧子节点
    //=======================================
    this.preOrderTraverse = function (callback) {
        preOrderTraverseNode(root, callback);
    };
    var preOrderTraverseNode = function (node, callback) {
        if(node !== null){
            callback(node.key);
            preOrderTraverseNode(node.left, callback);
            preOrderTraverseNode(node.right, callback);
        }
    };

    //=======================================
    //后序遍历, 先访问左侧子节点,在访问右侧子节点,最后访问节点本身
    //=======================================
    this.postOrderTraverse =function (callback) {
        postOrderTraverseNode(root, callback);
    };
    var postOrderTraverseNode = function (node, callback) {
        if(node !== null){
            postOrderTraverseNode(node.left, callback);
            postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    };

    //=======================================
    //搜索树中的值
    //=======================================

    //搜索最小值
    this.min = function () {
        return minNode(root);
    };
    var minNode =function (node) {
        if(node){
            while(node && node.left !== null){  //该node有左侧子节点
                node = node.left;
            }
            return node.key;
        }
        return null; //空节点
    };

    //搜索最大值
    this.max = function () {
        return maxNode(root);
    };
    var maxNode = function (node) {
        if(node){
            while(node && node.right !== null){
                node = node.right;
            }
            return node.key;
        }
        return null;
    };

    //搜索一个特定的值
    this.search = function (key) {
        return searchNode(root, key);  //1
    };

    var searchNode = function (node, key) {
        if(node === null){  //树是空的   //2
            return false;
        }
        if(key < node.key){    //3
            return searchNode(node.left, key);  //4
        }else if(key > node.key){               //5
            return searchNode(node.right, key); //6
        }else {
            return true;  //7
        }
    };

    //=======================================
    //移除一个节点
    //=======================================

    this.remove = function (key) {
        root = removeNode(root, key);
    };

    var removeNode = function (node, key) {
        if(node === null){//检测的节点是null, 键不存在于树中
            return null;
        }
        if(key < node.key){  //3
            node.left = removeNode(node.left, key);  //4
            return node; //5
        }else if(key > node.key){ //6
            node.right = removeNode(node.right, key); //7
            return node;
        }else{  //键等于node.key

            //第一种情况——一个叶节点
            if(node.left === null && node.right === null){  //9
                node = null; //10   移除该节点
                return node;  //11  返回null,来将其对应的父节点指针赋为null
            }

            //第二种情况——一个只有一个子节点的节点
            if(node.left === null){
                node = node.right;  //跳过该节点
                return node; //把修改后的节点返回父节点
            }else if(node.right === null){
                node = node.left;
                return node;
            }

            //第三种情况——一个有两字子节点的节点
            //寻找子树中的最小节点
            var findMinNode = function (node) {
                if(node){
                    while(node && node.left !== null){  //该node有左侧子节点
                        node = node.left;
                    }
                    return node; //返回找到的最小节点
                }
                return null; //没有子树
            };
            
            var aux = findMinNode(node.right); //找它右边字数中最小的节点
            node.key = aux.key; //用找到的最小节点的键, 去更新这个节点的键——移除
            node.right = removeNode(node.right, aux.key); //要把右侧子树中那个最小的节点移除掉
            return node; //向父节点返回更新
        }
    }
}