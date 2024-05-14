const menu = document.querySelector('menu')
const inputs = [
   document.querySelector('#lgh-0'),
   document.querySelector('#lgh-1'),
   document.querySelector('#lgh-2'),
   document.querySelector('#drk-0'),
   document.querySelector('#drk-1'),
   document.querySelector('#drk-2'),
   document.querySelector('#drk-3'),
   document.querySelector('#acc-0'),
   document.querySelector('#acc-1')
]

for (let i = 0; i < inputs.length; i++) {

   fetch('./assets/themes.json').then(res => res.json()).then(data => {
      inputs[i].value = data.oldtimes[i]
   })

   inputs[i].addEventListener('input', evt => {
      document.documentElement.style.setProperty(`--clr-${evt.target.id}`, evt.target.value)
   })
}

