<script setup lang="ts">
const { lines, cartCount, subtotalLabel, deliveryLabel, totalLabel } = useCart()
const router = useRouter()

function goCheckout() {
  router.push('/checkout')
}
</script>

<template>
  <main class="page-rise" style="padding:calc(clamp(34px,5vh,70px) + 62px) clamp(18px,5vw,84px) clamp(56px,9vh,120px)">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:30px;flex-wrap:wrap;padding-bottom:22px;border-bottom:1px solid #d8ccc2;margin-bottom:clamp(26px,4vw,46px)">
      <div>
        <div style="font-size:9.5px;letter-spacing:0.3em;text-transform:uppercase;color:#6f6156;margin-bottom:16px">Your bag</div>
        <h1 style="font-family:'EB Garamond',Georgia,serif;font-weight:400;font-size:clamp(38px,5.2vw,72px);line-height:1;margin:0">The Bag</h1>
      </div>
      <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#6f6156">{{ cartCount }}</div>
    </div>

    <div v-if="lines.length > 0" style="display:grid;grid-template-columns:minmax(0,1.9fr) minmax(280px,0.9fr);gap:clamp(28px,4vw,72px);align-items:start">
      <div>
        <div
          v-for="l in lines" :key="l.id"
          style="display:grid;grid-template-columns:clamp(84px,9vw,124px) minmax(0,1fr) auto;gap:clamp(16px,2.2vw,32px);align-items:start;padding:clamp(20px,2.4vw,30px) 0;border-bottom:1px solid #ded2c8"
        >
          <NuxtLink :to="`/product/${l.id}`" style="aspect-ratio:4/5;overflow:hidden;border-radius:4px;background:#ece4dd;color:#7d6d61;cursor:pointer;display:block">
            <ImageSlot :ph="l.ph" :src="l.img" />
          </NuxtLink>
          <div style="display:flex;flex-direction:column;gap:9px;min-width:0">
            <div style="font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:#6f6156">{{ l.brand }}</div>
            <NuxtLink :to="`/product/${l.id}`" class="hover-accent" style="font-family:'EB Garamond',Georgia,serif;font-size:clamp(16px,1.5vw,21px);line-height:1.3;color:#2b231e;cursor:pointer">{{ l.name }}</NuxtLink>
            <div style="font-size:9.5px;letter-spacing:0.2em;text-transform:uppercase;color:#6f6156">{{ l.size }}</div>
            <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-top:8px">
              <div style="display:flex;align-items:center;gap:2px;border:1px solid #d3c6ba;border-radius:4px">
                <span style="display:flex;align-items:center;justify-content:center;width:38px;height:40px;font-size:14px;color:#6f6156;cursor:pointer;user-select:none" @click="l.dec">−</span>
                <span style="min-width:22px;text-align:center;font-size:12.5px;color:#2b231e;font-weight:500">{{ l.qty }}</span>
                <span style="display:flex;align-items:center;justify-content:center;width:38px;height:40px;font-size:14px;color:#6f6156;cursor:pointer;user-select:none" @click="l.inc">+</span>
              </div>
              <span class="hover-accent-underline" style="font-size:9.5px;letter-spacing:0.2em;text-transform:uppercase;color:#8d7f74;cursor:pointer;padding-bottom:3px" @click="l.remove">Remove</span>
            </div>
          </div>
          <div style="text-align:right;display:flex;flex-direction:column;gap:7px;white-space:nowrap">
            <div style="font-size:13px;letter-spacing:0.04em;color:#b4552f;font-weight:500">{{ l.total }}</div>
            <div style="font-size:10px;color:#8d7f74">{{ l.each }}</div>
          </div>
        </div>

        <div style="padding-top:26px">
          <NuxtLink to="/shop" class="hover-accent-underline" style="font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#2b231e;padding-bottom:6px;cursor:pointer;font-weight:500">Continue shopping</NuxtLink>
        </div>
      </div>

      <div style="background:#e6dbd1;border-radius:4px;padding:clamp(26px,2.6vw,38px)">
        <div style="font-size:9.5px;letter-spacing:0.3em;text-transform:uppercase;color:#6f6156;margin-bottom:26px">Summary</div>
        <div style="display:flex;flex-direction:column;gap:15px;font-size:13px;color:#5c4f47;font-weight:300">
          <div style="display:flex;justify-content:space-between;gap:16px"><span>Subtotal</span><span style="color:#2b231e">{{ subtotalLabel }}</span></div>
          <div style="display:flex;justify-content:space-between;gap:16px"><span>Delivery</span><span style="color:#2b231e">{{ deliveryLabel }}</span></div>
        </div>
        <div style="display:flex;justify-content:space-between;gap:16px;align-items:baseline;margin-top:24px;padding-top:22px;border-top:1px solid #d3c6ba">
          <span style="font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156">Total</span>
          <span style="font-family:'EB Garamond',Georgia,serif;font-size:clamp(22px,2vw,30px);color:#2b231e">{{ totalLabel }}</span>
        </div>
        <span class="btn-primary" style="display:flex;align-items:center;justify-content:center;border-radius:4px;height:54px;margin-top:26px;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;font-weight:600" @click="goCheckout">Checkout</span>
        <p style="font-weight:300;font-size:12px;line-height:1.8;color:#6d5f56;margin:20px 0 0">Baghdad same day. Governorates within forty-eight hours. Cash or card on delivery.</p>
      </div>
    </div>

    <div v-else style="padding:clamp(60px,12vh,140px) 0;text-align:center">
      <div style="font-family:'EB Garamond',Georgia,serif;font-size:clamp(22px,2.4vw,34px);color:#5c4f47;margin-bottom:22px">Your bag is empty.</div>
      <NuxtLink to="/shop" class="hover-accent-underline" style="display:inline-block;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#2b231e;padding-bottom:6px;cursor:pointer;font-weight:500">Shop the shelf</NuxtLink>
    </div>
  </main>
</template>
