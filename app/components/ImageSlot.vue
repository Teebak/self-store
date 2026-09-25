<script setup lang="ts">
const props = withDefaults(defineProps<{
  ph: string
  src?: string
  align?: 'center' | 'top'
  // Load immediately; use for images at the top of the page. Everything else lazy-loads.
  eager?: boolean
}>(), {
  src: undefined,
  align: 'center',
  eager: false
})

// Prefix local paths with the app base URL (e.g. /self-store/ on GitHub Pages)
const baseURL = useRuntimeConfig().app.baseURL
const resolvedSrc = computed(() =>
  props.src?.startsWith('/') ? baseURL.replace(/\/$/, '') + props.src : props.src
)
</script>

<template>
  <div
    :style="{
      position: 'relative', width: '100%', height: '100%', display: 'flex',
      alignItems: props.align === 'top' ? 'flex-start' : 'center',
      justifyContent: 'center', overflow: 'hidden',
      paddingTop: props.align === 'top' ? '90px' : undefined
    }"
  >
    <img v-if="resolvedSrc" :src="resolvedSrc" :alt="ph" :loading="eager ? 'eager' : 'lazy'" decoding="async" style="width:100%;height:100%;object-fit:cover">
    <span
      v-else
      style="font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:center;padding:16px;opacity:0.7"
    >{{ ph }}</span>
  </div>
</template>
