<script setup lang="ts">
import type { Product } from '~/data/products'

defineProps<{ products: Product[] }>()

const track = ref<HTMLElement | null>(null)
const atStart = ref(true)
const atEnd = ref(false)

function update() {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  atStart.value = max <= 4 || el.scrollLeft <= 4
  atEnd.value = max <= 4 || el.scrollLeft >= max - 4
}

function nudge(dir: 1 | -1) {
  const el = track.value
  if (!el) return
  el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' })
}

onMounted(() => {
  update()
  window.addEventListener('resize', update, { passive: true })
})
onUnmounted(() => window.removeEventListener('resize', update))
</script>

<template>
  <div style="position:relative">
    <div id="v2-swiper" ref="track" style="display:flex;gap:clamp(3px,0.3vw,5px);overflow-x:auto" @scroll="update">
      <div v-for="p in products" :key="p.id" style="flex:0 0 clamp(200px,22%,420px)">
        <ProductCard :product="p" aspect="4/5" />
      </div>
    </div>
    <span
      class="swipe-arrow"
      :style="{ position: 'absolute', top: '38%', left: 'max(-38px,calc(-4.4vw))', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', fontSize: '19px', lineHeight: 1, color: '#6f6156', cursor: 'pointer', userSelect: 'none', opacity: atStart ? '0' : '1', pointerEvents: atStart ? 'none' : 'auto' }"
      @click="nudge(-1)"
    >←</span>
    <span
      class="swipe-arrow"
      :style="{ position: 'absolute', top: '38%', right: 'max(-38px,calc(-4.4vw))', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', fontSize: '19px', lineHeight: 1, color: '#6f6156', cursor: 'pointer', userSelect: 'none', opacity: atEnd ? '0' : '1', pointerEvents: atEnd ? 'none' : 'auto' }"
      @click="nudge(1)"
    >→</span>
  </div>
</template>
