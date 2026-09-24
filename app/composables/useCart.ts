import { PRODUCTS, DETAILS } from '~/data/products'

export interface Receipt {
  no: string
  count: string
  total: string
}

interface ShipPayOption {
  key: string
  label: string
  note: string
  cost: string
  border: string
  bg: string
  dot: string
  dotBorder: string
}

const money = (v: number) => v.toLocaleString('en-US') + ' IQD'
const num = (str: string) => parseInt(String(str).replace(/[^0-9]/g, ''), 10) || 0

export function useCart() {
  const cart = useState<Record<number, number>>('cart', () => ({}))
  const ship = useState<'standard' | 'express'>('cart-ship', () => 'standard')
  const pay = useState<'cod' | 'card'>('cart-pay', () => 'cod')
  const receipt = useState<Receipt | null>('cart-receipt', () => null)

  const bag = computed(() => Object.values(cart.value).reduce((t, n) => t + n, 0))

  function addToBag(id: number, n = 1) {
    cart.value = { ...cart.value, [id]: (cart.value[id] || 0) + n }
  }

  function setQty(id: number, n: number) {
    const next = { ...cart.value }
    if (n <= 0) delete next[id]
    else next[id] = Math.min(9, n)
    cart.value = next
  }

  const lines = computed(() => {
    return Object.entries(cart.value).map(([key, qty]) => {
      const id = parseInt(key, 10)
      const p = PRODUCTS.find(x => x.id === id)
      if (!p) return null
      const unit = num(p.price)
      return {
        ...p,
        qty,
        size: DETAILS[id]?.size ?? '',
        each: money(unit) + ' each',
        total: money(unit * qty),
        inc: () => setQty(id, qty + 1),
        dec: () => setQty(id, qty - 1),
        remove: () => setQty(id, 0)
      }
    }).filter((l): l is NonNullable<typeof l> => l !== null)
  })

  const subtotal = computed(() => lines.value.reduce((t, l) => t + num(l.price) * l.qty, 0))
  const baseDelivery = computed(() => (subtotal.value > 0 && subtotal.value < 75000 ? 5000 : 0))
  const shipCost = computed(() => (ship.value === 'express' ? baseDelivery.value + 7500 : baseDelivery.value))

  const cartCount = computed(() => bag.value + (bag.value === 1 ? ' item' : ' items'))
  const subtotalLabel = computed(() => money(subtotal.value))
  const deliveryLabel = computed(() => (baseDelivery.value === 0 ? 'Complimentary' : money(baseDelivery.value)))
  const totalLabel = computed(() => money(subtotal.value + baseDelivery.value))
  const shipLabel = computed(() => (shipCost.value === 0 ? 'Complimentary' : money(shipCost.value)))
  const orderTotalLabel = computed(() => money(subtotal.value + shipCost.value))

  function opt(group: 'ship' | 'pay', key: string, label: string, note: string, cost: string): ShipPayOption {
    const on = (group === 'ship' ? ship.value : pay.value) === key
    return {
      key, label, note, cost,
      border: on ? '#a94d29' : '#d3c6ba',
      bg: on ? '#eee5db' : 'transparent',
      dot: on ? '#a94d29' : 'transparent',
      dotBorder: on ? '#a94d29' : '#c3b5a8'
    }
  }

  const shipOpts = computed<ShipPayOption[]>(() => [
    opt('ship', 'standard', 'Standard', 'Baghdad same day, governorates in 48 hours', baseDelivery.value === 0 ? 'Complimentary' : money(baseDelivery.value)),
    opt('ship', 'express', 'Express', 'Within four hours inside Baghdad', money(baseDelivery.value + 7500))
  ])

  const payOpts = computed<ShipPayOption[]>(() => [
    opt('pay', 'cod', 'Cash on delivery', 'Pay the courier in dinar', ''),
    opt('pay', 'card', 'Card on delivery', 'The courier carries a terminal', '')
  ])

  function placeOrder() {
    if (lines.value.length === 0) return
    receipt.value = {
      no: 'SLF-' + String(Math.floor(Math.random() * 9000) + 1000),
      count: cartCount.value,
      total: orderTotalLabel.value
    }
    cart.value = {}
    return receipt.value
  }

  return {
    cart, ship, pay, receipt, bag,
    lines, addToBag, setQty,
    subtotal, subtotalLabel, deliveryLabel, totalLabel, shipLabel, orderTotalLabel,
    cartCount, shipOpts, payOpts, placeOrder
  }
}
