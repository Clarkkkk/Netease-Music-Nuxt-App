import { onMounted, type Ref, ref } from 'vue'

export function useScrollPosition(container: Ref<HTMLElement | null>) {
    const centerPosition = ref(
        container.value ? container.value.clientWidth / 2 + container.value.scrollLeft : 0
    )

    function onScroll(e: Event) {
        const el = e.target as HTMLElement
        if (centerPosition.value !== el.clientWidth / 2 + el.scrollLeft) {
            centerPosition.value = el.clientWidth / 2 + el.scrollLeft
        }
    }

    function onWheel(e: WheelEvent) {
        if (!container.value) return
        container.value.scroll({
            left: container.value.scrollLeft + (e.deltaY > 0 ? 64 : -64)
        })
    }

    onMounted(() => {
        centerPosition.value = container.value
            ? container.value.clientWidth / 2 + container.value.scrollLeft
            : 0
    })

    return {
        onScroll,
        onWheel,
        centerPosition
    }
}
