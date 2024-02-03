/*function open_modal(){
	console.log("Showing modal");
	$('#input_vals_modal').modal('show');
}
function displayInfo(){
	let moisture = document.getElementById("moisture").value;
	let result = document.getElementById("result").value;
	window.location.href = "http://localhost:3000/main?moisture="+moisture+"&result="+result;
}*/

/* 
JavaScript EmbedCode usage:

var wcc = new WolframCloudCall();
wcc.call(x, function(result) { console.log(result); });
*/
let thumb = "blank";
function open_modal(){
	console.log("Showing modal");
	$('#input_vals_modal').modal('show');
}

function submitPost(){
	console.log("Submitting post:");
	let title = document.getElementById("title").value;
	let content = document.getElementById("content").value;
	console.log(title);
	console.log(content);
	$.ajax({
		'url': "http://localhost:3000/add_post?title="+title+"&content="+content,
		'method': "get",
		'success': onResponseSuccess
	});
}
function onResponseSuccess(responseString){
	console.log(responseString);
	//document.getElementById("inner").innerHTML = responseString;
	window.location.href = "http://localhost:3000/main";
}
function changeThumb(id){
	console.log(document.getElementById(id).src);
	if(document.getElementById(id).src == "http://localhost:3000/img/thumb_blank.png"){
		document.getElementById(id).src="./img/thumb_filled.png";
		thumb = "filled";
		$.ajax({
			'url': "http://localhost:3000/increment_post?id="+id,
			'method': "get",
			'success': onResponseSuccess
		});
	}
	else{
		document.getElementById(id).src="./img/thumb_blank.png";
		thumb = "blank";
		$.ajax({
			'url': "http://localhost:3000/decrement_post?id="+id,
			'method': "get",
			'success': onResponseSuccess
		});
	}
}