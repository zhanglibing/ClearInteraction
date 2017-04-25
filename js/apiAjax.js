var apiAjax = function() {
	var self = this;
	this.host = 'http://www.clearbos.com';
    // this.host = 'http://localhost:39571'; //本地调试
	this.post = function (options, success, error) {
		$.ajax({
			type: "POST",
			url: self.host + options.path+"?opertionType="+options.opertionType,
			data:JSON.stringify(options.params),
			contentType: "application/json",
			success: function (msg) {
				msg = eval("(" + msg + ")"); //将后台返回值转化为json对象格式
				success(msg, options);
			},
			error: function (msg) {
				msg = eval("(" + msg + ")");
				error(msg, options);
			}
		});
	}
	this.TeethStatus = function (params, success, error) {//牙列状态
		var options = {
			path: '/ClinicalOpRequirements.ashx',
            opertionType:'TeethChangeStatus',
			params: params
		}
		this.post(options, success, error);
	}
	this.TeethAttach = function (params, success, error) {//附件粘接
		var options = {
			path:'/ClinicalOpRequirements.ashx',
            opertionType:'TeethAdhesive',
			params: params
		}
		this.post(options, success, error);
	}
	this.TeethGlaze = function (params, success, error) {//邻面去釉
		var options = {
			path: '/ClinicalOpRequirements.ashx',
            opertionType:'TeethExceptlGlaze',
			params: params
		}
		this.post(options, success, error);
	}
	this.TeethOcclusal = function (params, success, error) {//合面调整
		var options = {
			path: '/ClinicalOpRequirements.ashx',
            opertionType:'TeethOcclusalAdjustment',
			params: params
		}
		this.post(options, success, error);
	}
	this.TeethTraction = function (params, success, error) {//颌位牵引
		var options = {
			path: '/ClinicalOpRequirements.ashx',
            opertionType:'TeethFrontalTraction',
			params: params
		}
		this.post(options, success, error);
	}
	this.TeethWork = function (params, success, error) {//生产加工
		var options = {
			path: '/ClinicalOpRequirements.ashx',
            opertionType:'ProductionProccessA',
			params: params
		}
		this.post(options, success, error);
	}
	this.TeethWorkRAndT = function (params, success, error) {//保持器和模版:
		var options = {
			path: '/ClinicalOpRequirements.ashx',
            opertionType:'ProductionProccessRAndT',
			params: params
		}
		this.post(options, success, error);
	}
}
var api=new apiAjax();
