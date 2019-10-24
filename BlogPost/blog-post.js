let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser"); //to obtain items from body and not from params exclusively
let uuid = require('uuid/v4');
let app = express();
let jsonParser = bodyParser.json();


app.use(express.static('public'));
app.use(morgan("dev"));

let npost = [{
	id: uuid(),
	title:"TestOne",
	content: "test one content bla bla",
	author: "Roberto Bernal",
	publishDate: new Date(2019,10,23)
	
},{
	id: uuid(),
	title:"TestTwo",
	content: "test two content bla bla",
	author: "Ivan Dominguez",
	publishDate: new Date(2018,10,20)
	
},{
	id: uuid(),
	title:"TestThree",
	content: "test three content bla bla",
	author: "Samuel Varela",
	publishDate: new Date(2019,01,23)
	
}];


app.get("/api/blog-posts", (req, res, next) =>{
	
	return res.status(200).json(npost);
	
});

app.get("/api/blog-post", (req,res, next) => {
	let author = req.query.author;
	var authorposts = [];
	var flagfound = 0;
	var i;
	if(author == ""){
		res.statusMessage = "Missing author in params";
		return res.status(406).json({message: "Post author missing in params", status: 406});
		
	}
	author = author.trim().replace(/ /g, '%20');
	//console.log(author);
	for (i in npost)
	{
		if(author == npost[i].author.trim().replace(/ /g, '%20')){
			authorposts.push(npost[i]);
			flagfound = 1;
		}
	}
	if(flagfound){
		return res.status(200).json(authorposts);
	}
	else{
		res.statusMessage = "Author not found";
		return res.status(404).json({message: "Author not found " +  npost[0].author.trim().replace(/ /g, '%20') + " " + author, status:404});
	}
	
	
});

app.post("/api/blog-posts", jsonParser, (req,res,next) =>{
	let title = req.body.title;
	let content = req.body.content;
	let author = req.body.author;
	let pubdate = req.body.publishDate;
	var element = {};
	if(title == "" || content == "" || author == "" || pubdate == ""){
		res.statusMessage = "Param missing in body";
		return res.status(406).json({message: "Param missing in body", status:406}); 
	}
	
	element.id = uuid();
	element.title = title;
	element.content = content;
	element.author = author;
	element.publishDate = new Date(pubdate);
	
	npost.push(element);
	return res.status(201).json(element);
	
});

app.delete("/api/blog-posts/:id", (req,res,next) =>{
	let id = req.params.id;
	var i;
	
	for(i in npost){
		if(id == npost[i].id)
		{
			npost.splice(i,1);
			return res.status(200).json({message:"Post deleted" ,status: 200});
		}
		
	}
	res.statusMessage = "Id not found";
	return res.status(404).json({message: "Id not found", status: 404});
	
});


app.put("/api/blog-posts/:id", jsonParser, (req,res,next) => {
	let idcmp = req.params.id;
	let id = req.body.id;
	let title = req.body.title;
	let content = req.body.content;
	let author = req.body.author;
	let pubdate = new Date(req.body.publishDate);
	var i;
	if(idcmp == ""){
		res.statusMessage = "Id param missing";
		return res.status(406).json({message: "Id param missing", status: 406});
	}
	
	if(idcmp != id)
	{
		res.statusMessage = "Id from param is different from Id sent";
		return res.status(409).json({message: "Id from param is different from Id sent", status: 409});
	}
	
	for(i in npost){
		if(id == npost[i].id)
		{
			npost[i].title = title;
			npost[i].content = content;
			npost[i].author = author;
			npost[i].publishDate = pubdate;
			return res.status(202).json(npost[i]);
		}
		
		
	}
	res.statusMessage = "Id not found in posts";
	return res.status(404).json({message: "Id not found in posts", status: 404});
	
});


app.listen("8080",() => {
	console.log("App is running on port 8080");
	
});