const demoOutput = document.getElementById("cas_demo_output");
const apiURL = "wss://api.yuhanliu.me/ocaml_cas/v2/ws/";
let ws = undefined;
let disconnectTimeout = undefined;
let userQuery

window.onbeforeunload = function() {
    ws.onclose = function () {}; // disable onclose handler first
    ws.close();
};

function connectWS() {
    ws = new WebSocket(apiURL);
    ws.addEventListener("open", (event) => {
        demoOutput.innerText = "Connected!";
        if (userQuery) {
            ws.send(userQuery);
        }
    });
    ws.addEventListener("message", (event) => {
        const msg = JSON.parse(event.data);
        if (msg["query"] === userQuery) {
            const res = msg["response"];
            if (res["success"] && res["number"] !== null) {
                demoOutput.style.color = "black";
                demoOutput.innerText = res["number"];
            } else {
                demoOutput.style.color = "red";
            }
        }
    });
    ws.addEventListener("close", (event) => {
        demoOutput.style.color = "black";
        demoOutput.innerText = "Disconnected. Start typing to reconnect.";
    });
}

function updateCalc(val) {
    userQuery = val;
    if (userQuery === "") {
        demoOutput.textContent = "0";
        return;
    }
    if (ws === undefined || ws.readyState === WebSocket.CLOSED) {
        demoOutput.innerText = "Connecting...";
        connectWS();
        return;
    }
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(userQuery);
    }
    if (disconnectTimeout) {
        clearTimeout(disconnectTimeout);
    }
    disconnectTimeout = setTimeout(() => {
        ws.close();
    }, 5000);
}

document
    .getElementById("cas_demo_input")
    .addEventListener("keyup", (event) => {
        updateCalc(event.target.value);
    });
