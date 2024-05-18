const select = document.querySelector('select')
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

const color_scheme = {
   selected: false,
   themes: {}
}

async function setup() {

   color_scheme.themes = await fetch('./assets/themes.json').then(res => res.json())

   for (const theme in color_scheme.themes) {
      const option = document.createElement('option')
      option.textContent = theme.replaceAll('_', ' ')
      option.value = theme
      select.append(option)
   }

   set_theme('modern')
   select.addEventListener('input', evt => { set_theme(evt.target.value) })

   for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', evt => {
         document.documentElement.style.setProperty(`--clr-${evt.target.id}`, evt.target.value)
         color_scheme.selected = false
      })
   }

   document.querySelector('#copy').addEventListener('click', copy_palette_to_clipboard)
}

function set_theme(theme_name) {
   for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = color_scheme.themes[theme_name][i]
      document.documentElement.style.setProperty(`--clr-${inputs[i].id}`, inputs[i].value)
   }

   color_scheme.selected = true
}

async function copy_palette_to_clipboard() {
   let data = '["'
   for (let i = 0; i < inputs.length - 1; i++) {
      data += inputs[i].value + '","'
   }
   data += inputs[inputs.length - 1].value + '"]'

   await navigator.clipboard.writeText(data)
}

setup()