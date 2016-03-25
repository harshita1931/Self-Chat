window.onload = function(){
	//variable declarations
	var connectBtn = document.getElementById('connect');
	var form = document.getElementById('msgform');
	var messageField = document.getElementById('message');
	var messageList = document.getElementById('messagesthread');
	var socketStatus = document.getElementById('status');
	var closeBtn = document.getElementById('close');
	var socket = new WebSocket('ws://echo.websocket.org'); 

	//action to perform when connectBtn is clicked
	connectBtn.onclick = function(){
		location.reload();
		connectBtn.className = "hidden";
	};

	//action to perform when socket is opened
	socket.onopen = function(){
		console.log('connection established');
		socketStatus.innerHTML = 'Connected to ' + event.currentTarget.URL;
		connectBtn.className = 'hidden';
		socketStatus.className = 'open';
	};

	//action to perform when error occurs in connection
	socket.onerror = function(error){
		console.log('WebSocket Error: '+error);
	};

	//action to perform when socket receives message
	socket.onmessage = function(event){
		messageList.innerHTML = messageList.innerHTML + '<li class="recieved"><u><b>Received:</b></u> '+ event.data + '</li>';
	};

	//action to perform when socket is closed
	socket.onclose = function(event){
		socketStatus.innerHTML = 'Disconnected';
		socketStatus.className = 'closed';
	};

	//action to perform when form is submitted
	form.onsubmit = function(event){
		event.preventDefault();
		var msg = messageField.value;
		socket.send(msg);
		messageList.innerHTML = messageList.innerHTML + '<li class="sent"><u><b>Sent:</b></u> ' + msg + '</li>';
		messageField.value = '';
		return false;
	};

	//action to perform when closeBtn is clicked
	closeBtn.onclick = function(event){
		event.preventDefault();
		socket.close();
		connectBtn.className = "";
		closeBtn.className = 'hidden';
		return false;
	};

};