<script setup lang="ts">
const footerCols = [
  { title: 'Shop', items: ['Skin', 'Body', 'Hair', 'Makeup', 'Perfume', 'Lifestyle'] },
  { title: 'House', items: ['Our story', 'Iraq Mall', 'Dijlah Village', 'VIP Baghdad Airport'] },
  { title: 'Care', items: ['Delivery', 'Returns', 'Contact', 'WhatsApp'] }
]
</script>

<template>
  <footer style="border-top:1px solid #d8ccc2;background:#e6dbd1;padding:clamp(44px,6vh,74px) clamp(18px,5vw,84px) 36px">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:clamp(26px,4vw,58px);margin-bottom:46px">
      <div>
        <div style="font-family:Anton,Impact,sans-serif;font-weight:400;font-size:24px;letter-spacing:-0.01em;text-transform:uppercase;margin-bottom:14px;display:inline-block;transform:scaleY(1.08);transform-origin:bottom left">Self.</div>
        <div style="font-weight:300;font-size:13px;line-height:1.8;color:#6d5f56;max-width:30ch">Beauty, kept simple. Baghdad and online.</div>
      </div>
      <div v-for="col in footerCols" :key="col.title">
        <div style="font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:#6f6156;margin-bottom:18px">{{ col.title }}</div>
        <div style="display:flex;flex-direction:column;gap:11px">
          <span v-for="it in col.items" :key="it" class="hover-accent" style="font-size:13px;font-weight:300;color:#5c4f47;cursor:pointer">{{ it }}</span>
        </div>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;padding-top:24px;border-top:1px solid #d8ccc2;font-size:9.5px;letter-spacing:0.2em;text-transform:uppercase;color:#6f6156">
      <span>© 2026 Self</span>
      <span>Iraq Mall | Dijlah Village | VIP Baghdad Airport</span>
    </div>
  </footer>
</template>
