export interface Product {
  id: number
  brand: string
  name: string
  price: string
  cat: string
  sale?: boolean
  slot: string
  ph: string
  img?: string
}

export interface ProductDetail {
  size: string
  blurb: string
  use: string
  ing: string
  care: string
}

export const PRODUCTS: Product[] = [
  { id: 1, brand: 'Antati', name: 'Olive Cleanser Soap Bar', price: '17,500 IQD', cat: 'Skin', sale: true, slot: 'v2-antati-soap', ph: 'Antati Olive Cleanser Soap Bar', img: '/images/Olive_Oil_Soap_Bar.webp' },
  { id: 2, brand: 'Antati', name: 'Safa Renewal Lip Oil', price: '44,500 IQD', cat: 'Makeup', slot: 'v2-antati-lip', ph: 'Antati Safa Renewal Lip Oil', img: '/images/safa.webp' },
  { id: 3, brand: 'Rhode', name: 'Pocket blush', price: '35,000 IQD', cat: 'Makeup', slot: 'v2-rhode-blush', ph: 'Rhode pocket blush', img: '/images/rhodlip.webp' },
  { id: 5, brand: 'COLOR WOW', name: 'Style on Steroids Color-Safe Texture Spray', price: '50,500 IQD', cat: 'Hair', slot: 'v2-cw-texture', ph: 'COLOR WOW Style on Steroids', img: '/images/styleon.webp' },
  { id: 6, brand: 'COLOR WOW', name: 'Dream Coat Extra Strenth ', price: '40,000 IQD', cat: 'Hair', slot: 'v2-ifran-serum', ph: 'COLOR WOW Velvet Hair Serum', img: '/images/wow.webp' },
  { id: 7, brand: 'rhode', name: 'Peptide Eye Prep Depuffing Eye Patches', price: '36,000 IQD', cat: 'Skin', slot: 'v2-rhode-eye', ph: 'rhode Peptide Eye Prep Patches', img: '/images/rhode.webp' },
  { id: 8, brand: 'COLOR WOW', name: 'Heat Protectant Spray', price: '52,000 IQD', cat: 'Hair', slot: 'v2-ifran-heat', ph: 'COLOR WOW Heat Protectant Spray' }
]

export const CATS = ['All', 'Skin', 'Body', 'Hair', 'Makeup', 'Perfume', 'Lifestyle', 'On Sale']

export const DETAILS: Record<number, ProductDetail> = {
  1: {
    size: '100 g',
    blurb: 'A cold-pressed olive bar for face and body. It lathers low and rinses clean, leaving skin soft rather than tight.',
    use: 'Work into a lather in wet hands, massage over damp skin, rinse with lukewarm water. Morning and evening.',
    ing: 'Sodium olivate, sodium cocoate, aqua, glycerin, olea europaea fruit oil, tocopherol.',
    care: 'Keep the bar dry between uses on a draining dish. Baghdad same-day delivery, governorates within forty-eight hours.'
  },
  2: {
    size: '10 ml',
    blurb: 'A treatment oil that reads as skin. Non-sticky, faintly warm in tone, and comfortable enough to wear over balm at night.',
    use: 'Sweep across bare or made-up lips. Reapply through the day, or layer generously before bed.',
    ing: 'Ricinus communis seed oil, hydrogenated polyisobutene, squalane, tocopherol, aroma.',
    care: 'Store away from direct sun. Baghdad same-day delivery, governorates within forty-eight hours.'
  },
  3: {
    size: '4.5 g',
    blurb: 'A cream-to-powder blush in a slim pocket case. Buildable in thin layers, matte at the edges, no visible line where it stops.',
    use: 'Tap onto the high point of the cheek and blend outward with a fingertip. Build in two or three passes.',
    ing: 'Isododecane, dimethicone, silica, mica, tocopheryl acetate, iron oxides.',
    care: 'Close firmly after use. Baghdad same-day delivery, governorates within forty-eight hours.'
  },
  5: {
    size: '262 ml',
    blurb: 'A texture spray with grip rather than crunch. Adds body at the root and holds a shape through heat without dulling colour.',
    use: 'Shake, hold twenty centimetres from dry hair and mist in sections. Break the shape up with your fingers.',
    ing: 'Alcohol denat., aqua, VP/VA copolymer, panthenol, parfum.',
    care: 'Flammable — keep from open flame. Baghdad same-day delivery, governorates within forty-eight hours.'
  },
  6: {
    size: '200 ml',
    blurb: 'The stronger Dream Coat. A single application seals the cuticle against humidity and keeps hair smooth for several washes.',
    use: 'Mist evenly through damp, towel-dried hair, comb through, then blow-dry fully to activate. Repeat every three to four washes.',
    ing: 'Aqua, dimethicone, cyclopentasiloxane, polysilicone-29, PEG-12 dimethicone, parfum.',
    care: 'Heat is required for the treatment to set. Baghdad same-day delivery, governorates within forty-eight hours.'
  },
  7: {
    size: '8 pairs',
    blurb: 'Hydrogel patches for the morning after a short night. Cool on contact, they sit close to the skin and stay put while you get ready.',
    use: 'Press one patch under each eye on clean, dry skin. Leave ten to fifteen minutes, then pat in what remains.',
    ing: 'Aqua, glycerin, butylene glycol, caffeine, palmitoyl tripeptide-1, sodium hyaluronate.',
    care: 'Single use. Refrigerate for a colder finish. Baghdad same-day delivery, governorates within forty-eight hours.'
  },
  8: {
    size: '200 ml',
    blurb: 'Heat protection up to 232°C in a light mist. It does not weigh hair down or leave the coating that most protectants do.',
    use: 'Mist through damp or dry hair before any hot tool, section by section, then style as usual.',
    ing: 'Aqua, cyclopentasiloxane, dimethicone, hydrolyzed keratin, panthenol, parfum.',
    care: 'Shake before use. Baghdad same-day delivery, governorates within forty-eight hours.'
  }
}

export const FEATURED_IDS = [2, 3, 6, 1, 7, 5, 8]
