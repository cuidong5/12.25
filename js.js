var http=require('http')
var querystring=require('querystring')
var fs=require('fs')
var logg={}
//注册
http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var str=''
	req.on('data',function(da){
		str+=da
	})
	req.on('end',function(){
		var json=querystring.parse(str)
		fs.readFile('./logg.txt','utf-8',function(err,data){
			if(err)console.log(err)
			logg=eval('('+data+')')
		if(logg[json.user]){
			res.write('用户名已存在')
			res.end()
		}else{
			logg[json.user]=json.pass
			fs.writeFile('logg.txt',JSON.stringify(logg),function(err){
				if(err){
					console.log(err)
				}
				res.write('注册成功')
				res.end()
			})
		}
		})
	})		
}).listen(8888)
//登陆
http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var str=''
	req.on('data',function(da){
		str+=da
	})
	req.on('end',function(){
		var json=querystring.parse(str)
		fs.readFile('./logg.txt','utf-8',function(err,data){
			if(err)console.log(err)
			logg=eval('('+data+')')
			
		if(logg[json.user]){
			if(logg[json.user]==json.pass){
				res.write('登陆成功')
			}else{
				res.write('密码错误')
			}
		}else{
			res.write('用户名不存在')
		}
		res.end()
		})
	})
}).listen(8001)
//发布
http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*')
	var str=''
	req.on('data',function(da){
		str+=da
	})
	req.on('end',function(){
		var json=querystring.parse(str)
		fs.writeFile('wenzhang.txt','标题：'+json.user+'<br>'+'内容：'+json.pass,function(err){
			if(err){
				console.log(err)
			}
			console.log('ok')
			res.write('ok')
			res.end()
		})
	})
}).listen(8002)

//详情
http.createServer(function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	var str = ''
	req.on('data',function(da){
		str += da
	})
	req.on('end',function(){
		var json = querystring.parse(str)
		fs.readFile('./wenzhang.txt','utf-8',function(err,data){
		if(err){
			console.log(err)
			return
		}
		res.write(data)
		res.end()
	})
	})
	
}).listen(8003)