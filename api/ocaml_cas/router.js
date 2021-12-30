const express = require("express");
const ocaml_cas = express.Router();

const bodyParser = require("body-parser");
ocaml_cas.use(bodyParser.json());

const ocaml_cas_v1 = require("./v1/router");
ocaml_cas.use("/v1", ocaml_cas_v1);

const ocaml_cas_v2 = require("./v2/router");
ocaml_cas.use("/v2", ocaml_cas_v2);

module.exports = ocaml_cas;
