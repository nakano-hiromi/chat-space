$(function(){
  function buildHTML(message){
    if (message.image){
      let html =
              `<div class="main__contents--message" data-message-id=${message.id}>
                 <span class="username">
                 ${message.user_name}
               </span>
               <span class="time">
                 ${message.created_at}
               </span>
               <p class="content">
                 <p class="lower-message__content">
                   ${message.content}
                 </p>
                   <img src=${message.image} >
                 </p>
              </div>`
       return html;
    }  else {
      let html =
              `<div class="main__contents--message" data-message-id=${message.id}>
                 <span class="username">
                 ${message.user_name}
               </span>
               <span class="time">
                 ${message.created_at}
               </span>
               <p class="content">
                 <p class="lower-message__content">
                   ${message.content}
                 </p>
               </p> 
             </div>`
       return html;
     };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main__contents').append(html);
      $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
    $('form')[0].reset();
    $('.submit-btn').attr('disabled', false);
    });
  });
  // 以下の記述を削除
  //  let reloadMessages = function() {
  //  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  //  let last_message_id = $('.main__contents--message:last').data("message-id") || 0;
  //  $.ajax({
  //    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
  //    url: "api/messages",
  //   //ルーティングで設定した通りhttpメソッドをgetに指定
  //    type: 'get',
  //    dataType: 'json',
  //    //dataオプションでリクエストに値を含める
  //    data: {id: last_message_id}
  //  })
  //  .done(function(messages) {
  //   // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
  //    if (messages.length !== 0) {
  //      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
  //      let insertHTML = '';
  //     $.each(messages, function(i, message) {
  //        insertHTML += buildHTML(message)
  //      });
  //      //メッセージが入ったHTMLに、入れ物ごと追加
  //      $('.main__contents').append(insertHTML);
  //      $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
  //    }
  //  })
  //  .fail(function() {
  //    alert('error');
  //  });
  //  };
  //  setInterval(reloadMessages, 7000);
});