$(function(){
    //编辑框复位、确定、关闭事件、显示值函数在common.js中
    //新增表
    $('.add').on('click',function(){
        createHtm();

    })
    var params1=data[6]; //保持器/模板
    $('.pageBtn').on('click',function(){
        NextStep();
        params1.Header=InitPageData.Header;
        InitPageData.Detail=setObject(process,[".correct"],InitPageData.Detail);//分别设置三个Detail值
        params1.Detail=setObject(model,[".keep",".template"],params1.Detail);

        data=data.replace(data,5,InitPageData);//分别替换data存储的对应值
        data=data.replace(data,6,params1);
        localStorage.data=JSON.stringify(data); //保存到本地
        if($(this).hasClass('back')){ //返回上一步进行保存 不发送请求
            window.location.href="traction.html";
            return false;
        }
        api.TeethWork(InitPageData,success,error); //发送请求
        // //清空本地缓存
        // localStorage.data=JSON.stringify([
        // 	     {Header: {},Detail:[]},  //压列状态
        //          {Header: {},Detail: []}, //附件
        //          {Header: {},Detail: []}, //去釉
        //          {Header: {},Detail: []}, //颌面
        //          {Header: {},Detail: []}, //牵引
        //          {Header: {},Detail: []},  //加工
        //          {Header: {},Detail: []},  //保持器、模板
        //          ]);
    })

    //设置Detail数组对象
    function setObject(array,typeArrary,objArray){ //array:要添加键名数组 、typeArrary:加工、保持器和模板区分数组  objArray：被添加数组
        var flag=false;
        if(typeArrary.length==2){ //判断为保持器和、模板情况
            flag=true;
        }
        $.each(typeArrary,function(ii,vv){
            $(typeArrary[ii]).each(function(j,v){
                var that=$(this);
                var obj = {};
                obj.ProcessBatchNo=$('.ProcessBatchNo').eq(j).text(); //批次号
                obj.ExpireDate=$('.ExpireDate').eq(j).text();
                if(flag){//保持器和、模板情况时
                    if(ii==0){
                        obj.ProductionType="ProccessR";
                    }else{
                        obj.ProductionType="ProccessT";
                    }
                }
                //input值
                $.each(array,function(index,val){
                    obj[val]=parseInt(that.find("input[name="+val+"]").val());
                })
                //类型对应选中索引转化为字符串
                var str="";
                that.find("input[name='ModeNumber']").each(function(index,v){
                    if($(this).is(':checked')){
                        str+=index+"-";
                    }
                })
                str = str.substr(0, str.length - 1);
                obj.ModeNumber=str;

                objArray.push(obj)
            })

        })

        return objArray;
    }


    function success(data){
        if(data.code!=200){
            alert(data.message);
            return false;
        }
        alert(data.code);
        api.TeethWorkRAndT(params1,Rtsuccess,error);
    }

    function Rtsuccess(data){
        if(data.code!=200){
            alert(data.message);
            return false;
        }
        alert(data.code);
    }

    function error(data,option){
        alert(option.opertionType+"请求失败")
    }

})