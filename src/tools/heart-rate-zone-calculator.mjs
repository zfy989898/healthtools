export const tool = {
  slug: 'heart-rate-zone-calculator',
  name: 'Heart Rate Zone Calculator',
  h1: 'Heart Rate Zone Calculator by Age',
  seo: {
    title: 'Heart Rate Zone Calculator by Age | Tanaka & Karvonen',
    desc: 'Target heart rate zones from four published maximum-heart-rate equations, plus Karvonen zones on your measured resting rate. The spread between methods is printed.',
  },
  intro: 'A heart rate zone calculator has to pick a maximum heart rate first, and the published equations disagree by more than ten beats per minute for the same person. This page computes all of them side by side, builds Karvonen target zones from your measured resting rate, and prints the gap between the methods instead of hiding it.',
  category: 'training',
  provenance: {
    source: 'Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol 2001;37(1):153-60, PMID 11153730, doi 10.1016/s0735-1097(00)01054-8 (meta-analysis of 351 studies / 18,712 subjects giving 208-0.7xage). Nes BM, Janszky I, Wisloeff U, Stoeylen A, Karlsen T. Age-predicted maximal heart rate in healthy subjects: The HUNT fitness study. Scand J Med Sci Sports 2013;23(6):697-704, PMID 22376273, doi 10.1111/j.1600-0838.2012.01445.x (211-0.64xage, SEE 10.8). Gulati M, Shaw LJ, Thisted RA, Black HR, Bairey Merz CN, Arnsdorf MF. Heart rate response to exercise stress testing in asymptomatic women: the St. James women take heart project. Circulation 2010;122(2):130-7, PMID 20585008, doi 10.1161/CIRCULATIONAHA.110.939249 (mean peak HR=206-0.88xage in 5,437 women). Karvonen J, Vuorimaa T. Heart rate and exercise intensity during sports activities. Practical application. Sports Med 1988;5(5):303-11, PMID 3387734, doi 10.2165/00007256-198805050-00002. Shookster D, Lindsey B, Cortes N, Martin JR. Accuracy of Commonly Used Age-Predicted Maximal Heart Rate Equations. Int J Exerc Sci 2020;13(7):1242-50, PMID 33042384, doi 10.70252/XFSJ6815.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/11153730/',
    retrieved: '2026-09-20',
    verified: true,
    checks: [
      { pmid: '11153730', first_author: 'Tanaka', year: '2001', journal: 'J Am Coll Cardiol', doi: '10.1016/s0735-1097(00)01054-8' },
      { pmid: '22376273', first_author: 'Nes', year: '2013', journal: 'Scand J Med Sci Sports', doi: '10.1111/j.1600-0838.2012.01445.x' },
      { pmid: '20585008', first_author: 'Gulati', year: '2010', journal: 'Circulation', doi: '10.1161/CIRCULATIONAHA.110.939249' },
      { pmid: '3387734', first_author: 'Karvonen', year: '1988', journal: 'Sports Med', doi: '10.2165/00007256-198805050-00002' },
      { pmid: '33042384', first_author: 'Shookster', year: '2020', journal: 'Int J Exerc Sci', doi: '10.70252/XFSJ6815' },
    ],
  },
  constants: {
    sexOptions: [
      { key: 'male', label: 'Male' },
      { key: 'female', label: 'Female' },
    ],
    zones: [
      { key: 'z1', label: 'Zone 1 - very light', min: 0.5, max: 0.6 },
      { key: 'z2', label: 'Zone 2 - light', min: 0.6, max: 0.7 },
      { key: 'z3', label: 'Zone 3 - moderate', min: 0.7, max: 0.8 },
      { key: 'z4', label: 'Zone 4 - hard', min: 0.8, max: 0.9 },
      { key: 'z5', label: 'Zone 5 - maximum', min: 0.9, max: 1.0 },
    ],
    methods: [
      { key: 'tanaka', label: 'Tanaka 2001, 208 - 0.7 x age (PMID 11153730)', appliesTo: 'all' },
      { key: 'nes', label: 'Nes 2013 HUNT, 211 - 0.64 x age (PMID 22376273)', appliesTo: 'all' },
      { key: 'gulati', label: 'Gulati 2010 women, 206 - 0.88 x age (PMID 20585008)', appliesTo: 'female' },
      { key: 'fox', label: '220 - age, convention only - no primary source on this page', appliesTo: 'all' },
    ],
  },
  formula: {
    expression: 'Karvonen target = HRrest + f x (HRmax - HRrest), where f is the zone fraction. Percentage-of-maximum target = f x HRmax.',
    description: 'Heart-rate reserve (Karvonen) sits above percentage-of-maximum for the same zone whenever resting heart rate is above zero, because it scales the gap between resting and maximum rather than the maximum itself.',
    citation: 'Karvonen J, Vuorimaa T. Heart rate and exercise intensity during sports activities. Practical application. Sports Med 1988;5(5):303-11, PMID 3387734.',
  },
  inputs: [
    { id: 'age', label: 'Age', unit: 'years', type: 'number', min: 10, max: 100 },
    { id: 'sex', label: 'Sex', type: 'select', optionsKey: 'sexOptions' },
    { id: 'resting', label: 'Measured resting heart rate', unit: 'bpm', type: 'number', min: 30, max: 120 },
  ],
  workedExamples: [
    { label: '35-year-old male, resting 62', inputs: { age: 35, sex: 'male', resting: 62 } },
    { label: '35-year-old female, resting 62', inputs: { age: 35, sex: 'female', resting: 62 } },
    { label: '62-year-old male, resting 70', inputs: { age: 62, sex: 'male', resting: 70 } },
  ],
  limitation: 'Each of these equations predicts a population average, and the published standard errors are around 10 beats per minute, so an individual true maximum can sit well outside every line shown. Medications that act on heart rate (beta-blockers, calcium-channel blockers, ivabradine, stimulants) make all age-based prediction unreliable. A supervised maximal test or a validated field test replaces them.',
  sections: [
    {
      h2: 'Why this page shows several numbers instead of one',
      paragraphs: [
        'The dominant habit in fitness is to compute a maximum heart rate as 220 minus age and never question it. This page deliberately does not present that as a sourced equation: none of the records we checked reproduces a 220-minus-age regression from measured data, so it is listed here as a convention and nothing more. What the literature does give are regression lines fitted to large measured samples, and those are the equations this calculator computes.',
        'Tanaka and colleagues took a meta-analytic route, collecting group mean maximal heart rates from 351 studies covering 492 groups and 18,712 subjects, then cross-validated in a laboratory study of 514 healthy people. Both routes landed on essentially the same line, 208 minus 0.7 times age, and the authors reported that the regression line was not different between men and women and was not influenced by habitual physical activity level.',
        'Nes and colleagues worked from the HUNT Fitness Study, 3,320 healthy men and women across a wide age range, and reported that maximal heart rate was explained univariately by 211 minus 0.64 times age with a standard error of estimate of 10.8 beats per minute. They also found that previously suggested prediction equations underestimated measured maximal heart rate in subjects older than 30, and reported no interaction with sex, physical activity, VO2max or body mass index.',
        'Gulati and colleagues analysed 5,437 asymptomatic women undergoing symptom-limited maximal stress testing and reported a mean peak heart rate of 206 minus 0.88 times age, concluding that the traditional male-based calculation overestimates maximum heart rate for age in women. That sits in real tension with Tanaka, who found no sex difference in a meta-analysis. Both are shown, because the disagreement is the honest answer.',
        'For the same 35-year-old the sourced equations plus the convention span 5 beats if you are a man and 14 beats if you are a woman; by age 62 the male span is 13 beats, because 220-minus-age has the steepest slope of the four and drifts further from the fitted lines as age rises. The figure printed above the result tables is that span, computed live from the rows beneath it.',
      ],
    },
    {
      h2: 'Karvonen versus percentage of maximum',
      paragraphs: [
        'Both methods scale from maximum heart rate, but Karvonen also uses your measured resting rate. It works on heart-rate reserve, the difference between maximum and resting, so for the same zone label it produces a higher target than the plain percentage method. Two people of the same age and maximum get identical percentage zones but different Karvonen zones, and the one with the lower resting rate is pushed slightly higher.',
        'Karvonen is the better basis for endurance training prescription when your resting rate is genuinely measured rather than guessed, because it accounts for a real difference between people. If you do not know your resting rate honestly, use the percentage column and accept the imprecision.',
        'Karvonen and Vuorimaa also make the caution explicit in the original paper: they describe target heart rate as the percentage difference between resting and maximum added to the resting rate, note two alternative methods including a percentage of maximum and a percentage of maximum oxygen uptake, and state that an appropriate individual heart rate for each level of endurance performance is best determined in the laboratory. The tables below are the arithmetic they formalised, applied to a predicted maximum they did not have.',
      ],
    },
    {
      h2: 'Measuring a usable resting heart rate',
      paragraphs: [
        'Take it on waking, still lying flat, before you sit up or look at your phone. A chest strap is the most reliable consumer option; wrist optical readings frequently run several beats high, and that error propagates straight into every Karvonen zone. Record it on five separate mornings and enter the median, not the best day.',
        'Resting rate rises with poor sleep, alcohol, infection, dehydration, heat and stress. If you measure on a morning after any of those, discard the reading.',
      ],
    },
    {
      h2: 'Where the zone boundaries come from',
      paragraphs: [
        'The 50-60-70-80-90 percent boundaries shown here are the conventional five-zone layout used in most consumer fitness equipment and coaching material. They are a simplification, and unlike the equations above they are not attributed to a specific study on this page. Sports physiology more commonly sets zones from lactate threshold or ventilatory threshold, both of which are measured in a lab or a field test and neither of which can be derived from age, so a lab-defined Zone 2 often sits several beats away from the 60-70 percent band.',
        'If you train against zones seriously, run a field test and calibrate against it. Use these tables as a starting structure, and treat the Karvonen column as the one that reflects your own fitness.',
      ],
    },
    {
      h2: 'How far off is normal',
      paragraphs: [
        'A standard error of estimate near 10 to 11 beats per minute, the figure Nes and colleagues report for their own equation, means roughly two thirds of people have a true maximum within about 10 beats of the line and around one person in twenty more than 20 beats away. Age-based prediction simply does not resolve the individual, whichever line you pick.',
        'Shookster and colleagues tested eight age-predicted equations - Fox, Gellish, Gulati, Tanaka, Arena, Astrand, Nes and Fairbarn - against maxima measured in 99 graded treadmill tests taken to volitional fatigue with a respiratory exchange ratio above 1.10. Their conclusion was that all eight showed poor agreement with measured maximum heart rate, and that most displayed proportional bias, under-predicting in people whose measured maximum was low and over-predicting where it was high. The Fox equation was the exception on proportional bias, which counts in its favour on accuracy even though this page could not locate a primary derivation for it.',
        'The practical reading is that the ranking of these equations matters far less than the fact that every one of them estimates a population average. Where a graded exercise test is available, use the maximum it measured and discard the table.',
      ],
    },
  ],
  faq: [
    { q: 'Why not just use 220 minus age?', a: 'This page could not tie that equation to a primary source that derived it from measured maxima, so it is listed as a convention rather than as a citable result. That is a point about provenance, not accuracy: when Shookster and colleagues benchmarked eight equations against 99 measured treadmill maxima, all eight agreed poorly, and Fox was the least biased. The Tanaka meta-analysis gives 208 minus 0.7 times age, a shallower slope that predicts a higher maximum in older adults and a lower one in young adults.' },
    { q: 'Which equation should I use?', a: 'The three sourced equations are all defensible. Tanaka and Nes differ by only a few beats at any age; the Gulati line matters if you are a woman and gives a lower maximum from roughly middle age onward. If you have a measured maximum from a test, use that and ignore all of them.' },
    { q: 'What is a good resting heart rate to enter?', a: 'Use the lowest rate you actually measure, on waking, before getting up, averaged over several mornings. Wrist readings are frequently a few beats high.' },
    { q: 'Which zone is "Zone 2" for endurance training?', a: 'In this calculator it is the 60-70% band, shown both as a percentage of maximum and as its Karvonen equivalent. Many coaches define Zone 2 from lactate or ventilatory thresholds instead, which cannot be derived from age.' },
    { q: 'Do these numbers work if I take beta-blockers?', a: 'No. Beta-blockers, ivabradine and some calcium-channel blockers lower maximum heart rate directly, so any age-based prediction overstates your ceiling and every zone derived from it sits too high.' },
  ],
  related: ['caffeine-half-life-calculator'],
}

export function compute(i, k) {
  const age = Number(i.age) || 0
  const rest = Number(i.resting) || 60
  const sex = i.sex === 'female' ? 'female' : 'male'
  if (age <= 0) return { error: 'Enter an age.' }
  const hrmax = {
    tanaka: 208 - 0.7 * age,
    nes: 211 - 0.64 * age,
    gulati: 206 - 0.88 * age,
    fox: 220 - age,
  }
  const rows = []
  for (const m of k.methods) {
    if (m.appliesTo === 'female' && sex !== 'female') continue
    const max = hrmax[m.key]
    const reserve = max - rest
    const zoneVals = k.zones.map(z => ({
      key: z.key,
      label: z.label,
      pctLow: Math.round(z.min * max),
      pctHigh: Math.round(z.max * max),
      karLow: Math.round(rest + z.min * reserve),
      karHigh: Math.round(rest + z.max * reserve),
    }))
    rows.push({ method: m.label, hrmax: Math.round(max), zones: zoneVals })
  }
  const shown = rows.map(r => r.hrmax)
  const spread = Math.round(Math.max(...shown) - Math.min(...shown))
  return { rows, spread, restingUsed: rest }
}
