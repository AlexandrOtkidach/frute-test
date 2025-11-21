const switchButtons = document.querySelectorAll('.header-top_lang-switcher>*')

switchButtons.forEach(item => {
    item.addEventListener('click', (e)=> {
        console.log(e.target)
        switchButtons.forEach(button => {
            button.classList.remove('active')
            if(button == e.target){
                button.classList.add('active')
            }
        })
    })
})