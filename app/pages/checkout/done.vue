<script setup lang="ts">
const { receipt } = useCart()
const router = useRouter()

onMounted(() => {
  if (!receipt.value) router.replace('/shop')
})
</script>

<template>
  <main
    v-if="receipt"
    class="page-rise"
    style="padding:calc(clamp(60px,10vh,120px) + 62px) clamp(18px,5vw,84px) clamp(70px,12vh,150px);display:flex;justify-content:center"
  >
    <div style="max-width:620px;width:100%;text-align:center">
      <div style="font-size:9.5px;letter-spacing:0.3em;text-transform:uppercase;color:#6f6156;margin-bottom:22px">Order confirmed</div>
      <h1 style="font-family:'EB Garamond',Georgia,serif;font-weight:400;font-size:clamp(32px,4.4vw,62px);line-height:1.02;letter-spacing:-0.01em;margin:0">Thank you.<br><em style="font-style:italic;color:#6d5f56">It is on its way.</em></h1>
      <p style="font-weight:300;font-size:15px;line-height:1.9;color:#5c4f47;margin:26px auto 0;max-width:44ch">An advisor calls to confirm before dispatch. Baghdad same day, governorates within forty-eight hours.</p>
      <div style="display:flex;justify-content:center;gap:clamp(26px,4vw,56px);flex-wrap:wrap;margin:clamp(34px,4vw,50px) 0;padding:26px 0;border-top:1px solid #d8ccc2;border-bottom:1px solid #d8ccc2">
        <div style="display:flex;flex-direction:column;gap:8px">
          <span style="font-size:9px;letter-spacing:0.26em;text-transform:uppercase;color:#6f6156">Order</span>
          <span style="font-size:14px;color:#2b231e;font-weight:500;letter-spacing:0.06em">{{ receipt.no }}</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <span style="font-size:9px;letter-spacing:0.26em;text-transform:uppercase;color:#6f6156">Items</span>
          <span style="font-size:14px;color:#2b231e;font-weight:500">{{ receipt.count }}</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <span style="font-size:9px;letter-spacing:0.26em;text-transform:uppercase;color:#6f6156">Paid</span>
          <span style="font-size:14px;color:#b4552f;font-weight:500">{{ receipt.total }}</span>
        </div>
      </div>
      <NuxtLink to="/shop" class="hover-accent-underline" style="display:inline-block;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#2b231e;padding-bottom:6px;cursor:pointer;font-weight:500">Continue shopping</NuxtLink>
    </div>
  </main>
</template>
