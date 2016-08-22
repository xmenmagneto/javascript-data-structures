function Graph() {
    var vertices = [];
    var adjList = new Dictionary();  //用字典存邻接表

    //=======================================
    //创建邻接表
    //=======================================
    //添加顶点
    this.addVertex = function (v) {
        vertices.push(v);
        adjList.set(v, []);   //添加在邻接表中
    };
    //无向图--在邻接表中添加边
    this.addEdge = function (v, w) {
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    };

    //有向图--在邻接表中添加边
    this.addEdgeDAG = function (v, w) {
        adjList.get(v).push(w);
    };

    //=======================================
    //输出邻接表
    //=======================================
    this.toString = function () {
        var s = '';
        for(var i=0; i<vertices.length; i++){ //遍历顶点
            s += vertices[i] + ' -> ';
            var neighbors = adjList.get(vertices[i]);
            for(var j=0; j<neighbors.length; j++){
                s += neighbors[j] + ' ';
            }
            s += '\n';  //让下一个顶点另起一行
        }
        return s;
    };

    //=======================================
    //图的遍历
    //=======================================


    //--------------------
    //callback-function
    //--------------------
    var printNode = function (value) {
        console.log('Visited vertex: ' + value);
    };

    //初始化颜色
    var initializeColor = function () {
        var color = [];
        for(var i=0; i<vertices.length; i++){
            color[vertices[i]] = 'white';
        }
        return color;
    };

    //--------------------
    //bfs--广度优先搜索算法
    //--------------------
    this.bfs = function (v, callback) {
        var color = initializeColor(), //全部顶点对应的颜色设置为白色
            queue = new Queue(); //用来存要打印的顶点
        queue.enqueue(v); //存入第一个顶点

        while(!queue.isEmpty()){  //还有需要打印的顶点
            var u = queue.dequeue(), //弹出需要打印的顶点
                neighbors = adjList.get(u);  //找到该顶点所有邻居
            color[u] = 'grey'; //把该顶点对应颜色设置为grey
            for(var i=0; i<neighbors.length; i++){  //遍历所有邻居
                var w = neighbors[i];  //获取单个邻居的名字
                if(color[w] === 'white'){  //若邻居还未被访问
                    color[w] = 'grey'; //设置为已被访问
                    queue.enqueue(w); //存入要打印的队列
                }
            } //完成的对所有邻接点的处理
            color[u] = 'black'; //标注为已被探索过
            if(callback){ //可选参数
                callback(u);
            }
        }

    };


    //--------------------
    //dfs--深度优先搜索
    //--------------------
    this.dfs = function (callback) {
        var color = initializeColor();
        console.log(color);
        for(var i=0; i<vertices.length; i++){  //遍历每个顶点
            if(color[vertices[i]] === 'white'){  //未被访问
                dfsVisit(vertices[i], color, callback);
            }
        }
    };

    //私有递归函数
    var dfsVisit = function (u, color, callback) {
        color[u] = 'grey'; //传入的节点设置为灰色
        if(callback){
            callback(u);  //打印节点
        }
        var neighbors = adjList.get(u); //得到u的所有邻接点
        for(var i=0; i<neighbors.length; i++){  //遍历领节点
            var w = neighbors[i];
            if(color[w] === 'white'){  //领节点未被访问
                dfsVisit(w, color, callback);  //对该邻接点进行深度访问
            }
        }
        color[u] = 'black'; //探索结束
    };






    //=======================================
    //用BFS寻找最短路径
    //=======================================

    //--------------
    //求其他顶点到顶点V的最短距离
    //--------------
    this.BFS = function (v) {
        var color = initializeColor(),
            queue = new Queue(),
            d = [],  //  距离
            pred = []; //装前溯点
        queue.enqueue(v);  //要探索的顶点

        //遍历每一个顶点
        for(var i=0; i<vertices.length; i++){
            d[vertices[i]] = 0; //到V的距离初始化为0
            pred[vertices[i]] = null; // 其前溯点初始化为null
        }

        while(!queue.isEmpty()){  //还存在要探索的顶点
            var u = queue.dequeue(), //弹出第一个
                neighbors = adjList.get(u); //得到该顶点所有邻接点
            color[u] = 'grey';
            //遍历每一个邻接点
            for(var i=0; i<neighbors.length; i++){
                var w= neighbors[i];
                if(color[w] === 'white'){
                    color[w] = 'grey';
                    d[w] = d[u] + 1; //到v的距离是d[u]+1
                    pred[w] = u;
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
        }
        //所有顶点都探索完了
        return{
            distances: d,
            predecessor: pred
        };
    };

    //--------------
    //保存结果----其他顶点到A的最短路径
    //--------------
//    var shortestPathA = graph.BFS(myVertices[0]);



    //--------------
    //打印顶点A到其他顶点的路径
    //--------------
    this.pathOfAtoOthers = function () {
        var fromVertex = myVertices[0]; //把A作为源顶点
        for(var i=1; i<vertices.length; i++){ //遍历其他每一个顶点
            var toVertex = myVertices[i],
                path = new Stack(); // 创建A到该顶点的路径
            //由该顶点反向回溯到顶点A
            for(var v=toVertex; v!==fromVertex; v=shortestPathA.predecessor[v]){
                path.push(v); //若v不等于A, 就把当前v存入栈; 若v到达A, 跳出循环
            }
            path.push(fromVertex); //把与源顶点存入
            var s = path.pop(); //弹出刚才存入的源顶点
            //打印源顶点到指定顶点的路径
            while(!path.isEmpty()){
                s += ' - ' + path.pop();
            }
            console.log(s);
        }
    };

    //=======================================
    //DFS改进
    //=======================================
    var time = 0; //时间参量
    this.DFS = function () {
        var color = initializeColor(),
            d = [],  //发现时间
            f = [],  //完成探索时间
            p = [];  //predecessor
        time = 0;

        for(var i=0; i<vertices.length; i++){  //遍历每个顶点
            f[vertices[i]] = 0;  //探索完成时间 = 0
            d[vertices[i]] = 0;  //发现时间=0
            p[vertices[i]] = null;
        }
        //对每个白色的顶点调用DFSVisit
        for(i=0; i<vertices.length; i++){
            if(color[vertices[i]] === 'white'){
                DFSVisit(vertices[i], color, d, f, p);
            }
        }
        return {   //返回一个对象
            discovery: d,
            finished: f,
            predecessors: p
        };
    };


    var DFSVisit = function (u, color, d, f, p) {
        console.log('discovered ' + u);
        color[u] = 'grey';
        d[u] = ++time;   //发现时间
        var neighbors = adjList.get(u);
        for(var i=0; i<neighbors.length; i++){  //遍历邻居
            var w = neighbors[i];
            if(color[w] === 'white'){
                p[w] = u; //predecessor
                DFSVisit(w, color, d, f, p);
            }
        }
        color[u] = 'black';  //u的邻居全部被探索了
        f[u] = ++time; //发现时间
        console.log('explored ' + u);
    };


}