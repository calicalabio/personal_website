function createMessage() {
    var textBox = document.getElementById("messageTextBox");
    postNewMessage(textBox.value);
}

function getMessages() {
    console.log('Getting latest messages...');
    fetch('http://localhost:6666/messages/get').then(function (response) {
        if (response.status !== 200) {
            console.log('Server error. Status Code: ' + response.status);
            return;
        }

        response.json().then(function (data) {
            console.log(data);
        });
    }).catch(function (error) {
        console.log('Error sending GET: ', error);
    });
}

function postNewMessage (messageContent) {
    console.log('Sending fetch POST request...');
    fetch('http://localhost:6666/messages/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: messageContent
        })
    }).then(function (response) {
        if (response.status !== 201) {
            console.log('Server error. Status Code: ' + response.status);
            return;
        }

        response.json().then(function (data) {
            console.log(data);
        });

    }).catch(function (error) {
        console.log('Error sending POST: ', error);
    });
}

window.addEventListener("load", function() {
    console.log('Page loaded successfully.');
    getMessages();    
  });