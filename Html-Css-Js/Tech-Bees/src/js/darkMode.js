import { AppName} from './data.js'
import { dom } from './DOM.js';
import { getObjectLs, updateItemLs } from './utils.js';


// Init Theme
export function initTheme() {
  const theme = getCurrentTheme();
  loadTheme(theme);
  loadCheckboxListener();
}


// Toggle Theme
export function toggleTheme() {

  let theme = getCurrentTheme();
  
  theme = theme === 'light' ? 'dark' : 'light';
  
  updateItemLs(AppName,'theme',theme)

  loadTheme(theme)
}


// Get Theme
function getCurrentTheme() {

  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  theme = theme ? 'dark' : 'light';

  if (getObjectLs(AppName)?.theme) {
    theme = getObjectLs(AppName).theme
  }

  return theme;
}


// Load Theme
function loadTheme(theme) {
  dom.root.dataset.theme = theme
}


// Load Checkbox Listener
function loadCheckboxListener() {
  const theme = getCurrentTheme();

  if (theme === 'dark') {
    dom.themeSwitcher.forEach(switcher => {
      switcher.checked = true;
      })
  }
  

  dom.themeSwitcher.forEach(switcher => {
    switcher.addEventListener('change', () => {
      toggleTheme();
    })
  });
}
