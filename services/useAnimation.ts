import { ref } from 'vue'

export function useAnimation() {
    const status = ref(false)

    function startAnimation() {
        status.value = true
    }

    function onAnimationEnd() {
        status.value = false
    }

    return {
        animating: status,
        startAnimation,
        onAnimationEnd
    }
}
