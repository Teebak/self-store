<script setup lang="ts">
const props = withDefaults(defineProps<{
  ph: string
  src?: string
  align?: 'center' | 'top'
}>(), {
  src: undefined,
  align: 'center'
})
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
    <img v-if="src" :src="src" :alt="ph" style="width:100%;height:100%;object-fit:cover">
    <span
      v-else
      style="font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:center;padding:16px;opacity:0.7"
    >{{ ph }}</span>
  </div>
</template>
