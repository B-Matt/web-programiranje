$(document).ready(function(){
	
	$('.alert').hide();
	
	$("#register-button").click(function(event) {
		
		event.preventDefault();
		if(!$("form#register-form")[0].checkValidity()) {
			$('.alert').show();
		}
		
		var isEmpty = false;		
		$("form#register-form input[type=text]").each(function(){
			
			var value = $(this).val();			
			if(!value) {
				isEmpty = true;
			}
		});
		
		if(isEmpty) {
			$('.alert').show();
		} else {
			var data = JSON.stringify($("form#register-form").serializeArray());
			console.log(data);
		}
	});
	
});