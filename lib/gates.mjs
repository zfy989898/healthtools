import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const dist = join(ROOT, 'dist')

const CJK = /[\u3400-\u9fff\uf900-\ufaff\u3000-\u303f\uff01-\uff5e]/
const STOP = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'your', 'are', 'not', 'you'])

const text = html => html.replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

const shingles = (s, n = 5) => {
  const w = s.toLowerCase().split(/[^a-z0-9]+/).filter(x => x && !STOP.has(x))
  const out = new Set()
  for (let i = 0; i + n <= w.length; i++) out.add(w.slice(i, i + n).join(' '))
  return out
}

const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0
  let inter = 0
  const [small, big] = a.size < b.size ? [a, b] : [b, a]
  for (const x of small) if (big.has(x)) inter++
  return inter / (a.size + b.size - inter)
}

const REQUIRED = [
  [/<html lang="en"/, 'lang="en"'],
  [/<title>[^<]{15,70}<\/title>/, 'title between 15 and 70 chars'],
  [/<meta name="description" content="[^"]{60,175}">/, 'meta description between 60 and 175 chars'],
  [/<link rel="canonical" href="https:\/\/[^"]+">/, 'canonical'],
  [/<meta property="og:locale" content="en_US">/, 'og:locale'],
  [/<meta property="og:image" content="https:\/\/[^"]+">/, 'absolute og:image'],
  [/<script type="application\/ld\+json">/, 'JSON-LD'],
  [/<link rel="stylesheet" href="\/styles.css">/, 'stylesheet'],
]

const ALLOWED_EXTERNAL = /^https:\/\/(www\.)?(pagead2\.googlesyndication\.com|policies\.google\.com|www\.google\.com|esd\.whs\.mil|pubmed\.ncbi\.nlm\.nih\.gov|pmc\.ncbi\.nlm\.nih\.gov|efsa\.europa\.eu|efsa\.onlinelibrary\.wiley\.com|www\.cdc\.gov|www\.heart\.org|support\.google\.com|www\.nhs\.uk|www\.hprc-online\.org|github\.com\/zfy989898\/healthtools)(\/|$)/

export function gates(pages) {
  const problems = []
  const warnings = []
  const stats = []

  for (const p of pages) {
    const body = text(p.html)
    const words = body.split(/\s+/).length
    const isTool = Array.isArray(p.examples)
    stats.push({ slug: p.slug, words, indexable: !!p.indexable })

    if (CJK.test(p.html)) problems.push(`${p.slug}: contains CJK or fullwidth characters; this site is English-only`)
    for (const [re, label] of REQUIRED) if (!re.test(p.html)) problems.push(`${p.slug}: missing ${label}`)
    if (/quge5|propellerads|monetag|profitableratecpm/i.test(p.html)) problems.push(`${p.slug}: blocked ad-network artifact present`)
    const artifact = /<h1>undefined<\/h1>|>undefined<|>NaN<|\[object Object\]/.exec(p.html)
    if (artifact) problems.push(`${p.slug}: unresolved render artifact "${artifact[0]}" in the page body`)
    const titleText = /<title>([^<]*)<\/title>/.exec(p.html)?.[1] || ''
    if (titleText.length < 15 || titleText.length > 70) problems.push(`${p.slug}: <title> is ${titleText.length} characters, outside 15-70: ${titleText}`)
    const descText = /<meta name="description" content="([^"]*)"/.exec(p.html)?.[1] || ''
    if (descText.length < 60 || descText.length > 175) problems.push(`${p.slug}: meta description is ${descText.length} characters, outside 60-175`)
    const parsedLd = [...p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => {
      try { return JSON.parse(m[1]) } catch { return null }
    })
    if (!parsedLd.length) problems.push(`${p.slug}: no JSON-LD block found`)
    for (const o of parsedLd) {
      if (!o) { problems.push(`${p.slug}: JSON-LD is not parseable (escaped quotes break structured data)`); continue }
      if (!o['@type'] || !o['@context']) problems.push(`${p.slug}: JSON-LD missing @context or @type`)
    }
    // On a domain Google has never crawled, entity association is the whole game: a page
    // that names no publisher tells Google nothing about who is speaking on it.
    if (parsedLd.length && !parsedLd.some(o => o && o.publisher)) problems.push(`${p.slug}: no JSON-LD block declares a publisher`)
    if (/display:\s*none[^>]*rel="sponsored"/i.test(p.html)) problems.push(`${p.slug}: hidden sponsored link (cloaking pattern)`)
    if (isTool) {
      if (words < 900) problems.push(`${p.slug}: ${words} words, below the 900-word tool floor`)
      if (p.examples.length < 3) problems.push(`${p.slug}: fewer than 3 worked examples`)
      for (const e of p.examples) {
        const v = e.value
        if (!v || v.error) problems.push(`${p.slug}: worked example "${e.label}" did not compute`)
        else if (Object.values(v).some(x => typeof x === 'number' && !Number.isFinite(x))) problems.push(`${p.slug}: worked example "${e.label}" produced NaN or Infinity`)
      }
      if (!/Relate[d]? tools/.test(p.html)) problems.push(`${p.slug}: no related-tools block`)
    } else if (words < 170) problems.push(`${p.slug}: ${words} words, below the 170-word floor for non-tool pages`)

    for (const m of p.html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
      const u = m[1]
      if (u.startsWith('https://healthtools.icu/')) continue
      if (!ALLOWED_EXTERNAL.test(u)) warnings.push(`${p.slug}: external host not in allowlist: ${u}`)
    }
    if (!p.indexable && p.slug !== 'contact') warnings.push(`${p.slug}: held noindex and excluded from the sitemap`)
  }

  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const a = pages[i], b = pages[j]
      if (!a.indexable || !b.indexable) continue
      const s = jaccard(shingles(text(a.html)), shingles(text(b.html)))
      if (s > 0.65) problems.push(`near-duplicate ${Math.round(s * 100)}%: ${a.slug} <-> ${b.slug} (limit 65%)`)
    }
  }

  const home = pages.find(p => p.slug === 'index')
  const edges = new Map()
  for (const p of pages) edges.set(p.slug, new Set([...p.html.matchAll(/href="\/([a-z0-9\-]+)\/"/g)].map(m => m[1]).filter(x => x !== p.slug)))
  const depth = new Map([['index', 0]])
  const queue = ['index']
  while (queue.length) {
    const cur = queue.shift()
    for (const nxt of edges.get(cur) || []) {
      if (!depth.has(nxt)) { depth.set(nxt, (depth.get(cur) ?? 0) + 1); queue.push(nxt) }
    }
  }
  for (const p of pages) {
    if (!p.indexable || p.slug === 'index') continue
    if (!home) problems.push('no homepage to link from')
    const d = depth.get(p.slug)
    if (d === undefined) problems.push(`${p.slug}: indexable but unreachable from the homepage`)
    else if (d > 3) problems.push(`${p.slug}: ${d} hops from the homepage (limit 3)`)
  }

  const files = readdirSync(dist)
  for (const f of ['robots.txt', 'sitemap.xml', 'ads.txt', 'BingSiteAuth.xml', '404.html', 'styles.css', 'favicon.svg', 'favicon.ico', 'apple-touch-icon.png', 'og-image.png', '_headers']) {
    if (!files.includes(f)) problems.push(`deploy bundle is missing ${f}`)
  }
  // Pages serves HTML with max-age=0, must-revalidate, so every repeat visit - browser
  // or crawler - revalidates the document. Measured 2026-09-23: the TTL below is
  // honoured by browsers and gives edge HITs for assets, but Pages still reports
  // cf-cache-status DYNAMIC for HTML, so do not claim a CDN win here - the point is
  // that a route must not silently keep the revalidate-every-time default.
  const ttlOf = new Map()
  {
    let path = null
    for (const line of readFileSync(join(dist, '_headers'), 'utf8').split('\n')) {
      if (/^\S/.test(line)) path = line.trim()
      const m = line.match(/Cache-Control:\s*(.+)$/i)
      if (m && path) ttlOf.set(path, m[1].trim())
    }
  }
  const maxAge = value => Number((value.match(/max-age=(\d+)/) || [0, -1])[1])
  for (const loc of [...readFileSync(join(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])) {
    const route = (loc.match(/^https?:\/\/[^/]+(\/[^<]*)$/) || [null, '?'])[1]
    const cc = ttlOf.get(route)
    if (!cc) { problems.push(`_headers has no rule for sitemap URL ${route}, so that document keeps Pages' revalidate-on-every-visit default`); continue }
    const age = maxAge(cc)
    if (age < 1 || age > 3600) problems.push(`${route}: document TTL max-age=${age} is outside 1..3600`)
    if (/private|no-store/.test(cc)) problems.push(`${route}: documents must not be marked private or no-store`)
  }
  for (const asset of ['/styles.css', '/favicon.ico', '/apple-touch-icon.png', '/og-image.png']) {
    const cc = ttlOf.get(asset)
    if (!cc) problems.push(`_headers has no rule for ${asset}`)
    else if (maxAge(cc) < 86400) problems.push(`${asset}: a regenerable static asset should be cached for at least a day, not max-age=${maxAge(cc)}`)
  }
  if (readFileSync(join(dist, 'sitemap.xml'), 'utf8').includes('${')) problems.push('sitemap.xml contains an unresolved template placeholder')
  // Every publisher reference resolves to the homepage Organization node, so that node
  // has to exist and point only at things the bundle can produce. A dangling @id or a
  // logo that 404s is a claim the page cannot support, which is worse than no markup.
  const ldOf = p => [...String(p.html).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(m => { try { return JSON.parse(m[1]) } catch { return null } }).filter(Boolean)
  const org = ldOf(pages.find(p => p.slug === 'index') || { html: '' }).find(o => o['@type'] === 'Organization')
  if (!org) problems.push('the homepage defines no Organization node for publisher references to resolve to')
  else {
    for (const u of [org.logo?.url, org.image].filter(Boolean)) {
      const file = String(u).replace(/^https:\/\/[^/]+\//, '')
      if (!files.includes(file)) problems.push(`Organization points at /${file}, which is not in the deploy bundle`)
    }
    if (!/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/.test(String(org.sameAs || ''))) problems.push('Organization sameAs is not a real repository URL')
  }
  const txtPub = (readFileSync(join(dist, 'ads.txt'), 'utf8').match(/pub-\d+/) || [''])[0]
  for (const p of pages) {
    const pagePub = (p.html.match(/client=ca-(pub-\d+)/) || ['', ''])[1]
    if (!txtPub) problems.push('ads.txt does not declare a DIRECT publisher line')
    if (!pagePub) problems.push(`${p.slug}: no AdSense loader tag, so the account cannot serve or review this site`)
    else if (txtPub && pagePub !== txtPub) problems.push(`${p.slug}: ad client ${pagePub} does not match ads.txt ${txtPub}`)
  }
  if (files.includes('_redirects')) {
    for (const line of readFileSync(join(dist, '_redirects'), 'utf8').split('\n').map(l => l.trim()).filter(Boolean)) {
      const [from, to] = line.split(/\s+/)
      if (!/^https:\/\/[^/]+\/\*$/.test(from || '') || !/^https:\/\/[^/]+\/:splat$/.test(to || '')) problems.push(`_redirects rule must be host-scoped with a splat target: ${line}`)
      if (from && to && from.replace(/^https?:\/\/[^/]+/, '') === to.replace(/^https?:\/\/[^/]+/, '')) problems.push(`_redirects rule redirects onto itself: ${line}`)
    }
  }

  return {
    passed: problems.length === 0,
    pageCount: pages.length,
    indexableCount: pages.filter(p => p.indexable).length,
    wordFloor: { min: Math.min(...stats.map(s => s.words)), median: stats.map(s => s.words).sort((a, b) => a - b)[Math.floor(stats.length / 2)], max: Math.max(...stats.map(s => s.words)) },
    problems,
    warnings: [...new Set(warnings)],
  }
}
