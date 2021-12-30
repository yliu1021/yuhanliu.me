const express = require("express");
var js_cas = require("./js_cas");
const ocaml_cas_v1 = express.Router();

ocaml_cas_v1.get("/", function (req, res) {
    res.json({
        "status": "online"
    });
});

ocaml_cas_v1.post("/", function (req, res) {
    const b = req.body;
    if (!("query" in b)) {
        res.status(400);
        res.json({
            "error": "query not found"
        });
        return;
    }
    const query = b["query"];
    if (typeof query !== "string" && !(query instanceof String)) {
        res.status(400);
        res.json({
            "error": "query is not a string"
        });
    }
    const ans = js_cas.eval(query);
    res.json({
        "query": query,
        "response": ans
    });
});

ocaml_cas_v1.ws("/ws", (ws, req) => {
    ws.on("message", query => {
        const ans = js_cas.eval(query);
        ws.send(JSON.stringify({
            "query": query,
            "response": ans
        }));
    });
});

module.exports = ocaml_cas_v1
