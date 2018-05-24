$(document).on('turbolinks:load', function() {
	$(function(){
	 	var search_list = $("#user-search-result")
	 	//_form.htmlにある検索結果一覧
	 	function appendUser(user) {
	    	var html = `<div class="chat-group-user chat-group-user-${ user.id } clearfix">
	                  	<p class="chat-group-user__name">${ user.name }</p>
	                  	<a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
	                	</div>`
	    	search_list.append(html);
	  	}

	  	$("#user-search-field").on('keyup', function(){
	  		//サーチ欄にテキストを入力し文字が打ち込み終わる（キーが上がる）たびに発火
	    	var input = $("#user-search-field").val();
	    	//フォームに入力されている値をvalで取得、inputに入れる

	    	$.ajax({
	      	type: 'GET',
	      	url: '/users',
	      	data: { keyword: input },
	      	dataType: 'json'
	    	})
	    	//GET /usersのリクエストなのでusersコントローラのindexアクションが動く
	    	.done(function(users) {
	      		$("#user-search-result .chat-group-user").remove();
	        	users.forEach(function(user) {
	        		//配列全てに適応
	          		appendUser(user);
	          		//検索結果を最後に追加
	        	})
	    	})
	    	.fail(function() {
	      		alert('ユーザー検索に失敗しました');
	    	})
	  	});
	});

	$(function() {
	  	var member_list = $("#chat-group-users")
	  	function appendMember(id, name) {
	    	var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
	                  	<input name='group[user_ids][]' type='hidden' value='${id}'>
	                  	<p class='chat-group-user__name'>${ name }</p>
	                  	<a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${ id }">削除</a>
	                	</div>`
	    	member_list.append(html);
	    	//_formのメンバー一覧に追加
	  	}

	  	$(document).on('click', 'a.chat-group-user__btn--add', function() {
	  		//documentだと後から追加された要素がクリックされた時にも発火する
	    	var user_id = $(this).data("user-id");
	    	//上の追加htmlのbtn--addクラス内のuser-idの値を取得
	    	var user_name = $(this).data("user-name");
	    	//上に同じくuser-nameの値を取得
	    	$("#user-search-result .chat-group-user-" + user_id).remove();
	    	//検索結果一覧から押したidのものを取り消す
	    	appendMember(user_id, user_name);

	  	});
	})

	$(function() {
	  	$(document).on('click', 'a.chat-group-user__btn--remove', function() {
	    	var user_id = $(this).data("user-id");
	    	$("#chat-group-user-" + user_id).remove();
	  	});
	});
})
