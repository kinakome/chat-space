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
		//フォームの送信ボタンを押す
		e.preventDefault();
		//フォームの送信を止める
		var formData = new FormData(this);
		//押されたDOM要素に入っているデータを変数に入れる
		var url = $(this).attr('action');
		//イベントが発生した要素のアクション属性を取得（今回はフォーム送信先URL）
			$.ajax({
			url: url,
			type: 'POST',
			data: formData,
			dataType: 'json',
			processData: false,
			contentType: false
			})
		    .done(function(data){
		    //非同期通信成功時
		    	var html = buildHTML(data);
		      	$('.messages').append(html).animate({scrollTop: $('.messages')[0].scrollHeight}, '500');
		      	//.messagesに作成されたhtmlを追加、animateでスクロールさせる
		     	$('#new_message')[0].reset();
		     	//ボタンをリセット[0]は必須
		     	$('input').prop('disabled', false);
		     	//ボタンが押された後disabledになるのでfalseでそれを取り消す
		    })
		    .fail(function() {
		      alert('メッセージが入力されていません');
		    })
		});

		    var interval = setInterval(autoUpdate, 5000);
		    //5秒おきに発火
			    function autoUpdate() {
			      	if (location.href.match(/\/groups\/\d+\/messages/)) {
			      		//今のURL（window.location.href）が一致している時
			      		var message_id = $('.message').last().data('messageId');
			      		//メッセージの最後のid
			      		console.log(message_id);
					    $.ajax({
					      	url: location.href,
					      	dataType: 'json',
					      	type: 'GET',
					      	data: {
		        					message: { id: message_id }
		      						}
					    })
					    .done(function(data) {
							if(data != null){
          						data.forEach(function(message){
            					$('.messages').append(buildHTML(message));
          						});
        					}
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