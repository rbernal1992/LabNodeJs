function watchform(){
	$.ajax({
		url: "http://localhost:8080/api/blog-posts",
		method: "GET",
		dataType: "json",
		success: function(jsonResponse){
			var i;
			for(i in jsonResponse)
			{
			$('#listofPosts').append(`<li>
									 <div id= "title">	`+jsonResponse[i].title+`</div>
									 <div id= "content">	`+jsonResponse[i].content+`</div>
									 <div id= "author">	`+jsonResponse[i].author+`</div>
									 <div id= "pbdate">	`+jsonResponse[i].publishDate+`</div>
									  <div id= "delt">	`+jsonResponse[i].id+`</div>
									 <div>  <button id="deleteitm"> Delete </button></div>
									
									</li>`);
									console.log(jsonResponse);
			}
		},
		error: function(err){
			$('#listofPosts').append(`<li>Something went wrong, try again later </li>`);
			
		}
		
		
		
	});
	
	//add item--------------------------------------------------------------------------------------------------------------------------------------
	$('#submt').on("click",function(event){
		event.preventDefault();
		$.ajax({
			url: "http://localhost:8080/api/blog-posts/",
			data: JSON.stringify( {
					"title": $('#additemtitle').val(),
					"content": $('#additemcontent').val(),
					"author": $('#additemauthor').val(),
					"publishDate": $("#additempbdateyear").val() + "," + $("#additempbdatemonth").val() + "," + $("#additempbdateday").val()
			}),
			method: "POST",
			dataType: "json",
			contentType: "application/json",
			success: function(responseJson){
				$('#listofPosts').append(`<li>
									 <div id= "title">	`+responseJson.title+`</div>
									 <div id= "content">	`+responseJson.content+`</div>
									 <div id= "author">	`+responseJson.author+`</div>
									 <div id= "pbdate">	`+responseJson.publishDate+`</div>
									 <div id= "delt">	`+responseJson.id+`</div>
									 <div>  <button id="delete"> Delete </button></div>
									
									</li>`);
				//console.log(responseJson);
				
			},
			
			error: function(err){
				$('#listofPosts').append(`<li>Something went wrong, try again later </li>`);
				
				
			}
			
			
			
		});
		
		
	});
	//delete item---------------------------------------------------------------------------------------------
	
	$('#postLists').on('click', '#deleteitm', function(event){
		var id_todelete;
		var author = $(this).parent().parent().find('#author').html();
		author = author.trim().replace(/ /g, '%20');
		event.preventDefault();
		console.log(author);
		$.ajax({
			url: "http://localhost:8080/api/blog-post",
			data: {
				"author":$(this).parent().parent().find('#author').html()
			},
			method: "GET",
			dataType: "json",
			success: function(responseJson){
				id_todelete = responseJson[0].id;
				console.log(id_todelete);
			},
			error: function(err){
				$('#listofPosts').append(`<li>Something went wrong, try again later </li>`);
			},
			async: false,
		})
		
		$.ajax({
			url: "http://localhost:8080/api/blog-posts/"+id_todelete,
			method: "DELETE",
			dataType: "json",
			success: function(responseJson){
				$(this).parent().parent().remove();
				console.log(id_todelete);
				 $('ul').empty();
			},
			error: function(err){
				$('#listofPosts').append(`<li>Something went wrong, try again later </li>`);
				
				
			},
			async: false,
			
		
		})
		
		$.ajax({
		url: "http://localhost:8080/api/blog-posts",
		method: "GET",
		dataType: "json",
		success: function(jsonResponse){
			var i;
			
			for(i in jsonResponse)
			{
			$('#listofPosts').append(`<li>
									 <div id= "title">	`+jsonResponse[i].title+`</div>
									 <div id= "content">	`+jsonResponse[i].content+`</div>
									 <div id= "author">	`+jsonResponse[i].author+`</div>
									 <div id= "pbdate">	`+jsonResponse[i].publishDate+`</div>
									  <div id= "delt">	`+jsonResponse[i].id+`</div>
									 <div>  <button id="deleteitm"> Delete </button></div>
									
									</li>`);
									console.log(jsonResponse);
			}
		},
		error: function(err){
			$('#listofPosts').append(`<li>Something went wrong, try again later </li>`);
			
		}
		
		
		
	});
		
		
	})
	
	
	//modify item---------------------------------------------------------------------------------------------
	$("#modify").on("click",function(event){
		event.preventDefault();
		var success = 0;
		$.ajax({
			url: "/api/blog-posts/"+ $("#tomodifyid").val(),
			data: JSON.stringify({
				"id": $("#tomodifyid").val(),
				"title": $("#tomodifytitle").val(),
				"content": $("#tomodifycontent").val(),
				"author": $("#tomodifyauthor").val(),
				"publishDate": $("#tomodifypbdateyear").val() + "," + $("#tomodifypbdatemonth").val() + "," + $("#tomodifypbdateday").val()
				
			}),
			method: "PUT",
			dataType: "json",
			contentType: "application/json",
			success: function(responseJson){
				console.log(responseJson);
				 $('ul').empty();
				 success =1;
				
			},
			error: function(err){
				$('#listofPosts').append(`<li>Something went wrong, try again later </li>`);
				
				
			},
			
			async: false
			
			
		});
		if(success == 1){
		$.ajax({
		url: "http://localhost:8080/api/blog-posts",
		method: "GET",
		dataType: "json",
		success: function(jsonResponse){
			var i;
			
			for(i in jsonResponse)
			{
			$('#listofPosts').append(`<li>
									 <div id= "title">	`+jsonResponse[i].title+`</div>
									 <div id= "content">	`+jsonResponse[i].content+`</div>
									 <div id= "author">	`+jsonResponse[i].author+`</div>
									 <div id= "pbdate">	`+jsonResponse[i].publishDate+`</div>
									  <div id= "delt">	`+jsonResponse[i].id+`</div>
									 <div>  <button id="deleteitm"> Delete </button></div>
									
									</li>`);
									console.log(jsonResponse);
			}
		},
		error: function(err){
			$('#listofPosts').append(`<li>Something went wrong, try again later </li>`);
			
		}
		
		
		
		})
		};
		
		
	})
	



};

watchform();