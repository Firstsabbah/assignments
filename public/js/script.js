const menu = document.querySelector('#left')
const header = document.querySelector('.wrapper')
const nav = document.querySelector('nav')
const close = document.querySelector('.close')
let flag = false
menu.onclick = () => {
    flag = true
    nav.style.display = 'flex'
    header.style.display = 'none'
}
close.onclick = () => {
    flag = false
    nav.style.display = 'none'
    header.style.display = 'flex'
}
