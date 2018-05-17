$(document).on('turbolinks:load', function() {
	$(function(){
		function buildHTML(message){
	     	if (message.image){
	        	var img = `<img class="lower-message__image" src="${ message.image }">`;
	      	} else {
	      		var img =''
	      	}
		    var html =  `<div class="message" data-message-id="${message.id}">
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
		    					${img}
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

		    var interval = setInterval(autoUpdate, 5000);
			    function autoUpdate() {
			      	if (window.location.href.match(/\/groups\/\d+\/messages/)) {
			      		var message_id = $('.message:last').last().data('message-id');
					    $.ajax({
					      	url: location.href.json,
					      	dataType: 'json',
					      	type: 'GET',
					      	data: {
		        					message: { id: message_id }
		      						}
					    })
					    .done(function(data) {
					      	var id = $('.message').data('messageId');
					      	var insertHTML = '';
					     	data.forEach(function(message) {
						          	insertHTML += buildHTML(message);
					      	});
					      	$('.messages').append(insertHTML);
					    })
					    .fail(function(data) {
					      	console.log('自動更新に失敗しました');
					    })
			  		} else {
			    		clearInterval(interval);
	   				}
	   			}
	});
});