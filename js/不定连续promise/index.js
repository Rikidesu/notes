(function(){
    var promise = function(data){

        return new Promise(function(resolve,reject){
            
            data.times = (++data.times)||1

            setTimeout(function(){
                var rollNum = ~~ ( Math.random() * 10 ) ;
                if( rollNum == data.requestNum ){
                    data.result = true;
                    data.data = "成功roll到所需数据。";
                    data.rollNum = rollNum;
                    resolve(data);
                } else if( data.times > ( data.limit - 1) ){
                    data.result = true;
                    data.data = "已经达到最大次数，停止roll。";
                    resolve(data);
                }
                else{
                    data.result = false;
                    data.data = "还需要继续roll。"
                    data.rollNum = rollNum;
                    resolve(data)
                }
            },data.delay||500);
        });

    }

    var doSuccess = function (res){
        console.log(res.data + "这是第" + res.times + "次roll到的数据："+res.rollNum);
    }

    var doNext = function (res){
        res.times && console.log(res.data + "这是第" + res.times + "次roll到的数据："+res.rollNum);
        promise(res).then(requestFun)
    }

    var requestFun = function (res){

        if( typeof {} == 'object' && res.result ){
            doSuccess(res);
        }else{
            doNext(res);
        }

        return "开始请求"

    }

    return requestFun({
        requestNum:9,   //  填写要猜的数字 0-9
        delay:100,      //  每次请求模拟等待时间 ms
        limit:20,        //  最大猜的次数

        /*所有字段说明：


        result: true of false    //是否继续执行
        data:   "text"           //可以说是返回的数据吧
        rollNum:    1            //这次roll到的数据
        times:      3            //请求了的数据
        */
    });


})()
