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
   themes: {
      "old_times": ["#ffffff", "#f1ebff", "#7fb7ff", "#0d0818", "#1f0a52", "#180b86", "#45385c", "#ffa618", "#968c5c"],
      "modern": ["#ffffff", "#ffffff", "#4a8fe8", "#000000", "#001122", "#205f7e", "#444e5a", "#1a75ff", "#5b7495"],
      "dream_of_sky": ["#ffffff", "#f0f7ff", "#203a97", "#092543", "#5a8dc4", "#5a8dc4", "#90afd0", "#ffa618", "#968c5c"],
      "gaia's_dance": ["#ffffff", "#f0fff0", "#97d39e", "#011f00", "#257e2f", "#385c39", "#385c39", "#ffa618", "#968c5c"],
      "hotdog": ["#ffff00", "#ffcb3d", "#ff7300", "#ff0000", "#ff0000", "#ff7700", "#ff4000", "#ffa618", "#968c5c"]
   }
}

async function setup() {

   //color_scheme.themes = await fetch('./assets/themes.json').then(res => res.json())

   for (const theme in color_scheme.themes) {
      const option = document.createElement('option')
      option.textContent = theme.replaceAll('_', ' ')
      option.value = theme
      select.append(option)
   }

   set_theme('old_times')
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