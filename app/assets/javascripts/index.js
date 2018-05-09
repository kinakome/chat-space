$(function(){
  var search_list = $("#user-search-result")
  function appendUser(user) {
    var html = `<div class="chat-group-user chat-group-user-${ user.id } clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    search_list.append(html);
  }

  $("#user-search-field").on('keyup', function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result .chat-group-user").remove();
        users.forEach(function(user) {
          appendUser(user);
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
  }

  $(document).on('click', 'a.chat-group-user__btn--add', function() {
    var user_id = $(this).data("user-id");
    var user_name = $(this).data("user-name");
    $("#user-search-result .chat-group-user-" + user_id).remove();
    appendMember(user_id, user_name);
  });
})

$(function() {
  $(document).on('click', 'a.chat-group-user__btn--remove', function() {
    var user_id = $(this).data("user-id");
    $("#chat-group-user-" + user_id).remove();
  });
});