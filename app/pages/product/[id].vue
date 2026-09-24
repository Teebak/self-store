<script setup lang="ts">
import { PRODUCTS, DETAILS } from '~/data/products'

const route = useRoute()
const router = useRouter()
const { addToBag } = useCart()

const id = computed(() => parseInt(route.params.id as string, 10))
const product = computed(() => PRODUCTS.find(p => p.id === id.value) ?? PRODUCTS[0])
const info = computed(() => DETAILS[product.value.id] ?? { size: '', blurb: '', use: '', ing: '', care: '' })

const shot = ref(0)
const qty = ref(1)
const openSec = ref<string>('use')
const added = ref(false)
let addedTimer: ReturnType<typeof setTimeout> | undefined

watch(id, () => {
  shot.value = 0
  qty.value = 1
  openSec.value = 'use'
  added.value = false
})

const shots = computed(() => {
  const p = product.value
  return [p.slot, p.slot + '-b', p.slot + '-c'].map((slotId, i) => ({
    id: slotId,
    ph: i === 0 ? p.ph : p.ph + (i === 1 ? ' — detail' : ' — in use'),
    src: i === 0 ? p.img : undefined
  }))
})

const sections = computed(() => [
  { key: 'use' as const, title: 'How to use', body: info.value.use },
  { key: 'ing' as const, title: 'Ingredients', body: info.value.ing },
  { key: 'care' as const, title: 'Delivery & care', body: info.value.care }
])

function toggleSection(key: string) {
  openSec.value = openSec.value === key ? '' : key
}

function inc() { qty.value = Math.min(9, qty.value + 1) }
function dec() { qty.value = Math.max(1, qty.value - 1) }

function add() {
  addToBag(product.value.id, qty.value)
  added.value = true
  clearTimeout(addedTimer)
  addedTimer = setTimeout(() => { added.value = false }, 1600)
}

const related = computed(() => {
  const p = product.value
  const same = PRODUCTS.filter(x => x.id !== p.id && x.cat === p.cat)
  const rest = PRODUCTS.filter(x => x.id !== p.id && x.cat !== p.cat)
  return same.concat(rest).slice(0, 4)
})

function goShop() {
  router.push('/shop')
}
</script>

<template>
  <main class="page-rise" style="padding:calc(clamp(30px,4vh,54px) + 62px) clamp(18px,5vw,84px) clamp(56px,9vh,120px)">
    <div style="display:flex;align-items:center;gap:12px;font-size:9.5px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156;margin-bottom:clamp(24px,3.4vw,40px)">
      <span class="hover-accent" style="cursor:pointer" @click="goShop">The Shelf</span>
      <span style="color:#bdb0a4">/</span>
      <span style="color:#3b312b">{{ product.cat }}</span>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:clamp(24px,3.4vw,64px);align-items:start">
      <div style="display:flex;flex-direction:column;gap:clamp(4px,0.4vw,7px)">
        <div style="position:relative;aspect-ratio:4/5;overflow:hidden;border-radius:4px;background:#ece4dd;color:#7d6d61">
          <div
            v-for="(sh, i) in shots" :key="sh.id"
            :style="{ position: 'absolute', inset: 0, transition: 'opacity .6s ease', opacity: shot === i ? '1' : '0', pointerEvents: shot === i ? 'auto' : 'none' }"
          >
            <ImageSlot :ph="sh.ph" :src="sh.src" />
          </div>
          <div v-if="product.sale" style="position:absolute;top:0;left:0;background:#b4552f;color:#f6f1ec;font-size:8.5px;letter-spacing:0.22em;text-transform:uppercase;padding:7px 12px;pointer-events:none;font-weight:600">Sale</div>
        </div>
        <div style="display:flex;justify-content:center;gap:9px;padding-top:6px">
          <span
            v-for="i in 3" :key="i"
            :style="{ width: '6px', height: '6px', borderRadius: '50%', cursor: 'pointer', transition: 'background .45s ease,transform .45s ease', background: shot === i - 1 ? '#a94d29' : '#cfc2b6', transform: shot === i - 1 ? 'scale(1.25)' : 'scale(1)' }"
            @click="shot = i - 1"
          />
        </div>
      </div>

      <div style="display:flex;flex-direction:column;padding-top:clamp(0px,1vw,18px)">
        <div style="font-size:9.5px;letter-spacing:0.3em;text-transform:uppercase;color:#6f6156;margin-bottom:18px">{{ product.brand }}</div>
        <h1 style="font-family:'EB Garamond',Georgia,serif;font-weight:400;font-size:clamp(30px,3.6vw,54px);line-height:1.05;letter-spacing:-0.01em;margin:0;max-width:24ch">{{ product.name }}</h1>
        <div style="display:flex;align-items:baseline;gap:18px;margin-top:22px">
          <div style="font-size:15px;letter-spacing:0.04em;color:#b4552f;font-weight:500">{{ product.price }}</div>
          <div style="font-size:9.5px;letter-spacing:0.2em;text-transform:uppercase;color:#6f6156">{{ info.size }}</div>
        </div>
        <p style="font-weight:300;font-size:15.5px;line-height:1.85;color:#5c4f47;max-width:46ch;margin:26px 0 0">{{ info.blurb }}</p>

        <div style="display:flex;align-items:stretch;gap:10px;margin-top:clamp(28px,3.4vw,42px);flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:2px;border:1px solid #d3c6ba;border-radius:4px">
            <span style="display:flex;align-items:center;justify-content:center;width:46px;height:52px;font-size:15px;color:#6f6156;cursor:pointer;user-select:none" @click="dec">−</span>
            <span style="min-width:26px;text-align:center;font-size:13px;color:#2b231e;font-weight:500">{{ qty }}</span>
            <span style="display:flex;align-items:center;justify-content:center;width:46px;height:52px;font-size:15px;color:#6f6156;cursor:pointer;user-select:none" @click="inc">+</span>
          </div>
          <span
            class="btn-primary"
            style="flex:1 1 220px;display:flex;align-items:center;justify-content:center;border-radius:4px;padding:0 30px;height:54px;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;font-weight:600"
            @click="add"
          >{{ added ? 'Added to bag' : 'Add to bag' }}</span>
        </div>
        <div style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#6f6156;margin-top:18px">In stock — Iraq Mall, Dijlah Village, VIP Baghdad Airport</div>

        <div style="margin-top:clamp(32px,4vw,48px);border-top:1px solid #d8ccc2">
          <div v-for="sec in sections" :key="sec.key" style="border-bottom:1px solid #d8ccc2">
            <div
              :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', padding: '20px 0', cursor: 'pointer', fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 500, color: openSec === sec.key ? '#2b231e' : '#6f6156', transition: 'color .5s ease' }"
              @click="toggleSection(sec.key)"
            >
              <span>{{ sec.title }}</span>
              <span style="font-size:14px;line-height:1;color:#a3968a">{{ openSec === sec.key ? '−' : '+' }}</span>
            </div>
            <div :style="{ overflow: 'hidden', transition: 'max-height .55s cubic-bezier(.2,.7,.2,1),opacity .45s ease', maxHeight: openSec === sec.key ? '240px' : '0px', opacity: openSec === sec.key ? '1' : '0' }">
              <p style="font-weight:300;font-size:14.5px;line-height:1.9;color:#5c4f47;max-width:52ch;margin:0 0 22px">{{ sec.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section style="margin-top:clamp(56px,8vw,120px)">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding-bottom:22px;border-bottom:1px solid #d8ccc2;margin-bottom:clamp(24px,3.4vw,42px)">
        <h2 style="font-family:'EB Garamond',Georgia,serif;font-weight:400;font-size:clamp(24px,2.4vw,36px);margin:0">Pairs with</h2>
        <NuxtLink to="/shop" class="hover-accent" style="font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156;white-space:nowrap;font-weight:500">All products</NuxtLink>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(max(150px,22%),1fr));gap:clamp(3px,0.3vw,5px)">
        <ProductCard v-for="p in related" :key="p.id" :product="p" aspect="4/5" />
      </div>
    </section>
  </main>
</template>
