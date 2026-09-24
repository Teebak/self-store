<script setup lang="ts">
const { searching, query, closeSearch, results, suggestions } = useSearch()
const router = useRouter()
const inputRef = ref<HTMLInputElement | null>(null)

watch(searching, (v) => {
  if (v) nextTick(() => inputRef.value?.focus())
})

function openProduct(id: number) {
  closeSearch()
  router.push(`/product/${id}`)
}

function pickSuggestion(name: string) {
  query.value = name
  inputRef.value?.focus()
}
</script>

<template>
  <div :style="{ position: 'fixed', inset: 0, zIndex: 60, transition: 'opacity .45s ease', opacity: searching ? '1' : '0', pointerEvents: searching ? 'auto' : 'none' }">
    <div style="position:absolute;inset:0;background:rgba(43,35,30,0.42);backdrop-filter:blur(3px)" @click="closeSearch" />
    <div
      :style="{
        position: 'relative', background: '#efe8e2', borderBottom: '1px solid #d8ccc2',
        padding: 'clamp(22px,3vw,34px) clamp(18px,5vw,84px) clamp(20px,2.6vw,30px)',
        transition: 'transform .5s cubic-bezier(.2,.7,.2,1)',
        transform: searching ? 'translateY(0)' : 'translateY(-101%)',
        maxHeight: '86vh', overflowY: 'auto'
      }"
    >
      <div style="display:flex;align-items:center;gap:20px;border-bottom:1px solid #d3c6ba;padding-bottom:14px">
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          placeholder="Search brands and products"
          style="flex:1;border:none;background:transparent;outline:none;font-family:'EB Garamond',Georgia,serif;font-size:clamp(22px,3vw,42px);color:#2b231e;padding:0"
        >
        <span class="hover-accent" style="font-size:9.5px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156;cursor:pointer;white-space:nowrap" @click="closeSearch">Close</span>
      </div>

      <div v-if="query.trim().length > 0">
        <div style="font-size:9.5px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156;padding:22px 0 4px">
          {{ results.length }} {{ results.length === 1 ? 'result' : 'results' }}
        </div>
        <div style="display:flex;flex-direction:column">
          <div
            v-for="r in results" :key="r.id"
            style="display:grid;grid-template-columns:56px minmax(0,1fr) auto;gap:18px;align-items:center;padding:14px 0;border-bottom:1px solid #ded2c8;cursor:pointer"
            @click="openProduct(r.id)"
          >
            <div style="aspect-ratio:1/1;overflow:hidden;border-radius:3px;background:#e2d6ca;color:#7d6d61">
              <ImageSlot :ph="r.ph" :src="r.img" />
            </div>
            <div style="display:flex;flex-direction:column;gap:5px;min-width:0">
              <span style="font-size:9px;letter-spacing:0.26em;text-transform:uppercase;color:#6f6156">{{ r.brand }}</span>
              <span style="font-family:'EB Garamond',Georgia,serif;font-size:16px;line-height:1.3;color:#2b231e">{{ r.name }}</span>
            </div>
            <span style="font-size:12px;color:#b4552f;font-weight:500;white-space:nowrap">{{ r.price }}</span>
          </div>
        </div>
      </div>

      <div v-else style="padding:24px 0 4px">
        <div style="font-size:9.5px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156;margin-bottom:16px">Popular</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <span
            v-for="sg in suggestions" :key="sg"
            style="font-size:11px;letter-spacing:0.06em;color:#5c4f47;border:1px solid #d3c6ba;border-radius:999px;padding:9px 16px;cursor:pointer;transition:border-color .4s ease,color .4s ease"
            @click="pickSuggestion(sg)"
          >{{ sg }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
