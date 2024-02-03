function open_modal(){
	console.log("Showing modal");
	$('#input_vals_modal').modal('show');
}
function submitComment(){
	console.log("Submitting comment:");
	let content = document.getElementById("content").value;
	console.log(content);
	let id = document.getElementById("hidden").innerHTML;
	$.ajax({
		'url': "http://localhost:3000/add_comment?content="+content+"&postId="+id,
		'method': "get",
		'success': onResponseSuccess
	});
}
function onResponseSuccess(responseString){
	location.reload();
}