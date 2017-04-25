$(function(){
    //编辑框复位、确定、关闭事件在common.js中
    $('.ya li b').on('click',function(){
        $('.bj').remove();
        var state=$(this).attr('state');
        if(state=="1"||state=="2"){ //缺失、拔牙状态
            return false;
        }
        var parent=$(this).closest('li')
        var xs=parent.find('.fjxs'); //判断之前是否有值
        createBj(parent);
        if(xs.length>0){
            $('input[name=SpliceAdd]').val(xs.find('.xs1').text());
            $('input[name=SpliceReduce]').val(xs.find('.xs2').text());
        }
    })


    //创建编辑框函数
    createBj=function(target){
        var htm='';
        htm='<div class="fjbj bj">'+
            '<div class="bj-box">'+
            '<span class="close"></span>'+
            '<div class="write">'+
            '<input type="text" value="" name="SpliceAdd" class="n1">'+
            '<span>(+)</span>'+
            '<input type="text" value="" name="SpliceReduce" class="n2">'+
            '<span>(-)</span>'+
            '</div>'+
            '<div class="fuwei btn">复位</div>'+
            '<div class="submit btn">确定</div>'+
            '</div>'+
            '<div class="bj-line"></div>'+
            '</div>';
        $(htm).appendTo(target);
    }

    $('.pageBtn').on('click',function(){
        commonNextStep("0");
        if($(this).hasClass('back')){ //返回上一步进行保存 不发送请求
            window.location.href="index.html";
            return false;
        }
        api.TeethAttach(InitPageData,success,error);

    })

    function success(data){
        if(data.code!=200){
            alert(data.message);
            return false;
        }
        alert(data.message);
        window.location.href="glaze.html";
    }

    function error(data,option){
        alert(option.opertionType+"请求失败")
    }
})
