$(function(){
    //编辑框复位、确定、关闭事件、显示值函数在common.js中
    $('.ya li b').on('click',function(){
        $('.bj').remove();
        var state=$(this).attr('state');
        if(state=="1"||state=="2"){
            return false;
        }
        var li=$(this).closest('li');
        createBj(li);
        var xs=li.find('.thxs'); //判断之前是否有值
        if(xs.length>0){
            li.find('.write').removeClass('active selected');
            $.each(maxillofacial,function(index,v){
                if(v==xs.find('.xs2').text()){
                    li.find('.write').eq(index).addClass('active selected');
                }
            })
           $('.selected').find('.n1').val(xs.find('.xs1').text());
        }
    })

    //类型选择
    $('.ya li').on('click','.write .n2',function(){//事件委托
        $('.write').removeClass('active selected');
        $(this).closest('.write').addClass('active selected');
        return false;
    })

    // ************************创建编辑框函数开始**********************/
    createBj=function(target){
        var htm='';
        htm='<div class="thbj bj">'+
            '<div class="bj-box">'+
            '<span class="close"></span>'
            + createPort(maxillofacial)+
            '<div style="clear: both"></div>'+
            '<div class="fuwei btn">复位</div>'+
            '<div class="submit btn">确定</div>'+
            '</div>'+
            '<div class="bj-line"></div>'+
            '</div>';
        $(htm).appendTo(target);
        $('.write').eq(0).addClass('active selected')
    }
    function createPort(repeatArrary){
        var htm='';
        $.each(repeatArrary,function(index,val){
          htm+= '<div class="write">'+
                '<input type="text" value="" class="n1">'+
                '<span class="danwei">(mm)</span>'+
                '<span class="n2" data-status="'+(index+1)+'">'+val+'</span>'+
                '</div>'
        })
        console.log(htm)
        return htm;
    }
    // ************************创建编辑框结束**********************/

    $('.pageBtn').on('click',function(){
        commonNextStep(2);
        if($(this).hasClass('back')){ //返回上一步进行保存 不发送请求
            window.location.href="glaze.html";
            return false;
        }
        api.TeethOcclusal(InitPageData,success,error);
    })

    function success(data){
        if(data.code!=200){
            alert(data.message);
            return false;
        }
        alert(data.message);
        window.location.href="traction.html";
    }

    function error(data,option){
        alert(option.opertionType+"请求失败")
    }

})