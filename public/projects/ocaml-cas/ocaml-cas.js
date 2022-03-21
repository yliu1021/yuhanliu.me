import * as cas from "./js_cas.bc.js"
const demoOutput = document.getElementById('cas_demo_output')

function updateCalc(userQuery) {
  if (userQuery === '') {
    demoOutput.textContent = '0'
    return
  }
  const msg = JSON.parse(eval(userQuery))
  if (msg.query === userQuery) {
    const res = msg.response
    if (res.success && res.number !== null) {
      demoOutput.style.color = 'black'
      demoOutput.innerText = res.number
    } else {
      demoOutput.style.color = 'red'
    }
  }
}

document
  .getElementById('cas_demo_input')
  .addEventListener('keyup', (event) => {
    updateCalc(event.target.value)
  })
