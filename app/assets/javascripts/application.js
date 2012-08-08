// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require_tree .

$('form.new_message').on('ajax:success', function(){
  $(this).find("#message_content").val("");
});
$(function(){
  var pusher = new Pusher('3addd561c2cd0d1a49ed'); // Replace with your app key
  var channel = pusher.subscribe('trms-channel');
  channel.bind('message_added', function(data) {
    $('ul.messages').prepend('<li><span class="time"> ' + data.time + 
      ' </span><span class="username' + 
      ($('#my_name').text() == data.message.user_name ? ' myself' : '') + 
      '"> (' + data.message.user_name + ') </span><span class="content"> ' +
       data.message.content + ' </span></li>');
  });
});
