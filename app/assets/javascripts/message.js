$(function(){
	function buildHTML(message){
	    var html =  `<div class="message">
	   					<div class="upper-message">
	   						<div class="upper-message__user-name">
	    					${message.user_name}
	    					</div>
	    					<div class="upper-message__date">
	    					${message.created_at}
	    					</div>
	    				</div>
	   					<div class="lower-meesage">
	    					<p class="lower-message__content">
	    						${message.content}
	    					</p>
	    				</div>
	   				</div>`
	    return html;
	    }

	$('#new_message').on('submit', function(e){
	e.preventDefault();
	var formData = new FormData(this);
	var url = $(this).attr('action')

		$.ajax({
		url: url,
		type: 'POST',
		data: formData,
		dataType: 'json',
		processData: false,
		contentType: false
		})
    .done(function(data){
    	var html = buildHTML(data);
      	$('.messages').append(html).animate({scrollTop: $('.messages')[0].scrollHeight}, '500');
     	$('#new_message')[0].reset();
     	$('input').prop('disabled', false);
    })
    .fail(function() {
      alert('メッセージが入力されていません');
    })
	});
});