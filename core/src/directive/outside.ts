const outside = {
    mounted(el, binding) {
        el.clickOutsideEvent = event => {
            if (!(el == event.target || el.contains(event.target)) && binding.value) {
                binding.value();
            }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    }
}

export { outside }