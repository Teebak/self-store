<script setup lang="ts">
import { PRODUCTS, FEATURED_IDS } from '~/data/products'

const featured = computed(() => FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)!).filter(Boolean))

const pillars = [
  { label: 'Curation', text: 'A short shelf, replaced only when something better arrives.' },
  { label: 'Advice', text: 'A written routine with every order, from the advisor who packed it.' },
  { label: 'Delivery', text: 'Baghdad same day. Governorates within forty-eight hours.' }
]

// Mobile pillar rotator (desktop shows all three; the index is simply ignored there)
const activePillar = ref(0)
let pillarTimer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  pillarTimer = setInterval(() => {
    activePillar.value = (activePillar.value + 1) % pillars.length
  }, 4000)
})
onUnmounted(() => clearInterval(pillarTimer))

// Tiny copy of the hero video's first frame, shown blurred until the video can play
const heroPoster = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAfAEADASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAABgcCAwQF/8QALhAAAgECBAMHAwUAAAAAAAAAAQIDBBEABRIhEzFBBgciUWFxgZGhsRQVJTJS/8QAGAEBAAMBAAAAAAAAAAAAAAAABAECAwX/xAAcEQADAQADAQEAAAAAAAAAAAAAAQIRAxIhE1H/2gAMAwEAAhEDEQA/AGGYfTEDT3wrVzzN5WH8xUi43HGbb74r/f8AM5JFQZrVEFufHYX9OeLlNGm8eiJhiUe8Y+PycC3ZKomqI8weaSR/Gmku+o8jjf2hkzZcoK5QgMjGzuGAZF8xf88x08xhb9NoW+Ar22zFanMtCSLZGZNOrcEbG49/nbATWiQNqbdTywSZrGlElLQmKMzRxh5XsCdbC5F+tthe/THMlhjkiIkF7csHVKa0U4dThw154a3dnVmXI56VmcmCXUoJuFVhsB8hj84WlUiJTq2gI2ogC1jbB93WG0WZJY3HCO/rrxu32WhuvV4Dz5PUl9IIuN7G/L6YhBl0yHiBS5Teym3xjC1NU1K3lq5pCejG/wCTjVRdnJay3DnS/UG4IxP1T80r8q/A27ImRKSr4yBGPD2+GxbmOeRVNU2TxuEjdH48/MqApLAeu3PpgZySjagrHi/VywiRlBZArq9jyIIuOZ3GKayNVzFwzNMBJ4i+xN9yDb1vywbl5Glsi+DjW5RVUUpCI3iAQlF1m7kA3BPlsdvb0xnnSwscaKiq49Qr6AlgiW53AUL97YrqSggUgNrJNzfa3t73wfXorFgP1ZY1B1En3OGb3YwKmR1ExSzyTaS3+gFBA+NR+uF3UU4mcWsC2wJ88H/djNqoKyBpPHFKLx2/rcWvfrfT9vXdyaco51Jqmf/Z'

// Hero video sources, rendered into the HTML so the download starts before the app hydrates.
// The browser takes the first one whose media query and codec it supports.
// HEVC gives equal-or-better quality at a smaller size; H.264 is the fallback (e.g. Firefox).
const videoBase = useRuntimeConfig().app.baseURL.replace(/\/$/, '') + '/images/'
const heroSources = [
  { file: 'hero-sm-hevc.mp4', media: '(max-width: 900px)', type: 'video/mp4; codecs="hvc1.1.6.L120.B0"' }, // 1.2 MB
  { file: 'hero-1280.mp4', media: '(max-width: 900px)', type: 'video/mp4; codecs="avc1.4d001f"' }, // 2.1 MB
  { file: 'hero-lg-hevc.mp4', media: undefined, type: 'video/mp4; codecs="hvc1.1.6.L120.B0"' }, // 3.2 MB
  { file: 'hero-1920.mp4', media: undefined, type: 'video/mp4' } // 3.8 MB
]

const heroVideo = ref<HTMLVideoElement | null>(null)
const videoReady = ref(false)

onMounted(() => {
  const el = heroVideo.value
  if (!el) return
  el.muted = true
  // Fade in only once frames are actually playing, not just when the first one decodes
  const reveal = () => { videoReady.value = true }
  if (!el.paused && el.readyState >= 3) reveal()
  else el.addEventListener('playing', reveal, { once: true })
  // Autoplay normally starts it; this covers browsers that waited for hydration
  const p = el.play()
  if (p && p.catch) p.catch(() => {})
})
</script>

<template>
  <main class="page-rise">
    <section style="position:relative;min-height:clamp(540px,86vh,900px);overflow:hidden;background:#ddd0c4;color:#7d6d61;display:flex;flex-direction:column;justify-content:flex-end">
      <div
        :style="{ position: 'absolute', inset: '-40px', backgroundImage: `url(${heroPoster})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(18px)' }"
      />
      <video
        ref="heroVideo"
        muted autoplay loop playsinline preload="auto"
        :style="{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .8s ease', opacity: videoReady ? '1' : '0' }"
      >
        <source v-for="s in heroSources" :key="s.file" :src="videoBase + s.file" :media="s.media" :type="s.type">
      </video>
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

    <section class="pillars" style="background:#efe8e2;border-bottom:1px solid #d8ccc2">
      <div class="pillars-track">
        <div
          v-for="(p, i) in pillars" :key="p.label"
          class="pillar" :class="{ active: i === activePillar }"
          style="padding:clamp(30px,4vw,54px) clamp(22px,3vw,44px);border-right:1px solid #ded2c8"
        >
          <div style="font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#6f6156;margin-bottom:16px">{{ p.label }}</div>
          <div style="font-family:'EB Garamond',Georgia,serif;font-size:clamp(17px,1.5vw,22px);line-height:1.4;color:#3b312b">{{ p.text }}</div>
        </div>
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

<style scoped>
.pillars-track {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

/* Mobile: one block that cycles through the three pillars */
@media (max-width: 760px) {
  .pillars-track { grid-template-columns: 1fr; }
  .pillar {
    grid-area: 1 / 1;
    border-right: none !important;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.7s ease, transform 0.7s ease;
    pointer-events: none;
  }
  .pillar.active {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }
}
</style>
