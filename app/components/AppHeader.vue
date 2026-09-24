<script setup lang="ts">
const route = useRoute()
const { bag } = useCart()
const { openSearch } = useSearch()

const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 40
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const solid = computed(() => scrolled.value || route.path !== '/')

const hdrBg = computed(() => (solid.value ? 'rgba(239,232,226,0.92)' : 'transparent'))
const hdrBlur = computed(() => (solid.value ? 'blur(12px)' : 'none'))
const hdrBorder = computed(() => (solid.value ? '#d8ccc2' : 'transparent'))
const hdrText = computed(() => (solid.value ? '#6d5f56' : 'rgba(255,255,255,0.82)'))
const hdrMarkOp = computed(() => (solid.value ? '1' : '0'))
const hdrMarkPe = computed(() => (solid.value ? 'auto' : 'none'))
const hdrHover = computed(() => (solid.value ? '#2b231e' : '#ffffff'))
const bagColor = computed(() => (bag.value > 0 ? (solid.value ? '#b4552f' : '#f0c3ae') : (solid.value ? '#6d5f56' : 'rgba(255,255,255,0.82)')))

const navLinks = ['Skin', 'Body', 'Hair', 'Makeup', 'Perfume', 'Lifestyle']

// Mobile side menu
const menuOpen = ref(false)
function closeMenu() {
  menuOpen.value = false
}
function searchFromMenu() {
  closeMenu()
  openSearch()
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMenu()
}
watch(() => route.fullPath, closeMenu)
watch(menuOpen, (v) => {
  document.documentElement.style.overflow = v ? 'hidden' : ''
})
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header
    :style="{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '20px',
      padding: '16px clamp(18px,4vw,54px)',
      transition: 'background .55s ease,border-color .55s ease,backdrop-filter .55s ease',
      borderBottom: '1px solid', background: hdrBg, backdropFilter: hdrBlur, borderBottomColor: hdrBorder
    }"
  >
    <button
      type="button"
      class="burger"
      aria-label="Open menu"
      :aria-expanded="menuOpen"
      aria-controls="mobile-menu"
      :style="{ color: hdrText }"
      @click="menuOpen = true"
    >
      <span /><span /><span />
    </button>
    <nav
      class="desktop-nav"
      :style="{ display: 'flex', gap: 'clamp(11px,1.7vw,26px)', fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 500, color: hdrText, '--header-hover-color': hdrHover }"
    >
      <NuxtLink
        v-for="l in navLinks" :key="l"
        :to="{ path: '/shop', query: { cat: l } }"
        class="nav-link"
        style="cursor:pointer;padding-bottom:3px;white-space:nowrap;color:inherit"
      >{{ l }}</NuxtLink>
    </nav>
    <NuxtLink
      to="/"
      :style="{
        fontFamily: 'Anton,Impact,sans-serif', fontWeight: 400, fontSize: 'clamp(21px,2.2vw,27px)',
        letterSpacing: '-0.01em', textTransform: 'uppercase', cursor: 'pointer', userSelect: 'none',
        lineHeight: 1, display: 'inline-block', transform: 'scaleY(1.08)', transformOrigin: 'center',
        transition: 'color .55s ease,opacity .45s ease',
        color: '#2b231e', opacity: hdrMarkOp, pointerEvents: hdrMarkPe
      }"
    >Self.</NuxtLink>
    <div
      :style="{ display: 'flex', justifyContent: 'flex-end', gap: 'clamp(14px,2vw,26px)', fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', fontWeight: 500, color: hdrText, '--header-hover-color': hdrHover }"
    >
      <span class="header-link desktop-only" style="cursor:pointer" @click="openSearch">Search</span>
      <NuxtLink to="/cart" class="header-link" :style="{ cursor: 'pointer', color: bagColor }">Bag ({{ bag }})</NuxtLink>
    </div>
  </header>

  <!-- Mobile side menu -->
  <div class="menu-root" :class="{ open: menuOpen }" :aria-hidden="!menuOpen">
    <div class="menu-scrim" @click="closeMenu" />
    <aside id="mobile-menu" class="menu-panel" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="menu-top">
        <NuxtLink to="/" class="menu-mark" @click="closeMenu">Self.</NuxtLink>
        <button type="button" class="menu-close hover-accent" aria-label="Close menu" @click="closeMenu">Close</button>
      </div>
      <div class="menu-label">Shop</div>
      <nav class="menu-links">
        <NuxtLink
          v-for="(l, i) in navLinks" :key="l"
          :to="{ path: '/shop', query: { cat: l } }"
          class="menu-link"
          :style="{ transitionDelay: menuOpen ? `${0.12 + i * 0.04}s` : '0s' }"
          @click="closeMenu"
        >{{ l }}</NuxtLink>
      </nav>
      <div class="menu-foot">
        <button type="button" class="menu-foot-link hover-accent" @click="searchFromMenu">Search</button>
        <NuxtLink to="/cart" class="menu-foot-link hover-accent" @click="closeMenu">Bag ({{ bag }})</NuxtLink>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.burger {
  display: none;
  width: 28px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  justify-self: start;
  transition: color 0.55s ease;
}
.burger span {
  position: absolute;
  left: 0;
  height: 1px;
  background: currentColor;
}
.burger span:nth-child(1) { top: 3px; width: 24px; }
.burger span:nth-child(2) { top: 10px; width: 18px; }
.burger span:nth-child(3) { top: 17px; width: 24px; }

@media (max-width: 760px) {
  .burger { display: block; }
  .desktop-nav, .desktop-only { display: none !important; }
}

.menu-root {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
}
.menu-root.open { pointer-events: auto; }

.menu-scrim {
  position: absolute;
  inset: 0;
  background: rgba(43, 35, 30, 0.42);
  backdrop-filter: blur(3px);
  opacity: 0;
  transition: opacity 0.45s ease;
}
.menu-root.open .menu-scrim { opacity: 1; }

.menu-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: min(84vw, 360px);
  background: #efe8e2;
  border-right: 1px solid #d8ccc2;
  display: flex;
  flex-direction: column;
  padding: 18px 24px 28px;
  transform: translateX(-101%);
  transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
  overflow-y: auto;
}
.menu-root.open .menu-panel { transform: none; }

.menu-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 18px;
  border-bottom: 1px solid #d3c6ba;
}
.menu-mark {
  font-family: Anton, Impact, sans-serif;
  font-size: 24px;
  text-transform: uppercase;
  color: #2b231e;
  line-height: 1;
  display: inline-block;
  transform: scaleY(1.08);
}
.menu-close,
.menu-foot-link {
  border: none;
  background: transparent;
  padding: 0;
  font-family: inherit;
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-weight: 500;
  color: #6f6156;
  cursor: pointer;
}

.menu-label {
  font-size: 9.5px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: #6f6156;
  padding: 28px 0 10px;
}
.menu-links {
  display: flex;
  flex-direction: column;
}
.menu-link {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 30px;
  line-height: 1.2;
  color: #2b231e;
  padding: 10px 0;
  border-bottom: 1px solid #ded2c8;
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity 0.45s ease, transform 0.45s ease, color 0.4s ease;
}
.menu-root.open .menu-link { opacity: 1; transform: none; }
.menu-link:hover { color: #b4552f; }

.menu-foot {
  margin-top: auto;
  padding-top: 28px;
  display: flex;
  gap: 26px;
}
</style>
