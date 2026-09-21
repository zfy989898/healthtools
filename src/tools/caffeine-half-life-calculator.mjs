export const tool = {
  slug: 'caffeine-half-life-calculator',
  name: 'Caffeine Half-Life Calculator',
  h1: 'How Long Does Caffeine Last? Half-Life Calculator',
  seo: {
    title: 'How Long Does Caffeine Last? Half-Life Calculator | HealthTools',
    desc: 'Enter a dose in mg and the hours since you took it. See how long caffeine lasts, the milligrams still in your body, and the published 3-7 hour adult half-life.',
  },
  intro: 'Enter how much caffeine you took and how long ago, and this page tells you how many milligrams are still in your body. It reports the answer as an interval as well as a midpoint, because the published half-life is itself a range that varies several-fold between people.',
  category: 'stimulants',
  provenance: {
    source: 'Temple JL, Bernard C, Lipshultz SE, et al. "The Safety of Ingested Caffeine: A Comprehensive Review", Front Psychiatry 2017;8:80, doi 10.3389/fpsyt.2017.00080, PMID 28603504 — states an adult half-life of 3-7 h, that cigarette smoking doubles the clearance rate, that oral contraceptives tend to double the half-life, and that pregnancy lengthens it by about 8.3 h on average. Guidance context only: EFSA NDA Panel, "Scientific Opinion on the safety of caffeine", EFSA Journal 2015;13(5):4102.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5445139/',
    retrieved: '2026-09-20',
    verified: true,
    checks: [
      { pmid: '28603504', first_author: 'Temple', year: '2017', journal: 'Front Psychiatry', doi: '10.3389/fpsyt.2017.00080' },
    ],
  },
  constants: {
    thresholds: [
      { key: 'sleep', label: 'Sleep-impact threshold', mg: 50 },
      { key: 'sensitive', label: 'Sensitivity threshold', mg: 100 },
      { key: 'morning', label: 'Next-morning alertness threshold', mg: 150 },
    ],
    profiles: [
      { key: 'healthy_adult', label: 'Healthy adult', hours: 5.0, range: [3, 7], basis: 'midpoint of the 3-7 h interval reported in adults' },
      { key: 'smoker', label: 'Smoker', hours: 2.5, range: [1.5, 3.5], basis: 'source states smoking doubles the clearance rate, so half-life halves' },
      { key: 'oral_contraceptive', label: 'Combined oral contraceptive', hours: 10.0, range: [6, 14], basis: 'source states oral contraceptives roughly double the half-life' },
      { key: 'pregnancy', label: 'Pregnancy', hours: 13.3, range: [11.3, 15.3], basis: 'adult interval shifted by the ~8.3 h mean increase the source reports' },
    ],
    reference_units: { dose: 'mg', output: 'mg remaining' },
  },
  formula: {
    expression: 'C(t) = D * exp(-ln(2) * t / t_half)',
    description: 'First-order exponential elimination. Time-to-threshold inverts the same expression. Every profile is reported as an interval as well as a midpoint, because the published half-life is itself a range.',
    citation: 'Standard one-compartment first-order elimination; see Temple JL et al., Front Psychiatry 2017;8:80 for the population half-life values used above.',
  },
  inputs: [
    { id: 'dose', label: 'Caffeine dose', unit: 'mg', type: 'number', min: 10, max: 1200 },
    { id: 'profile', label: 'Clearance profile', type: 'select', optionsKey: 'profiles' },
    { id: 'interval', label: 'Time elapsed', unit: 'hours', type: 'number', min: 0.5, max: 48 },
  ],
  workedExamples: [
    { label: 'One 200 mg dose, healthy adult, 8 hours', inputs: { dose: 200, profile: 'healthy_adult', interval: 8 } },
    { label: 'One 200 mg dose, oral contraceptive, 8 hours', inputs: { dose: 200, profile: 'oral_contraceptive', interval: 8 } },
    { label: '400 mg afternoon dose, smoker, 6 hours', inputs: { dose: 400, profile: 'smoker', interval: 6 } },
  ],
  limitation: 'Estimates only. Every profile is a midpoint of a published interval, not a measurement of you. Genetic CYP1A2 variation, liver function, antibiotics, age and body mass shift half-life substantially, and some people sit far outside every interval listed here. The model covers a single oral dose: it does not track accumulation across repeated doses, tolerance to subjective effects, or the fact that adenosine-blocking effects persist after plasma levels fall.',
  sections: [
    {
      h2: 'How to use these numbers',
      paragraphs: [
        'The calculator returns three things: how much caffeine remains at a time you choose, how long until it falls below each of the planning thresholds, and the half-life applied. The thresholds are not medical cut-offs. They are the values most often quoted when people try to protect sleep, and you should treat them as starting points to test against your own experience rather than as a rule.',
        'The most useful reading is the reverse one: pick your intended bedtime, count backwards, and find the latest time your morning coffee stops mattering. Take 200 mg at 8:00 am. On the 5-hour midpoint the model uses for a healthy adult, about 29 mg is left by 10:00 pm. On the 7-hour end of the published interval, the same dose leaves about 50 mg, which is the threshold this page shows for sleep. Same dose, same clock time, a two-fold difference in what is still in your body.',
      ],
    },
    {
      h2: 'Why the profiles differ so much',
      paragraphs: [
        'Almost all caffeine is cleared by one liver enzyme, CYP1A2, and that enzyme is easily changed by other things. Compounds in tobacco smoke induce it, which is why a comprehensive review reports that smoking doubles the rate at which caffeine is cleared. The oestrogens in combined oral contraceptives inhibit it, and the same review reports that they roughly double the half-life. In pregnancy the review reports an average increase of about 8.3 hours on top of the adult figure. Liver disease slows clearance too, but the published numbers are spread too widely to put a single figure here, so that group has no profile and the calculator will not guess one.',
        'Genetics matters on top of this. People carrying less-active CYP1A2 variants clear caffeine slowly enough that a single espresso can produce hours of measurable jitteriness, while fast metabolisers report drinking coffee at night and sleeping normally. The calculator cannot see your genotype, so the honest approach is to run your own test: take a dose you know, and note when subjective effects end.',
      ],
    },
    {
      h2: 'What dose to enter',
      paragraphs: [
        'Caffeine content varies more than most people expect. A 240 ml cup of home-brewed coffee typically carries 70 to 140 mg depending on grind, roast and ratio; a single espresso is commonly 50 to 75 mg; drip coffee from an office urn can exceed 200 mg per serving. Instant coffee sits low, around 60 mg per cup. Tea is usually 40 to 70 mg per cup, and energy drinks range from 30 mg in a small can to 300 mg in a large one. Caffeine tablets are sold at 100 and 200 mg.',
        'When in doubt, enter the higher plausible figure, since the purpose of the calculation is usually to find a time you can safely sleep.',
      ],
    },
    {
      h2: 'Where the reference data comes from',
      paragraphs: [
        'The four figures on this page are derived, not quoted directly. The source states an adult half-life of 3-7 hours; the midpoint, 5 hours, is the healthy-adult profile. The smoker profile divides that midpoint by two, the oral-contraceptive profile multiplies it by two, and the pregnancy profile adds the 8.3-hour average increase the source reports. Each profile keeps the published interval alongside it, and the results panel shows what that interval does to your answer.',
        'This page deliberately avoids giving a "safe" milligram figure, because the widely quoted 400 mg daily ceiling is a population guidance value covering pregnancy and other conditions differently, and it is not something a half-life model can compute.',
      ],
    },
  ],
  faq: [
    { q: 'How much caffeine is in a cup of coffee?', a: 'An 8 oz (240 ml) brewed cup commonly contains 70-140 mg; espresso shots about 50-75 mg; a "mug" serving is often double an 8 oz cup.' },
    { q: 'Why does smoking change the result?', a: 'Compounds in tobacco smoke induce CYP1A2, the liver enzyme that clears most caffeine, so caffeine is cleared roughly twice as fast in smokers.' },
    { q: 'Does this predict sleep quality?', a: 'No. It estimates milligrams remaining. The sleep-impact threshold is a common planning value, not a clinical cut-off.' },
  ],
  related: [],
}

export function compute(i, k) {
  const p = k.profiles.find(x => x.key === i.profile)
  if (!p) return { error: 'Select a clearance profile.' }
  const t = p.hours
  const [lo, hi] = p.range
  const dose = Number(i.dose) || 0
  const hours = Number(i.interval) || 0
  const at = th => dose * Math.exp(-Math.LN2 * hours / th)
  const round = v => Math.round(v * 10) / 10
  const mid = round(at(t))
  const out = {
    halfLifeHours: t,
    halfLifeRange: `${lo}-${hi} h`,
    remaining: mid,
    remainingRange: `${Math.min(round(at(hi)), round(at(lo)))}-${Math.max(round(at(hi)), round(at(lo)))} mg`,
  }
  for (const th of k.thresholds) {
    out[th.key + 'Hours'] = mid >= th.mg ? round(Math.log(dose / th.mg) / Math.LN2 * t) : null
  }
  return out
}
