import { PRODUCTS } from '~/data/products'

export function useSearch() {
  const searching = useState('search-open', () => false)
  const query = useState('search-query', () => '')

  function openSearch() {
    searching.value = true
  }

  function closeSearch() {
    searching.value = false
    query.value = ''
  }

  const results = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return []
    return PRODUCTS.filter(p => (p.brand + ' ' + p.name + ' ' + p.cat).toLowerCase().includes(q))
  })

  const suggestions = ['Antati', 'rhode', 'COLOR WOW', 'Lip oil', 'Heat protectant']

  return { searching, query, openSearch, closeSearch, results, suggestions }
}
