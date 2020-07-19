let socket = new WebSocket("ws://127.0.0.1:5501");

socket.onopen = event => {
    console.log("Connection established", event);
};

socket.onmessage = event => {
    console.log(event.data);
};

socket.onclose = event => {
    if (event.wasClean) {
        console.log("Closed correct", event.code);
    } else {
        console.log("Closed wrong", event.code);
    }
};