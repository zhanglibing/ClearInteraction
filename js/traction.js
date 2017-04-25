$(function(){
    //编辑框复位、确定、关闭事件、显示值函数在common.js中

    var newarr=[];
    $('.ya li b').on('click',function(){
        var state=$(this).attr('state');
        if(state=="1"||state=="2"){ //缺失牙
            console.log(state)
            return false;
        }
        var order=$(this).closest('li').index();
        var qianyin=$(this).find('.qianyin');//用来判断该牙位是否已经有牵引值
        if(qianyin.length>0){
            var index=parseInt(qianyin.find('span').text()-1);
            InitPageData.Detail.splice(index,1); //去除指定索引值
            renderQian(InitPageData.Detail) //重新渲染
            return false;
        }
        newarr.push(order);
    })

    //提交事件
    $('.main .tijiao').on('click',function(){
        newarr=newarr.unique1();//数组去重;
        var str=""
        if(newarr.length>1){
            $.each(newarr,function(i,v){
                str+=v+'-';
            })
            str = str.substr(0, str.length - 1);
            var obj = {};
            obj.ThoothIndex=str;
            InitPageData.Detail.push(obj);
            newarr=[];
            renderQian(InitPageData.Detail)  //渲染牵引数据
        }
    })

    $('.pageBtn').on('click',function(){
        NextStep();
        data=data.replace(data,4,InitPageData);
        localStorage.data=JSON.stringify(data);
        if($(this).hasClass('back')){ //返回上一步进行保存 不发送请求
            window.location.href="hemian.html";
            return false;
        }
        api.TeethTraction(InitPageData,success,error);
    })

    function success(data){
        if(data.code!=200){
            alert(data.message);
            return false;
        }
        alert(data.message);
        window.location.href="work.html";
    }

    function error(data,option){
        alert(option.opertionType+"请求失败")
    }

})