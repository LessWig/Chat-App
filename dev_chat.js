var chatWindow = document.getElementsByClassName("chat-window")[0];
var inputBox = document.getElementsByClassName("message-input")[0];

jQuery('#username-modal').modal('show');

$userModal = jQuery('#username-modal')
$modalSubmit = $userModal.find('.submit-button')
$ipField = $userModal.find('#ip')
$username = $userModal.find('#username')
jQuery($modalSubmit).on('click', function(event){
	var username = $username.val();
	var ip = $ipField.val();
	$userModal.modal('hide')
	jQuery('#submit-message').on('click', sendMessage)

	var client = new Faye.Client('http://' + ip + ':8000/');
	
	var sendMessage = function(){
		var inputMessage = inputBox.value;
		client.publish('/messages', {
	  		text: inputMessage,
	  		username: username
		});
		inputBox.value = '';
	}

	jQuery(inputBox).on("keyup", function(event){
		if(event.keyCode === 13){
			sendMessage();
		}
	})

	client.subscribe('/messages', function(message) {
	  var currentMessages = chatWindow.innerHTML;
	  var appendedMessage = message.username + ': ' + message.text + "<br/>" + currentMessages;
	  chatWindow.innerHTML = appendedMessage;
	  console.log('Got a message: ' + message.text + '\n\tFrom: ' + username);
	});
})
