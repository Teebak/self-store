<script setup lang="ts">
import { PRODUCTS, CATS } from '~/data/products'

const route = useRoute()
const router = useRouter()

const cat = computed(() => (typeof route.query.cat === 'string' ? route.query.cat : 'All'))

function pick(name: string) {
  router.push({ path: '/shop', query: name === 'All' ? {} : { cat: name } })
}

const shown = computed(() => {
  if (cat.value === 'All') return PRODUCTS
  if (cat.value === 'On Sale') return PRODUCTS.filter(p => p.sale)
  return PRODUCTS.filter(p => p.cat === cat.value)
})
</script>

<template>
  <main class="page-rise" style="padding:calc(clamp(40px,6vh,84px) + 62px) clamp(18px,5vw,84px) clamp(64px,10vh,130px)">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:30px;flex-wrap:wrap;margin-bottom:clamp(28px,4.5vh,54px)">
      <div>
        <div style="font-size:9.5px;letter-spacing:0.3em;text-transform:uppercase;color:#6f6156;margin-bottom:16px">Shop — {{ cat }}</div>
        <h1 style="font-family:'EB Garamond',Georgia,serif;font-weight:400;font-size:clamp(38px,5.2vw,72px);line-height:1;margin:0">The Shelf</h1>
      </div>
      <div style="font-weight:300;font-size:14px;line-height:1.8;color:#6d5f56;max-width:34ch">Held in stock. Prices in Iraqi dinar, inclusive of duty.</div>
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;padding-bottom:18px;border-bottom:1px solid #d8ccc2;margin-bottom:clamp(26px,4vw,46px)">
      <div style="display:flex;gap:clamp(14px,2vw,30px);flex-wrap:wrap;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;font-weight:500">
        <span
          v-for="f in CATS" :key="f"
          :style="{ cursor: 'pointer', paddingBottom: '7px', borderBottom: '1px solid', transition: 'color .5s ease,border-color .5s ease', color: cat === f ? '#2b231e' : '#6f6156', borderBottomColor: cat === f ? '#b4552f' : 'transparent' }"
          @click="pick(f)"
        >{{ f }}</span>
      </div>
      <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#6f6156">{{ shown.length }} {{ shown.length === 1 ? 'product' : 'products' }}</div>
    </div>

    <div v-if="shown.length > 0" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(max(150px,22%),1fr));gap:clamp(8px,0.8vw,12px) clamp(3px,0.3vw,5px)">
      <ProductCard v-for="p in shown" :key="p.id" :product="p" aspect="3/4" :show-sale="true" />
    </div>
    <div v-else style="padding:clamp(60px,10vh,120px) 0;text-align:center">
      <div style="font-family:'EB Garamond',Georgia,serif;font-size:clamp(20px,2.2vw,30px);color:#5c4f47;margin-bottom:20px">Nothing in {{ cat }} yet.</div>
      <span class="hover-accent-underline" style="display:inline-block;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#2b231e;padding-bottom:6px;cursor:pointer;font-weight:500" @click="pick('All')">See all products</span>
    </div>
  </main>
</template>
