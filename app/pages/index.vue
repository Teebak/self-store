<script setup lang="ts">
import { PRODUCTS, FEATURED_IDS } from '~/data/products'

const featured = computed(() => FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)!).filter(Boolean))

const pillars = [
  { label: 'Curation', text: 'A short shelf, replaced only when something better arrives.' },
  { label: 'Advice', text: 'A written routine with every order, from the advisor who packed it.' },
  { label: 'Delivery', text: 'Baghdad same day. Governorates within forty-eight hours.' }
]

const heroVideo = ref<HTMLVideoElement | null>(null)
const videoReady = ref(false)

onMounted(() => {
  const el = heroVideo.value
  if (!el) return
  el.muted = true
  el.addEventListener('loadeddata', () => {
    videoReady.value = true
    const p = el.play()
    if (p && p.catch) p.catch(() => {})
  })
  const load = () => {
    el.preload = 'auto'
    el.src = '/images/selfvid.mp4'
    el.load()
  }
  if (typeof requestIdleCallback === 'function') requestIdleCallback(load, { timeout: 3000 })
  else setTimeout(load, 1200)
})
</script>

<template>
  <main class="page-rise">
    <section style="position:relative;min-height:clamp(540px,86vh,900px);overflow:hidden;background:#ddd0c4;color:#7d6d61;display:flex;flex-direction:column;justify-content:flex-end">
      <div style="position:absolute;inset:0">
        <ImageSlot ph="hero — campaign still, 2400×1400" align="top" src="/images/dior.webp" />
      </div>
      <video
        ref="heroVideo"
        muted loop playsinline preload="none"
        :style="{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .8s ease', opacity: videoReady ? '1' : '0' }"
      />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(43,35,30,0.34) 0%,rgba(43,35,30,0.12) 34%,rgba(43,35,30,0.62) 100%);pointer-events:none" />
      <div style="position:relative;margin-top:auto;padding:0 clamp(20px,5vw,84px);display:flex;justify-content:flex-start;pointer-events:none">
        <div style="font-family:Anton,Impact,sans-serif;font-weight:400;font-size:clamp(76px,18vw,264px);letter-spacing:-0.012em;text-transform:uppercase;line-height:0.82;color:#ffffff;text-shadow:0 2px 44px rgba(43,35,30,0.42);display:inline-block;transform:scaleY(1.1);transform-origin:bottom left">Self.</div>
      </div>
      <div style="position:relative;display:flex;align-items:flex-end;justify-content:space-between;gap:clamp(26px,5vw,72px);flex-wrap:wrap;padding:clamp(40px,7vh,92px) clamp(20px,5vw,84px)">
        <div style="max-width:560px">
          <div style="font-size:9.5px;letter-spacing:0.32em;text-transform:uppercase;color:#f0e7df;margin-bottom:20px;text-shadow:0 1px 14px rgba(43,35,30,0.55)">Autumn Edit — because SELF. love is important</div>
          <h1 style="font-family:'EB Garamond',Georgia,serif;font-weight:400;font-size:clamp(34px,4.6vw,74px);line-height:1;letter-spacing:-0.01em;margin:0;color:#fdfaf7;text-shadow:0 2px 26px rgba(43,35,30,0.5);max-width:20ch">The ritual, refined.</h1>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;text-align:right;gap:22px;max-width:40ch;margin-left:auto">
          <p style="font-weight:300;font-size:clamp(14px,1.05vw,16px);line-height:1.8;color:#f4ece5;margin:0;text-shadow:0 1px 16px rgba(43,35,30,0.6)">Skin, hair and colour chosen the way a counter should choose for you.</p>
          <div style="display:flex;align-items:center;justify-content:flex-end;gap:24px;flex-wrap:wrap">
            <NuxtLink to="/shop" class="btn-primary btn-hero" style="display:inline-flex;align-items:center;gap:12px;padding:16px 30px;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;font-weight:600">Shop the edit</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));background:#efe8e2;border-bottom:1px solid #d8ccc2">
      <div v-for="p in pillars" :key="p.label" style="padding:clamp(30px,4vw,54px) clamp(22px,3vw,44px);border-right:1px solid #ded2c8">
        <div style="font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#6f6156;margin-bottom:16px">{{ p.label }}</div>
        <div style="font-family:'EB Garamond',Georgia,serif;font-size:clamp(17px,1.5vw,22px);line-height:1.4;color:#3b312b">{{ p.text }}</div>
      </div>
    </section>

    <section style="padding:clamp(56px,9vh,120px) clamp(18px,5vw,84px)">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding-bottom:22px;border-bottom:1px solid #d8ccc2;margin-bottom:clamp(28px,4vw,50px)">
        <h2 style="font-family:'EB Garamond',Georgia,serif;font-weight:400;font-size:clamp(26px,2.8vw,42px);margin:0">Chosen this week</h2>
        <NuxtLink to="/shop" class="hover-accent" style="font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156;white-space:nowrap;font-weight:500">All products</NuxtLink>
      </div>
      <ProductSwiper :products="featured" />
    </section>

    <section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));background:#e6dbd1;border-top:1px solid #d8ccc2">
      <div style="position:relative;min-height:clamp(340px,58vh,620px);color:#7d6d61;background:#ddd0c4">
        <ImageSlot ph="editorial — product in hand, 1400×1600" src="/images/summerfridays.jpeg" />
      </div>
      <div style="display:flex;flex-direction:column;justify-content:center;gap:24px;padding:clamp(44px,7vw,96px)">
        <div style="width:42px;height:1px;background:#b4552f" />
        <div style="font-size:9.5px;letter-spacing:0.3em;text-transform:uppercase;color:#6f6156">The House Edit</div>
        <h2 style="font-family:'EB Garamond',Georgia,serif;font-weight:400;font-size:clamp(28px,3.4vw,50px);line-height:1.06;margin:0">Fewer things,<br><em style="font-style:italic;color:#6d5f56">kept better.</em></h2>
        <p style="font-weight:300;font-size:15.5px;line-height:1.85;color:#5c4f47;max-width:44ch;margin:0">Every product here earns its place. An olive soap that leaves skin quiet, a lip oil that reads as skin, a serum that behaves in heat. The shelf is short on purpose, and it changes only when something better arrives.</p>
        <NuxtLink to="/shop" class="hover-accent-underline" style="font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#2b231e;padding-bottom:6px;width:max-content;font-weight:500">Read the edit</NuxtLink>
      </div>
    </section>
  </main>
</template>
