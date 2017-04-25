//获取数据
    var data=[{Header: {},Detail:[]},
             {Header: {},Detail: []},
             {Header: {},Detail: []},
             {Header: {},Detail: []},
             {Header: {},Detail: []},
             {Header: {},Detail: []},
             {Header: {},Detail: []}];
    if(localStorage.data){
        data=JSON.parse(localStorage.data);
    }else{
        localStorage.data=JSON.stringify(data);
    }
    console.log(data)
    //数据保存
    var maxillofacial=["近中颊尖","近中舌尖" ,"远中颊尖","远中舌尖","近中边缘嵴","远中边缘嵴","近中窝","远中窝"]; //用来判断颌面编辑框中的显示位置
    var process=["MaxillaryStepFrom","MaxillaryStepTo","MandibleStepFrom","MandibleStepTo"]; //矫治器 input框name数组
    var model=["MaxillaryStep","MandibleStep"]; //保持器、模板input框name值数组
    var typeXs=["fjxs","qyxs","thxs"]
    var RemarkBox=$('textarea[name=Remark]'); //用来判断当前页面是否有特殊说明
    var CaseNumber="201602120006";
    var Operator="18221105830";
    var state=$('.ff').attr('state');
    var i=parseInt(state)-1;
    // var type=["fjxs","qyxs","thxs"]; //显示类型
    var InitPageData = data[i-1];//当前页面主表信息

    var parentLi=$('.ya li'); //事件委托父元素

    /*********************************编辑框事件****************************************/
    //关闭编辑框
    parentLi.on('click','.bj .close',function(){
        $(this).closest('.bj').remove();
        return false;
    })

    //编辑框提交、确认
    parentLi.on('click','.submit',function(){
        var parent=$(this).closest('li');
        addAttr(parent);
        $('.bj').remove();
        return false;
    })
    //编辑框复位、归0
    parentLi.on('click','.fuwei',function(){
        var index=parseInt(state)-3;
        var parent=$(this).closest('li');
        parent.find('.'+typeXs[index]).remove();
        $('input').val('');
        parent.removeClass("active");
        return false;
    })


    function addAttr(target){
        var index=i-2;
        var val1,val2;
        var input=$('input');
        if(state=="5"){ //颌面调整
            val1 = $.trim($('.selected .n1').val()) ;
            val2 = $.trim($('.selected .n2').text());
        }else{
            val1=input.eq(0).val();
            val2=input.eq(1).val();
        }
        if(val1==""||val2==""){
            return false
        }
        target.find('.'+typeXs[index]).remove();
        createBlock(target,val1,val2);
    }
    //创建附件、去釉、颌面调整显示值得html函数
    createBlock=function(target,a,b,type){
        var type=type?type:state;
        var active='';  //当前页面全部显示
        if(type==state){
            target.addClass('active');
            active="active";
        }
        var htm='';
        if(type=="3"){
            htm='<div class="fjxs xs '+active+'">'+
                '<p class="val"><span class="xs1">'+a+'</span>+<span class="xs2">'+b+'</span>-</p>'+
                '<div class="xian"></div>'+
                '<span class="img"></span>'+
                '</div>';
        }
        if(type=="4"){
            htm='<div class="qyxs xs '+active+'">'+
                '<p class="val"><span class="xs1">'+a+'</span>mm(<span class="xs2">'+b+'</span>)</p>'+
                '<div class="xian"></div>'+
                '<span class="img"></span>'+
                '</div>';
        }
        if(type=="5"){
            var status;
            $.each(maxillofacial,function(i,v){
               if(v==b){ //根据值赋值状态
                   status=i+1;
               }
            })
           htm='<div class="thxs xs '+active+'">'+
               '<p class="val"><span class="xs1">'+a+'</span>mm<span class="xs2" data-status="'+status+'">'+b+'</span></p>'+
               '<div class="xian"></div><span class="img"></span>'+
               '</div>'
        }
        active='';
        $(htm).appendTo(target);
    }

    //创建牵引显示html函数
    createHtmlQian=function(order,val){
        var fu=$('.ya li').eq(order).find('b');
        if(fu.find('.qianyin').length==0){
            $('<div class="qianyin"><span>'+val+'</span></div>').appendTo(fu);
        }

    }
    //渲染牵引数据
    renderQian=function(obj){
        if(obj.length==0){
            return false;
        }
        $('.qianyin').remove();
        var arr=objToArray(obj); //将牵引值对应的牙位下标字符串转化为二维数组
        $.each(arr,function(i,v){
             $.each(v,function(index,item){
                 createHtmlQian(item,i+1)
             })
        })

    }

    //缺失、拔牙显示html、添加状态函数
    BQya=function(array){ //state：状态{1:拔牙  2:缺失}
        $('.ya li b').attr("state","0"); //设置初始默认状态值
        $.each(array,function (index,v) {
            var parent = $('.ya li').eq(parseInt(v.ToothId)).find('b');
            if(v.ToothStatus=="1"){
                $('<span class="ba"></span>').appendTo(parent);
                parent.attr('state','1');
            }else{
                parent.addClass('que')
                parent.attr('state','2');
            }
        })
    }

    /**********************************加工单html创建、赋值函数****************************************/
    //创建加工单html函数
    createHtm=function(){
        var htm='';
        htm='<ul class="contain1">'+
            '<li class="col d-2 ">生产批次</li>'+
            '<li class="col d-4 ProcessBatchNo"></li>'+
            '<li class="col d-3">到期日期</li>'+
            '<li class="col d-3 right-no ExpireDate"></li>'+
            '<li class="col d-2 bottom-no">'+
            '<ul>'+
            '<li >&nbsp;</li>'+
            '<li>上颌</li>'+
            '<li>下颌</li>'+
            '<li class="b">型号</li>'+
            '</ul>'+
            '</li>'+
            '<li class="col d-4 bottom-no">'+
            ' <ul class="correct">'+
            '<li>矫治器（-A）</li>'+
            '<li>从 <input type="text" name="MaxillaryStepFrom" class="xiao"> 步(含)至<input type="text" name="MaxillaryStepTo" class="xiao">步(含)</li>'+
            '<li>从<input type="text" name="MandibleStepFrom" class="xiao">步(含)至<input type="text" name="MandibleStepTo" class="xiao">步(含)</li>'+
            '<li class="b model">'+
            '<p class="col d-6"><input type="checkbox" name="ModeNumber" value="CM-I-R-050" />CM-I-R-050 </p>'+
            '<p class="col d-6"><input type="checkbox" name="ModeNumber" value=" CM-I-R-625" /> CM-I-R-625 </p>'+
            '<p class="col d-6"><input type="checkbox" name="ModeNumber" value="CM-I-R-750" />CM-I-R-750 </p>'+
            '<p class="col d-6"><input type="checkbox" name="ModeNumber" value="CM-I-R-100" />CM-I-R-100 </p>'+
            '</li>'+
            '</ul>'+
            '</li>'+
            '<li class="col d-3 bottom-no">'+
            '<ul class="keep">'+
            '<li>保持器（-R）</li>'+
            '<li>第<input type="text" name="MaxillaryStep" class="da">步 </li>'+
            '<li>第<input type="text" name="MandibleStep" class="da">步 </li>'+
            '<li class="b model">'+
            '<p><input type="checkbox"  name="ModeNumber" value="CM-I-R-750" />CM-I-R-050 </p>'+
            '<p><input type="checkbox" name="ModeNumber" value="CM-I-R-100" />CM-I-R-100</p>'+
            '</li>'+
            '</ul>'+
            '</li>'+
            '<li class="col d-3 right-no bottom-no">'+
            '<ul class="template">'+
            '<li>模版（-T）</li>'+
            '<li>第<input type="text" name="MaxillaryStep" class="da">步 </li>'+
            '<li>第<input type="text" name="MandibleStep" class="da">步 </li>'+
            '<li class="b model">'+
            '<p><input type="checkbox" name="ModeNumber" value="CM-I-R-750" />CM-I-R-050 </p>'+
            '</li>'+
            '</ul>'+
            '</li>'+
            '</ul>'
        $(htm).appendTo('.contain-box');
    }

    renderwork=function(data1){
        $('.contain-box').empty();
        for(var i=0;i<data1.length;i++){
            createHtm();
            $('.ProcessBatchNo').eq(i).text(data1[i].ProcessBatchNo) //批次号赋值
            $('.ExpireDate').eq(i).text(data1[i].ExpireDate)  //到期日期赋值
        }


    }
    //渲染矫治器、保持器、模板值
    workValue=function(array,arr2,type1){
        $(type1).each(function(j,v){
            var that=$(this);
            $.each(arr2,function(index,val){
                that.find("input[name="+val+"]").val(array[j][val]);
            })
            var newarray=array[j].ModeNumber.split("-"); //将字符串转化为数组
            $.each(newarray,function(i,val){
                that.find("input[name='ModeNumber']").eq(val).prop("checked",true)
            })

        })
    }

    /****************************************操作说明、特殊说明****************************************/
    $('.operation-btn').on('click',function(){
        $(this).addClass('active');
        $(this).closest('.operation').addClass('active').find('.operation-con').addClass('active');
    })
    $('.operation-con .off').on('click',function(){
        $(this).closest('.operation-con').removeClass('active');
        $('.operation-btn').removeClass('active');
        $(this).closest('.operation').removeClass('active')
    })
    //特殊说明提交
    $('.operation-con .btnG').on('click',function(){
        var content=$(this).closest('.operation-con').find('textarea').val();
        $(this).closest('.operation-con').removeClass('active');
        $('.operation-btn').removeClass('active');
        $(this).closest('.operation').removeClass('active')
    })


    /**********************************渲染整个页面**********************************************/
    render=function(data){
        $.each(data,function(index,v){
            switch (index) {
                case 0:
                    BQya(v.Detail);
                    break;
                case 1://附件
                    $.each(v.Detail,function(index,v){
                        var parent=$('.ya li').eq(v.ToothId);
                        var a=v.SpliceAdd;
                        var b=v.SpliceReduce;
                        var type="3";
                        createBlock(parent,a,b,type);
                    })
                    break;
                case 2: //去釉
                    $.each(v.Detail,function(index,v){
                        var parent=$('.ya li').eq(v.ToothId);
                        var a=v.GlazeLength;
                        var b=v.Step;
                        var type="4";
                        createBlock(parent,a,b,type);
                    })
                    break;
                case 3://颌面
                    $.each(v.Detail,function(index,v){
                        var parent=$('.ya li').eq(v.ToothId);
                        var a=v.ReconcileLength;
                        var b=maxillofacial[parseInt(v.AdjustType)-1];
                        var type="5";
                        createBlock(parent,a,b,type);
                    })
                    break;
                case 4:
                    renderQian(v.Detail);
                    break;
                case 5:
                    if(v.Detail.length<=0||i<6){
                        return false;
                    }
                    renderwork(v.Detail);
                    workValue(v.Detail,process,".correct");
                    break;
                case 6:
                    if(v.Detail.length<=0||i<6){
                        return false;
                    }
                    var length=v.Detail.length/2; //用于分割数组
                    workValue(v.Detail.slice(0,length),model,".keep");
                    workValue(v.Detail.slice(length),model,".template");
                    break;
            }

        })
    }
    render(data);
    if(InitPageData.Header.Remark!=undefined){ //显示特殊说明
        RemarkBox.val(InitPageData.Header.Remark);
    }


    /********************************Common方法 键值对******************************************/

    function NextStep(){
         var obj=InitPageData.Header;
         obj.CaseNumber=CaseNumber;
         obj.Operator=Operator;
         if(RemarkBox.length>0){
          obj.Remark=RemarkBox.val();
         }
         if(state!="6"){ //牵引
          InitPageData.Detail=[]; //每次清空InitPageData.Detail
         }
    }

    /***************************附件、去釉、颌面提交、下一步公用函数*************************************/
    function commonNextStep(Indexing){
        var ind=parseInt(Indexing);
        var arr=[["SpliceAdd","SpliceReduce"],["GlazeLength","Step"],["ReconcileLength","AdjustType"]]
        NextStep();
        $(".ya li[class='active']").each(function(index,v){
            var i=$(this).index();
            var block=$(this).find('.'+typeXs[ind]);
            var val1=parseInt(block.find('.xs1').text());
            if(ind==2){
                var val2=block.find('.xs2').attr('data-status');
            }else{
                var val2=parseInt(block.find('.xs2').text());
            }
            var obj = {};
            obj.ToothId=i;
            obj[arr[ind][0]]=val1;
            obj[arr[ind][1]]=val2;
            InitPageData.Detail.push(obj);
        })
        data=data.replace(data,ind+1,InitPageData); //跟新最新数据
        localStorage.data=JSON.stringify(data); //保存到本地
    }
   /*********************************数组原型链添加方法*******************************************/
    //数组去重方法
    Array.prototype.unique1 = function(){
        var res = [];
        var json = {};
        for(var i = 0; i < this.length; i++){
            if(!json[this[i]]){
                res.push(this[i]);
                json[this[i]] = 1;
            }
        }
        return res;
    }
    //替换数组中指定的索引的值
    Array.prototype.replace = function(array,index,val){
        var oldArray = array;
        var newArray = [];
        for(var i = 0; i < this.length; i++){
            if(i==index){
                newArray.push(val);
            }else{
                newArray.push(oldArray[i])
            }
        }
        return newArray;
    }
    //删除数组中指定的值
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    //数组存储对象转化为数组存储数组 (牵引中用到)
    function objToArray(oldArray){
        var ThoothArray=[];
        $.each(oldArray,function(index,v){
            var strArray=v.ThoothIndex.split("-");
            ThoothArray.push(strArray)
        })
        return ThoothArray;
    }

