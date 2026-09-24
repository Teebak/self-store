<script setup lang="ts">
const { lines, ship, pay, shipOpts, payOpts, cartCount, subtotalLabel, shipLabel, orderTotalLabel, placeOrder } = useCart()
const router = useRouter()

function submit() {
  const receipt = placeOrder()
  if (receipt) router.push('/checkout/done')
}
</script>

<template>
  <main class="page-rise" style="padding:calc(clamp(34px,5vh,70px) + 62px) clamp(18px,5vw,84px) clamp(56px,9vh,120px)">
    <div style="display:flex;align-items:center;gap:12px;font-size:9.5px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156;margin-bottom:clamp(22px,3vw,34px)">
      <NuxtLink to="/cart" class="hover-accent" style="cursor:pointer">The Bag</NuxtLink>
      <span style="color:#bdb0a4">/</span>
      <span style="color:#3b312b">Checkout</span>
    </div>

    <div style="display:grid;grid-template-columns:minmax(0,1.6fr) minmax(300px,0.9fr);gap:clamp(30px,4vw,80px);align-items:start">
      <div>
        <h1 style="font-family:'EB Garamond',Georgia,serif;font-weight:400;font-size:clamp(32px,4vw,58px);line-height:1;margin:0 0 clamp(30px,4vw,48px)">Checkout</h1>

        <div style="display:flex;flex-direction:column;gap:clamp(30px,3.4vw,46px)">
          <div>
            <div style="display:flex;align-items:baseline;gap:14px;padding-bottom:16px;border-bottom:1px solid #d8ccc2;margin-bottom:24px">
              <span style="font-size:9.5px;letter-spacing:0.24em;color:#a3968a">01</span>
              <span style="font-size:10px;letter-spacing:0.26em;text-transform:uppercase;font-weight:500;color:#2b231e">Contact</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">
              <label style="display:flex;flex-direction:column;gap:9px">
                <span style="font-size:9px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156">Full name</span>
                <input type="text" placeholder="Name and surname" class="form-input">
              </label>
              <label style="display:flex;flex-direction:column;gap:9px">
                <span style="font-size:9px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156">Mobile</span>
                <input type="tel" placeholder="07XX XXX XXXX" class="form-input">
              </label>
            </div>
          </div>

          <div>
            <div style="display:flex;align-items:baseline;gap:14px;padding-bottom:16px;border-bottom:1px solid #d8ccc2;margin-bottom:24px">
              <span style="font-size:9.5px;letter-spacing:0.24em;color:#a3968a">02</span>
              <span style="font-size:10px;letter-spacing:0.26em;text-transform:uppercase;font-weight:500;color:#2b231e">Delivery</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;margin-bottom:20px">
              <div
                v-for="o in shipOpts" :key="o.key"
                :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', padding: '17px 18px', border: '1px solid', borderRadius: '4px', cursor: 'pointer', transition: 'border-color .4s ease,background .4s ease', borderColor: o.border, background: o.bg }"
                @click="ship = o.key as 'standard' | 'express'"
              >
                <div style="display:flex;align-items:center;gap:14px;min-width:0">
                  <span :style="{ width: '13px', height: '13px', borderRadius: '50%', border: `1px solid ${o.dotBorder}`, flex: 'none', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }">
                    <span :style="{ width: '7px', height: '7px', borderRadius: '50%', transition: 'background .4s ease', background: o.dot }" />
                  </span>
                  <div style="display:flex;flex-direction:column;gap:5px;min-width:0">
                    <span style="font-size:12.5px;color:#2b231e;font-weight:500">{{ o.label }}</span>
                    <span style="font-size:11.5px;font-weight:300;color:#6d5f56">{{ o.note }}</span>
                  </div>
                </div>
                <span style="font-size:11.5px;color:#b4552f;font-weight:500;white-space:nowrap">{{ o.cost }}</span>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">
              <label style="display:flex;flex-direction:column;gap:9px">
                <span style="font-size:9px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156">City</span>
                <input type="text" placeholder="Baghdad" class="form-input">
              </label>
              <label style="display:flex;flex-direction:column;gap:9px">
                <span style="font-size:9px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156">Area</span>
                <input type="text" placeholder="District and nearest landmark" class="form-input">
              </label>
              <label style="display:flex;flex-direction:column;gap:9px;grid-column:1/-1">
                <span style="font-size:9px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156">Address</span>
                <input type="text" placeholder="Street, building, floor" class="form-input">
              </label>
            </div>
          </div>

          <div>
            <div style="display:flex;align-items:baseline;gap:14px;padding-bottom:16px;border-bottom:1px solid #d8ccc2;margin-bottom:24px">
              <span style="font-size:9.5px;letter-spacing:0.24em;color:#a3968a">03</span>
              <span style="font-size:10px;letter-spacing:0.26em;text-transform:uppercase;font-weight:500;color:#2b231e">Payment</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px">
              <div
                v-for="o in payOpts" :key="o.key"
                :style="{ display: 'flex', alignItems: 'center', gap: '14px', padding: '17px 18px', border: '1px solid', borderRadius: '4px', cursor: 'pointer', transition: 'border-color .4s ease,background .4s ease', borderColor: o.border, background: o.bg }"
                @click="pay = o.key as 'cod' | 'card'"
              >
                <span :style="{ width: '13px', height: '13px', borderRadius: '50%', border: `1px solid ${o.dotBorder}`, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }">
                  <span :style="{ width: '7px', height: '7px', borderRadius: '50%', transition: 'background .4s ease', background: o.dot }" />
                </span>
                <div style="display:flex;flex-direction:column;gap:5px;min-width:0">
                  <span style="font-size:12.5px;color:#2b231e;font-weight:500">{{ o.label }}</span>
                  <span style="font-size:11.5px;font-weight:300;color:#6d5f56">{{ o.note }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="background:#e6dbd1;border-radius:4px;padding:clamp(26px,2.6vw,38px)">
        <div style="font-size:9.5px;letter-spacing:0.3em;text-transform:uppercase;color:#6f6156;margin-bottom:24px">Order — {{ cartCount }}</div>
        <div style="display:flex;flex-direction:column;gap:16px;padding-bottom:22px;border-bottom:1px solid #d3c6ba">
          <div v-for="l in lines" :key="l.id" style="display:grid;grid-template-columns:52px minmax(0,1fr) auto;gap:14px;align-items:center">
            <div style="aspect-ratio:1/1;overflow:hidden;border-radius:3px;background:#ddd0c4;color:#7d6d61">
              <ImageSlot :ph="l.ph" :src="l.img" />
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;min-width:0">
              <span style="font-size:12.5px;font-family:'EB Garamond',Georgia,serif;color:#2b231e;line-height:1.3">{{ l.name }}</span>
              <span style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#6f6156">×{{ l.qty }}</span>
            </div>
            <span style="font-size:12px;color:#b4552f;font-weight:500;white-space:nowrap">{{ l.total }}</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:15px;font-size:13px;color:#5c4f47;font-weight:300;padding-top:22px">
          <div style="display:flex;justify-content:space-between;gap:16px"><span>Subtotal</span><span style="color:#2b231e">{{ subtotalLabel }}</span></div>
          <div style="display:flex;justify-content:space-between;gap:16px"><span>Delivery</span><span style="color:#2b231e">{{ shipLabel }}</span></div>
        </div>
        <div style="display:flex;justify-content:space-between;gap:16px;align-items:baseline;margin-top:24px;padding-top:22px;border-top:1px solid #d3c6ba">
          <span style="font-size:10px;letter-spacing:0.24em;text-transform:uppercase;color:#6f6156">Total</span>
          <span style="font-family:'EB Garamond',Georgia,serif;font-size:clamp(22px,2vw,30px);color:#2b231e">{{ orderTotalLabel }}</span>
        </div>
        <span class="btn-primary" style="display:flex;align-items:center;justify-content:center;border-radius:4px;height:54px;margin-top:26px;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;font-weight:600" @click="submit">Place order</span>
        <p style="font-weight:300;font-size:12px;line-height:1.8;color:#6d5f56;margin:20px 0 0">An advisor calls to confirm before dispatch. Returns accepted unopened within fourteen days.</p>
      </div>
    </div>
  </main>
</template>
