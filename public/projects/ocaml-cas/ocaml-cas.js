document
    .getElementById("cas_demo_input")
    .addEventListener("change", (event) => {
        const val = event.target.value;
        const api_url = "https://api.yuhanliu.me/ocaml_cas/";
        const fetch_init = {
            method: "POST",
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"query": val})
        }
        fetch(api_url, fetch_init)
            .then((res) => res.json())
            .then((data) => {
                if ("response" in data) {
                    document
                        .getElementById("cas_demo_output")
                        .innerText = data["response"];
                } else {
                    document
                        .getElementById("cas_demo_output")
                        .innerText = "An unexpected error occured";
                }
            })
            .catch((err) => {
                console.log(`Failed to fetch: ${err}`)
            });
    });
