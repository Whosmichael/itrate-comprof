/** Inline script for <head>: applies a saved theme before first paint, so there is no flash. */
export const themeInitScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`
