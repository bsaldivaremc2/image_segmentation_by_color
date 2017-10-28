				var image_base = [];
		var mean =[ 141.79192861,   84.42496999,   87.68776449];
		var std = [ 39.57106448,  32.84341179,  35.01295388];
		var std_f = 0.6;

			$(function(){

				$('#stdFactor').change(function(){
					var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
					var image_data = imgData.data;
					std_f = parseFloat($('#stdFactor').val());
					var base_update = listDataToRGBI(image_base,mean,std,std_f);
		    		copy_list_to_data(image_data,base_update);  
		    		ctx.putImageData(imgData, 0, 0);
				});
				$('#rm').change(function(){
					update_means('rm',0);
				});
				$('#gm').change(function(){
					update_means('gm',1);
				});
				$('#bm').change(function(){
					update_means('bm',2);
				});
				$('#rs').change(function(){
					update_std('rs',0);
				});
				$('#gs').change(function(){
					update_std('gs',1);
				});
				$('#bs').change(function(){
					update_std('bs',2);
				});
				function update_means(iId,pos)
				{
					var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
					var image_data = imgData.data;
					mean[pos] = parseFloat($('#'+iId).val());
					var base_update = listDataToRGBI(image_base,mean,std,std_f);
		    		copy_list_to_data(image_data,base_update);  
		    		ctx.putImageData(imgData, 0, 0);
				}
				function update_std(iId,pos)
				{
					var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
					var image_data = imgData.data;
					std[pos] = parseFloat($('#'+iId).val());
					var base_update = listDataToRGBI(image_base,mean,std,std_f);
		    		copy_list_to_data(image_data,base_update);  
		    		ctx.putImageData(imgData, 0, 0);
				}

			});

		function copy_image_data(iImageData)
		{
			var data = iImageData;
			var img_len = data.length;
			var base_data = [];
			for (_=0;_<img_len;_=_+1)
			{
				base_data[_] = data[_];
			}
			return base_data;
		}
		function copy_list_to_data(iImageData,list)
		{
			var data = iImageData;
			var img_len = data.length;
			for (_=0;_<img_len;_=_+1)
			{
				data[_] = list[_];
			}
		}
		function listDataToRGBI(iImageData,rgb_mean,rgb_std,std_f)
		{
			var data = iImageData;
			var result = [];
			var img_len = data.length;
			var r_l =rgb_mean[0]-rgb_std[0]*std_f;
			var r_h =rgb_mean[0]+rgb_std[0]*std_f;
			var g_l =rgb_mean[1]-rgb_std[1]*std_f;
			var g_h =rgb_mean[1]+rgb_std[1]*std_f;
			var b_l =rgb_mean[2]-rgb_std[2]*std_f;
			var b_h =rgb_mean[2]+rgb_std[2]*std_f;
			for (_=0;_<img_len;_=_+4)
			{
				r=data[_];
				g=data[_+1];
				b=data[_+2];
				if ( (interval_eval(r,r_l,r_h)==false) || (interval_eval(g,g_l,g_h)==false) || (interval_eval(b,b_l,b_h)==false) )
				{
					result[_]=0;
					result[_+1]=0;
					result[_+2]=0;
					result[_+3]=data[_+3];
				}
				else
				{
					result[_]=data[_];
					result[_+1]=data[_+1];
					result[_+2]=data[_+2];
					result[_+3]=data[_+3];
				}
			}
			return result;
		}
		function imgDataToRGBI(iImageData,rgb_mean,rgb_std,std_f)
		{
			var data = iImageData;
			var img_len = data.length;
			var r_l =rgb_mean[0]-rgb_std[0]*std_f;
			var r_h =rgb_mean[0]+rgb_std[0]*std_f;
			var g_l =rgb_mean[1]-rgb_std[1]*std_f;
			var g_h =rgb_mean[1]+rgb_std[1]*std_f;
			var b_l =rgb_mean[2]-rgb_std[2]*std_f;
			var b_h =rgb_mean[2]+rgb_std[2]*std_f;
			for (_=0;_<img_len;_=_+4)
			{
				r=data[_];
				g=data[_+1];
				b=data[_+2];
				if ( (interval_eval(r,r_l,r_h)==false) || (interval_eval(g,g_l,g_h)==false) || (interval_eval(b,b_l,b_h)==false) )
				{
					data[_]=0;
					data[_+1]=0;
					data[_+2]=0;

				}
				else
				{
					//data[_]=255;
					//data[_+1]=255;
					//data[_+2]=255;
				}
			}
			//return data;
		}
		function interval_eval(iN,ln,hn)
		{
			if ((iN>ln) && (iN<hn))
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		function goclone(source) {
			    if (Object.prototype.toString.call(source) === '[object Array]') {
			        var clone = [];
			        for (var i=0; i<source.length; i++) {
			            clone[i] = goclone(source[i]);
			        }
			        return clone;
			    } else if (typeof(source)=="object") {
			        var clone = {};
			        for (var prop in source) {
			            if (source.hasOwnProperty(prop)) {
			                clone[prop] = goclone(source[prop]);
			            }
			        }
			        return clone;
			    } else {
			        return source;
			    }
			}
var imageLoader = document.getElementById('imageLoader');
		    imageLoader.addEventListener('change', handleImage, false);
		var canvas = document.getElementById('imageCanvas');
		var ctx = canvas.getContext('2d');
		function handleImage(e){
		    var reader = new FileReader();
		    reader.onload = function(event){
		        var img = new Image();
		        img.onload = function(){
		            canvas.width = img.width;
		            canvas.height = img.height;
		            ctx.drawImage(img,0,0);

		    //var imgData = context.getImage     
		    	var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
		    	
		    	var image_data = imgData.data;
		    	//Save a copy of the image
		    	image_base = copy_image_data(image_data);

		    	
		    	//console.log(image_data);
				mean = [parseFloat($('#rm').val()),parseFloat($('#gm').val()),parseFloat($('#bm').val())];
				std = [parseFloat($('#rs').val()),parseFloat($('#gs').val()),parseFloat($('#bs').val())];
				std_f = parseFloat($('#stdFactor').val());

		    	var base_update = listDataToRGBI(image_data,mean,std,std_f);
		    	copy_list_to_data(image_data,base_update);
				//console.log(image_data);	    
		    	ctx.putImageData(imgData, 0, 0);
		    	//console.log(image_base);
		        }
		        img.src = event.target.result;



		    }
		    reader.readAsDataURL(e.target.files[0]);

		 	   
		    
		}
