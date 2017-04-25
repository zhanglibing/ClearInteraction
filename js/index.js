$(function(){
//    牙齿点击事件
    var thooth=$('.ya li b');
    thooth.on('click',function(){
        var order=$(this).closest('li').index();
        changeYa(order)
    })
    //改变牙齿状态函数
    changeYa=function(order){
        var parent=$('.ya li').eq(order).find('b');
        var state=parent.attr('state');  //0:正常；1：拔牙; 2:缺失 3:附件
        if(state=='0'){
            $('<span class="ba"></span>').appendTo(parent);
            parent.attr('state','1');
        }
        if(state=='1'){
            parent.find('span').removeClass('ba');
            parent.addClass('que')
            parent.attr('state','2');
        }
        if(state=='2'){
            parent.removeClass('que').empty();
            parent.attr('state',"0");
        }

    }

    $('.guide1').on('click',function(){
        NextStep();
        $(".ya").find("li b").each(function(i){
            if($(this).attr("state")!="0"){
                var obj = {};
                obj.ToothId=i;
                obj.ToothStatus=$(this).attr("state");
                InitPageData.Detail.push(obj);
            }
        })
        data=data.replace(data,0,InitPageData);
        localStorage.data=JSON.stringify(data);
        api.TeethStatus(InitPageData,success,error);


    })

    function success(data){
        if(data.code!=200){
            alert(data.message);
            return false;
        }
        alert(data.code);
        window.location.href="attach.html";
    }

    function error(data,option){
        alert(option.opertionType+"请求失败")
    }

})