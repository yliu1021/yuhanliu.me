const express = require("express");
const js_cas = require("./js_cas");
const ocaml_cas_v2 = express.Router();

ocaml_cas_v2.get("/", function (req, res) {
    res.json({
        "status": "online"
    });
});

ocaml_cas_v2.post("/", function (req, res) {
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
    const ans = JSON.parse(js_cas.eval(query));
    res.json(ans);
});

ocaml_cas_v2.ws("/ws", (ws, req) => {
    ws.on("message", query => {
        // we parse and stringify to remove redundant whitespace
        const ans = JSON.parse(js_cas.eval(query));
        ws.send(JSON.stringify(ans));
    });
});

module.exports = ocaml_cas_v2
