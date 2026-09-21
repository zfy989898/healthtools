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
  [/<script type="application\/ld\+json">/, 'JSON-LD'],
  [/<link rel="stylesheet" href="\/styles.css">/, 'stylesheet'],
]

const ALLOWED_EXTERNAL = /^https:\/\/(www\.)?(pagead2\.googlesyndication\.com|policies\.google\.com|www\.google\.com|esd\.whs\.mil|pubmed\.ncbi\.nlm\.nih\.gov|pmc\.ncbi\.nlm\.nih\.gov|efsa\.europa\.eu|efsa\.onlinelibrary\.wiley\.com|www\.cdc\.gov|www\.heart\.org|support\.google\.com|www\.nhs\.uk|www\.hprc-online\.org)\//

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
    const blocks = [...p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    if (!blocks.length) problems.push(`${p.slug}: no JSON-LD block found`)
    for (const b of blocks) {
      try {
        const o = JSON.parse(b[1])
        if (!o['@type'] || !o['@context']) problems.push(`${p.slug}: JSON-LD missing @context or @type`)
      } catch {
        problems.push(`${p.slug}: JSON-LD is not parseable (escaped quotes break structured data)`)
      }
    }
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
  for (const f of ['robots.txt', 'sitemap.xml', 'ads.txt', '404.html', 'styles.css', 'favicon.svg']) {
    if (!files.includes(f)) problems.push(`deploy bundle is missing ${f}`)
  }
  if (readFileSync(join(dist, 'sitemap.xml'), 'utf8').includes('${')) problems.push('sitemap.xml contains an unresolved template placeholder')
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
