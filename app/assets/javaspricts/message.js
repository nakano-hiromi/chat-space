$(function(){
  function buildHTML(message){
    if (message.image){
      let html =
            `<div class="main__contents--message">
               <span class="username>
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
            `<div class="main__contents--message">
               <span class="username>
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
      $('form')[0].reset();
      $('.submit-btn').attr('disabled', false);　
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});