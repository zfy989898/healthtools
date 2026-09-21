import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync } from 'node:fs'
import { createHash, randomBytes } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { gates } from './gates.mjs'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const ORIGIN = process.env.SITE_ORIGIN || 'https://healthtools.icu'
const SITE = 'HealthTools'
const VAR_DIR = join(ROOT, 'var')
const LASTMOD_FILE = join(VAR_DIR, 'lastmod.json')
const lastmodStore = existsSync(LASTMOD_FILE) ? JSON.parse(readFileSync(LASTMOD_FILE, 'utf8')) : {}
const KEY_FILE = join(ROOT, 'indexnow.key')
const indexNowKey = existsSync(KEY_FILE)
  ? readFileSync(KEY_FILE, 'utf8').trim()
  : (() => { const k = randomBytes(16).toString('hex'); writeFileSync(KEY_FILE, k); return k })()
const TODAY = new Date().toISOString().slice(0, 10)
// This copy ships with the publisher id blank - see README.
const ADSENSE_PUB = (process.env.ADSENSE_PUB || '').replace(/^ca-/, '')

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const safeJson = o => JSON.stringify(o).replace(/</g, '\\u003c').replace(/\u2028|\u2029/g, '')
const FIELD_LABELS = {
  halfLifeHours: 'Half-life applied (hours)', remaining: 'Caffeine remaining (mg)',
  halfLifeRange: 'Published half-life interval', remainingRange: 'Plausible remaining range',
  sleepHours: 'Hours until under 50 mg', sensitiveHours: 'Hours until under 100 mg',
  morningHours: 'Hours until under 150 mg', bodyFat: 'Estimated body fat (%)',
  publishedError: 'Reported error of this method', armyRange: 'Published Army standard range',
  ageUsed: 'Age used',
  rows: 'Maximum heart rate by method', spread: 'Spread between methods (bpm)',
  restingUsed: 'Resting heart rate used (bpm)', error: 'Error',
  acute: 'Acute workload, week 1 (arbitrary units)', chronic: 'Chronic workload, rolling average (arbitrary units)',
  acwr: 'Acute:chronic workload ratio', windowUsed: 'Chronic window used',
  band: 'Where the ratio sits against the published ranges', weekOnWeek: 'Week-to-week change',
  loadRows: 'Weekly totals used', week: 'Week', load: 'Load (AU)', share: 'Share of window',
}

async function importTools() {
  const dir = join(ROOT, 'src/tools')
  return Promise.all(readdirSync(dir).filter(f => f.endsWith('.mjs')).map(async f => {
    const m = await import(pathToFileURL(join(dir, f)).href)
    return { tool: m.tool, compute: m.compute }
  }))
}

function fieldHtml(inp, k) {
  if (inp.type === 'select') {
    const opts = k[inp.optionsKey].map(o => {
      const hint = o.range ? ` (${o.range[0]}-${o.range[1]} h)` : ''
      return `<option value="${esc(o.key)}"${o.default ? ' selected' : ''}>${esc(o.label + hint)}</option>`
    }).join('')
    return `<p><label for="${inp.id}">${esc(inp.label)}</label><select id="${inp.id}">${opts}</select></p>`
  }
  const unit = inp.unit ? ` <span class="unit">(${esc(inp.unit)})</span>` : ''
  return `<p><label for="${inp.id}">${esc(inp.label)}${unit}</label><input id="${inp.id}" type="number" inputmode="decimal" min="${inp.min}" max="${inp.max}" step="any"></p>`
}

function shell({ title, desc, slug, indexable, nav, jsonld, body }) {
  const url = slug ? `${ORIGIN}/${slug}/` : `${ORIGIN}/`
  const short = desc.length > 172 ? desc.slice(0, 169).replace(/[\s,;]*$/, '') + '...' : desc
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(short)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="${SITE}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(short)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary">
${indexable ? '' : '<meta name="robots" content="noindex,nofollow">'}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${ADSENSE_PUB}" crossorigin="anonymous"></script>
${(jsonld || []).map(j => `<script type="application/ld+json">${safeJson(j)}</script>`).join('\n')}
</head>
<body>
<header class="site-header">
<a class="brand" href="/">HealthTools</a>
<nav aria-label="Site">${nav.map(n => `<a href="/${n.slug}/">${esc(n.label.trim())}</a>`).join('')}<a href="/methodology/">Methodology</a><a href="/about/">About</a></nav>
</header>
<main>${body}</main>
<footer class="site-footer">
<p>&copy; 2026 ${SITE}. Calculations run in your browser; inputs are never sent to a server.</p>
<p><a href="/">All tools</a> &middot; <a href="/about/">About</a> &middot; <a href="/methodology/">Methodology</a> &middot; <a href="/privacy/">Privacy</a> &middot; <a href="/disclaimer/">Disclaimer</a></p>
</footer>
</body>
</html>
`
}

function toolPage({ tool: t, compute }, published, all) {
  const indexable = published.has(t.slug)
  const names = new Map(all.map(a => [a.slug, a.name]))
  const desc = t.seo?.desc || `${t.name} for US users. ${t.intro.split('.')[0]} Formula, sources and worked examples are on the page.`
  const titleText = t.seo?.title || `${t.name} | ${SITE}`
  const examples = t.workedExamples.map(e => ({ label: e.label, value: compute(e.inputs, t.constants) }))
  const jsonld = [
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: t.name,
      url: `${ORIGIN}/${t.slug}/`, applicationCategory: 'HealthApplication', operatingSystem: 'Any',
      inLanguage: 'en-US', isAccessibleForFree: true, dateModified: t.provenance.retrieved,
      description: desc, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: t.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: `How to use the ${t.name}`,
      description: t.formula.description,
    },
  ]
  const nav = all.filter(a => a.slug !== t.slug).map(a => ({ slug: a.slug, label: a.name }))
  const body = `
<article>
<h1>${esc(t.h1 || t.name)}</h1>
<p class="lede">${esc(t.intro)}</p>
<form id="calc" class="tool-form" autocomplete="off">
${t.inputs.map(inp => fieldHtml(inp, t.constants)).join('\n')}
<p><button type="submit">Calculate</button></p>
</form>
<section id="output" class="output" aria-live="polite"><p class="placeholder">Results appear here as you type.</p></section>
<h2>Worked examples</h2>
<p>These are produced by the same function your browser just ran, computed when this page was built.</p>
<table class="examples"><thead><tr><th>Case</th><th>Output</th></tr></thead><tbody>
${examples.map(e => `<tr><th scope="row">${esc(e.label)}</th><td>${esc(Object.entries(e.value).filter(([, v]) => v === null || typeof v !== 'object').map(([k, v]) => `${FIELD_LABELS[k] || k}: ${v === null ? 'already below' : v}`).join('; '))}</td></tr>`).join('\n')}
</tbody></table>
<h2>How it is calculated</h2>
<p><code class="formula">${esc(t.formula.expression)}</code></p>
<p>${esc(t.formula.description)}</p>
<p class="cite">Formula source: ${esc(t.formula.citation)}</p>
<h2>Reference data on this page</h2>
<p>Sources: ${esc(t.provenance.source)}</p>
<p><a href="${esc(t.provenance.url)}">${esc(t.provenance.url)}</a> &middot; retrieved ${esc(t.provenance.retrieved)} &middot; ${t.provenance.verified ? 'citation checked' : 'citation not yet checked against the original; page held out of the sitemap'}</p>
<h2>Limits of this tool</h2>
<p>${esc(t.limitation)}</p>
${(t.sections || []).map(s => `<h2>${esc(s.h2)}</h2>${s.paragraphs.map(p => `<p>${esc(p)}</p>`).join('\n')}`).join('\n')}
<h2>Questions</h2>
${t.faq.map(f => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('\n')}
<aside class="disclaimer">This page computes arithmetic from published formulas. It is not medical advice and not a diagnosis. See the <a href="/disclaimer/">disclaimer</a> and the <a href="/methodology/">methodology</a>.</aside>
<h2>Related tools</h2>
${t.related.length ? `<ul>${t.related.map(s => `<li><a href="/${s}/">${esc(names.get(s) || s.replace(/-/g, ' '))}</a></li>`).join('\n')}</ul>` : '<p class="unit-note">No other tool on this site has cleared citation checking yet, so there is nothing honest to link to from here. See the <a href="/methodology/">methodology</a> for what that gate involves.</p>'}
</article>`
  const html = shell({ title: titleText, desc, slug: t.slug, indexable, nav, jsonld, body })
  const client = `
<script>
const K = ${JSON.stringify(t.constants)};
const L = ${JSON.stringify(FIELD_LABELS)};
const labelOf = k => L[k] || k;
const fmt = v => v === null ? 'already below it' : v;
const compute = ${compute.toString()};
const form = document.getElementById('calc'), out = document.getElementById('output');
function render(r){
  if (r.error) return '<p class="error">' + r.error + '</p>';
  let h = '';
  for (const [k, v] of Object.entries(r)) {
    if (Array.isArray(v) && v.length && Array.isArray(v[0]?.zones)) {
      h += '<h3>' + labelOf(k) + '</h3>' + v.map(row => '<p><strong>' + row.method + '</strong> &middot; HRmax ' + row.hrmax + ' bpm</p>' +
        '<table><tr><th>Zone</th><th>%HRmax</th><th>Karvonen</th></tr>' + row.zones.map(z =>
          '<tr><td>' + z.label + '</td><td>' + z.pctLow + '-' + z.pctHigh + '</td><td>' + z.karLow + '-' + z.karHigh + '</td></tr>').join('') + '</table>').join('');
    } else if (Array.isArray(v) && v.length && typeof v[0] === 'object') {
      h += '<h3>' + labelOf(k) + '</h3><table>' + v.map(o => '<tr>' + Object.entries(o).map(([a, b]) => '<th>' + labelOf(a) + '</th><td>' + fmt(b) + '</td>').join('') + '</tr>').join('') + '</table>';
    } else if (v === null || typeof v !== 'object') {
      h += '<p><strong>' + labelOf(k) + ':</strong> ' + fmt(v) + '</p>';
    }
  }
  return '<div class="result">' + h + '</div>';
}
const run = () => { const d = {}; form.querySelectorAll('input,select').forEach(e => d[e.id] = e.value); out.innerHTML = render(compute(d, K)) };
form.addEventListener('submit', e => { e.preventDefault(); run() });
form.addEventListener('input', run);
form.addEventListener('change', run);
</script>`
  return { html: html.replace('</body>', client + '\n</body>'), examples, indexable }
}

const INFO = {
  about: ['About HealthTools', 'Who runs HealthTools, what the calculators do and do not claim, and how formulas are sourced.',
    `<p>HealthTools publishes free browser-based calculators for everyday numbers: stimulant clearance, training heart rate, body-composition estimates.</p>
<p>Every page discloses its formula, names the published source it came from, and prints worked examples computed by the same code that runs in your browser.</p>
<p>We do not currently have a clinical reviewer on staff. Where a number would require clinical judgement, we publish the arithmetic only and say so plainly. That limitation is stated on each page rather than hidden.</p>
<p>No account, no paywall, no data collection. Contact details are on the <a href="/contact/">contact page</a>.</p>
<p>The site is run by one operator who writes the code and the copy, and who reads every reported error personally. That is a limitation as well as a feature: it means updates are slow, and it also means nothing here was produced without someone reading it.</p>`],
  methodology: ['Methodology', 'How HealthTools builds calculators, sources formulas, and decides what is ready to publish.',
    `<p>Each page is generated from one data record holding the formula, its published citation, the accepted input ranges, the reference tables displayed, and at least three worked examples.</p>
<p>The worked examples printed on a page are computed at build time by the identical function your browser runs, so the prose cannot drift from the arithmetic.</p>
<p>Before a build is published it must pass automated gates: no non-English characters, canonical and structured data present, at least 900 words of page text, no near-duplicate of another page above a 65% similarity threshold, and every published page reachable from the homepage within three links.</p>
<p>A page whose citation has not been checked against the original publication is marked noindex and left out of the sitemap automatically. Verification is a human step and it blocks publication.</p>
<p>Nothing about your calculations reaches our servers, because none of it leaves your browser.</p>`],
  privacy: ['Privacy', 'Privacy practices for HealthTools calculators, including what is and is not collected.',
    `<p>Calculations run entirely in your browser. We do not store your inputs and there is no account to create.</p>
<p>Advertising on this site is served by Google AdSense. Google and its advertising partners may set cookies and use them, together with standard usage information, to serve and measure ads on this and other sites. That processing is Google's, under Google's own policies: see <a href="https://policies.google.com/technologies/partner-sites">How Google uses information from sites or apps that use our services</a>.</p>
<p>HealthTools itself does not collect, sell or share health data about you, because none of it is transmitted. The values you type never leave your device, so the ad tag has no access to them.</p>
<p>The full inventory of third-party scripts loaded by any page is visible in that page's source. We keep that list deliberately short: one Google ad script, and nothing else.</p>
<p>If you use a browser extension that blocks scripts, the calculators still work, because none of them depends on a server call to produce a result.</p>
<p>You can opt out of personalised advertising in Google's ad settings at <a href="https://www.google.com/settings/ads">google.com/settings/ads</a>, or block the ad cookies for this domain in your browser. Neither action affects the calculators.</p>`],
  disclaimer: ['Disclaimer', 'HealthTools is arithmetic from published formulas, not medical advice, and who should not rely on it.',
    `<p>HealthTools provides arithmetic derived from published formulas. It is not medical advice, not a diagnosis, and not a treatment recommendation.</p>
<p>Outputs are population estimates and can be wrong for you specifically, particularly if you are pregnant, under 18, over 65, taking medication that changes heart rate or drug metabolism, or living with liver, kidney or cardiovascular disease.</p>
<p>Pregnancy, ovulation and blood-pressure tools involve clinical interpretation and are not suitable for clinical decisions. Discuss anything that affects your health with a qualified clinician.</p>
<p>Where a formula has a known standard error, the page states it. Where a formula is disputed, the page shows the competing values instead of picking one.</p>
<p>Emergencies are never a calculator question. If you have chest pain, a sudden severe headache, fainting, or a blood pressure reading far outside the usual range with symptoms, get emergency care rather than looking for a number here.</p>`],
  contact: ['Contact', 'Report a formula error, ask for a source, or request a change from HealthTools.',
    `<p>To report a formula error, ask where a number came from, or request a change, email <a href="mailto:contact@healthtools.icu">contact@healthtools.icu</a>.</p>
<p>Formula corrections are the most useful thing you can send: name the publication and the table or page, and we will re-check the record behind that calculator.</p>
<p>Response time is usually within a week. When a correction is accepted, the affected page's reference-data section is updated and its retrieval date changes, so you can see that the numbers were re-checked rather than silently edited.</p>
<p>We do not accept sponsored tool requests, paid placements inside a calculator's results, or guest articles. Every calculator on this site exists because its formula is published and checkable, not because it was requested.</p>
<p>Press and research enquiries are welcome, including requests for the data record behind a page; ask for the tool name and we will send the record and its source list.</p>`],
}

const SOURCE_HOSTS = /^https:\/\/(pubmed\.ncbi\.nlm\.nih\.gov|pmc\.ncbi\.nlm\.nih\.gov|europepmc\.org|doi\.org|www\.ncbi\.nlm\.nih\.gov|efsa\.onlinelibrary\.wiley\.com|www\.esd\.whs\.mil|www\.hprc-online\.org|www\.cdc\.gov|www\.heart\.org)\//
const TRACEABLE = /(PMID[:\s]?\d{4,}|doi[:\s]?\s*10\.\d{4,}|EFSA Journal \d{4};|1308\.03)/

function checkProvenance(t) {
  const out = []
  const p = t.provenance || {}
  if (!p.source || !p.url || !p.retrieved) out.push(`${t.slug}: provenance needs source, url and retrieved`)
  if (p.url && !SOURCE_HOSTS.test(p.url)) out.push(`${t.slug}: provenance url must point at a primary-source host on the allowlist, not ${p.url}`)
  if (p.source && !TRACEABLE.test(p.source)) out.push(`${t.slug}: provenance source carries no resolvable identifier (PMID, DOI, EFSA Journal volume:article, or DoDI number)`)
  return out
}

async function main() {
  const dist = join(ROOT, 'dist')
  rmSync(dist, { recursive: true, force: true })
  mkdirSync(dist, { recursive: true })

  const mods = await importTools()
  const allSlugs = mods.map(m => m.tool.slug)
  const published = new Set(mods.filter(m => m.tool.provenance.verified === true).map(m => m.tool.slug))
  const all = mods.filter(m => published.has(m.tool.slug)).map(m => ({ slug: m.tool.slug, name: m.tool.name }))
  const pages = []

  for (const m of mods) {
    const { html, examples, indexable } = toolPage(m, published, all)
    mkdirSync(join(dist, m.tool.slug), { recursive: true })
    writeFileSync(join(dist, m.tool.slug, 'index.html'), html)
    pages.push({ slug: m.tool.slug, html, indexable, examples })
  }

  for (const [slug, [name, desc, body]] of Object.entries(INFO)) {
    const indexable = slug !== 'contact'
    const nav = all.map(a => ({ slug: a.slug, label: a.name }))
    const html = shell({
      title: `${name} | ${SITE}`, desc, slug, indexable, nav,
      jsonld: [{ '@context': 'https://schema.org', '@type': 'AboutPage', name, url: `${ORIGIN}/${slug}/`, description: desc }],
      body: `<article><h1>${esc(name)}</h1>${body}<p><a href="/">Back to all tools</a>.</p></article>`,
    })
    mkdirSync(join(dist, slug), { recursive: true })
    writeFileSync(join(dist, slug, 'index.html'), html)
    pages.push({ slug, html, indexable })
  }

  const publishedTools = [...published]
  const pubNames = mods.filter(m => published.has(m.tool.slug)).map(m => m.tool.name)
  const homeDesc = `Free health calculators that print the formula, the source and worked examples. Published here: ${pubNames.join(', ')}.`
  const home = shell({
    title: `Health Calculators with Published Formulas | ${SITE}`, desc: homeDesc, slug: '', indexable: true,
    nav: all.map(a => ({ slug: a.slug, label: a.name })),
    jsonld: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE, url: `${ORIGIN}/`, inLanguage: 'en-US' }],
    body: `<article><h1>Health calculators that show their working</h1>
<p class="lede">Every tool on this site prints the formula it used, the publication that formula came from, and worked examples computed by the same code running in your browser.</p>
<ul class="tool-list">${publishedTools.length ? publishedTools.map(s => {
      const m = mods.find(x => x.tool.slug === s)
      return `<li><h2><a href="/${s}/">${esc(m.tool.name)}</a></h2><p>${esc(m.tool.intro.split('.')[0])}.</p></li>`
    }).join('\n') : '<li>No tools are published yet.</li>'}
</ul>
<h2>What you can check on any page here</h2>
<p>Each tool page states its formula in plain arithmetic, names the publication the formula or the reference constants came from, and prints worked examples that were computed by the same function your browser runs, at the moment the page was built. If a number on a page looks wrong, that makes it possible to find out where: the formula, the reference data, or your own inputs. Nothing on this site asks you to take a figure on trust.</p>
<p>Where a source gives a range rather than a single value, the pages show the range and carry it through the calculation, because a midpoint presented alone reads as more precise than the evidence behind it. Reference data that could not be traced to a primary publication does not appear at all; it is left out rather than estimated.</p>
<p class="unit-note">Tools whose source citations have not been checked against the original publication are marked noindex and stay out of this list and out of the sitemap.</p>
<aside class="disclaimer">Arithmetic from published formulas, not medical advice. Read the <a href="/disclaimer/">disclaimer</a> and the <a href="/methodology/">methodology</a>.</aside>
</article>`,
  })
  writeFileSync(join(dist, 'index.html'), home)
  pages.push({ slug: 'index', html: home, indexable: true })

  writeFileSync(join(dist, 'styles.css'), readFileSync(join(ROOT, 'src/styles.css'), 'utf8'))
  writeFileSync(join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + ORIGIN + '/sitemap.xml\n')
  const sitemapSlugs = pages.filter(x => x.indexable && x.slug !== 'index').map(x => x.slug)
  const store = {}
  const lastmodOf = slug => {
    const page = pages.find(x => x.slug === slug)
    const hash = createHash('sha256').update(page.html).digest('hex')
    const prev = lastmodStore[slug]
    const date = prev && prev.hash === hash ? prev.date : TODAY
    store[slug] = { hash, date }
    return date
  }
  mkdirSync(VAR_DIR, { recursive: true })
  writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${ORIGIN}/</loc><lastmod>${lastmodOf('index')}</lastmod></url>
${sitemapSlugs.map(s => `  <url><loc>${ORIGIN}/${s}/</loc><lastmod>${lastmodOf(s)}</lastmod></url>`).join('\n')}
</urlset>
`)
  writeFileSync(LASTMOD_FILE, JSON.stringify(store, null, 1) + '\n')
  writeFileSync(join(dist, `${indexNowKey}.txt`), indexNowKey + '\n')
  writeFileSync(join(dist, 'ads.txt'), `google.com, ${ADSENSE_PUB}, DIRECT, f08c47fec0942fa0\n`)
  writeFileSync(join(dist, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0f4c5c"/><text x="32" y="44" font-family="Georgia,serif" font-size="38" fill="#fff" text-anchor="middle">H</text></svg>\n`)

  writeFileSync(join(dist, '404.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Page not found | ${SITE}</title><link rel="stylesheet" href="/styles.css"></head>
<body><main><article><h1>Page not found</h1><p>There is no tool at that address. <a href="/">Back to the tool index</a>.</p></article></main></body></html>
`)

  const results = gates(pages)
  results.problems.unshift(...mods.flatMap(m => checkProvenance(m.tool)))
  results.passed = results.problems.length === 0
  results.publishedCount = sitemapSlugs.length
  console.log(JSON.stringify(results, null, 1))
  if (results.problems.length) process.exitCode = 1
}

main().catch(e => { console.error(e); process.exitCode = 1 })
