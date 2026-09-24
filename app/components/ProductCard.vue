<script setup lang="ts">
import type { Product } from '~/data/products'

const props = withDefaults(defineProps<{
  product: Product
  aspect?: string
  showSale?: boolean
}>(), {
  aspect: '4/5',
  showSale: false
})

const { addToBag } = useCart()
const router = useRouter()

const added = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

function onAdd(e: MouseEvent) {
  e.stopPropagation()
  addToBag(props.product.id)
  added.value = true
  clearTimeout(timer)
  timer = setTimeout(() => { added.value = false }, 1600)
}

function open() {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div class="product-card" style="cursor:pointer;border-radius:4px;overflow:hidden;background:#ece4dd" @click="open">
    <div class="card-media" :style="{ position: 'relative', aspectRatio: aspect, overflow: 'hidden', color: '#7d6d61' }">
      <div class="card-image">
        <ImageSlot :ph="product.ph" :src="product.img" />
      </div>
      <div v-if="showSale && product.sale" style="position:absolute;top:0;left:0;background:#b4552f;color:#f6f1ec;font-size:8.5px;letter-spacing:0.22em;text-transform:uppercase;padding:6px 11px;pointer-events:none;font-weight:600">Sale</div>
      <div
        class="card-add btn-primary"
        :class="{ 'is-added': added }"
        style="position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;padding:15px 12px;font-size:9.5px;letter-spacing:0.24em;text-transform:uppercase;font-weight:600"
        @click="onAdd"
      >{{ added ? 'Added to bag' : 'Add to bag' }}</div>
    </div>
    <div style="padding:20px 16px 8px">
      <div style="font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:#6f6156;margin-bottom:9px">{{ product.brand }}</div>
      <div style="font-family:'EB Garamond',Georgia,serif;font-size:15.5px;line-height:1.35;color:#2b231e">{{ product.name }}</div>
      <div style="font-size:11.5px;letter-spacing:0.04em;color:#b4552f;font-weight:500;margin-top:8px">{{ product.price }}</div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  transition: background 0.8s ease;
}
.product-card:hover {
  background: #e6ded6;
}
.card-image {
  width: 100%;
  height: 100%;
  transition: transform 1.3s cubic-bezier(.2, .7, .2, 1);
}
.product-card:hover .card-image {
  transform: scale(1.05);
}
.card-add {
  transform: translateY(101%);
  opacity: 0;
  transition: transform 0.6s cubic-bezier(.2, .7, .2, 1), opacity 0.5s ease, background 0.4s ease;
}
.product-card:hover .card-add,
.card-add.is-added {
  transform: translateY(0);
  opacity: 1;
}
</style>
