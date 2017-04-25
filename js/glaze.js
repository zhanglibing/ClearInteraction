$(function(){
    $('.ya li b').on('click',function(e){
        $('.bj').remove();
        var state=$(this).attr('state');
        if(state=="1"||state=="2"){ //缺失拔牙
            return false;
        }
        var w=$(this).width();   //该牙齿的宽度
        var order=$(this).closest('li').index(); //当前点击对应牙齿的序号
        if(e.offsetX>= w/2){//判断点击牙齿的左右位置
            order=order+1
        }
        var newli=$('.ya li').eq(order);//对应显示值、编辑框得牙
        var length=newli.find('.qybj').length;//用来判断是否已有编辑框
        if(length=='0'){
            createBj(order);//没有编辑框时创建一个编辑框
        }
        var xs=newli.find('.qyxs'); //用来判断之前是否有值
        var newXs=newli.find('.qybj');//编辑框
        if(xs.length>0){//将显示值赋值到编辑框
            newXs.find('.n1').val(xs.find('.xs1').text());
            newXs.find('.n2').val(xs.find('.xs2').text());
        }
    })

    //创建编辑框函数
    createBj=function(order){
        var parent=$('.ya li').eq(order);//编辑框要插入的父元素
        var htm='';
        htm='<div class="qybj bj">'+
            '<div class="bj-box">'+
            '<span class="close"></span>'+
            '<div class="write">'+
            '<input type="text" value="" name="GlazeLength" class="n1">'+
            '<span>mm(</span>'+
            '<input type="text" value="" name="Step" class="n2">'+
            '<span>)</span>'+
            '</div>'+
            '<div class="fuwei btn">复位</div>'+
            '<div class="submit btn">确定</div>'+
            '</div>'+
            '<div class="bj-line"></div>'+
            '</div>';
        $(htm).appendTo(parent);
    }
    $('.pageBtn').on('click',function(){
        commonNextStep(1);
        if($(this).hasClass('back')){ //返回上一步进行保存 不发送请求
            window.location.href="attach.html";
            return false;
        }
        api.TeethGlaze(InitPageData,success,error);

    })

    function success(data){
        if(data.code!=200){
            alert(data.message);
            return false;
        }
        alert(data.message);
        window.location.href="hemian.html";
    }

    function error(data,option){
        alert(option.opertionType+"请求失败")
    }
})