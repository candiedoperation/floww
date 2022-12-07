const toggleLightTheme = () => {
    (localStorage.getItem("theme") === null) ?
    localStorage.setItem("theme", "light") :
    localStorage.setItem("theme", (localStorage.getItem("theme") === 'light') ? 'dark' : 'light')
}

const getCurrentTheme = () => {
    if (localStorage.getItem("theme") === null) localStorage.setItem("theme", "light")
    return localStorage.getItem('theme');
}

const setCurrentTheme = (theme) => {
    localStorage.setItem("theme", theme);
}

export { toggleLightTheme, getCurrentTheme, setCurrentTheme }