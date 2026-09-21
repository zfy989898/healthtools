export const tool = {
  slug: 'vo2-max-heart-rate-ratio-calculator',
  name: 'VO2 Max From Heart Rate Calculator',
  h1: 'VO2 Max Calculator (From Your Heart Rate)',
  seo: {
    title: 'VO2 Max Calculator - From Heart Rate | HealthTools',
    desc: 'What is VO2max and how to estimate it from the ratio between your maximum and resting heart rate, using the factor published by Uth and colleagues, with the standard error for each input type.',
  },
  intro: 'This page estimates VO2max from the ratio between your maximum and resting heart rate, using the proportionality factor published by Uth and colleagues. Enter a measured maximum and the published standard error is about 2.7 ml/kg/min; substitute an age-predicted maximum and it roughly doubles.',
  category: 'training',
  provenance: {
    source: 'Uth N, Sørensen H, Overgaard K, Pedersen PK. Estimation of VO2max from the ratio between HRmax and HRrest - the Heart Rate Ratio Method. Eur J Appl Physiol 2004;91(1):111-5, PMID 14624296, doi 10.1007/s00421-003-0988-y (proportionality factor 15.3 (0.7) ml/min/kg measured in a subgroup of 10 of 46 well-trained men aged 21-51; SEE 2.7 ml/min/kg with measured HRmax, 4.7 ml/min/kg with age-predicted HRmax). Castagna C, Krustrup P, Póvoas S. Estimation of maximal oxygen uptake using the heart rate ratio method in male recreational football players. Eur J Appl Physiol 2022;122(6):1421-8, PMID 35301581, doi 10.1007/s00421-022-04928-0 (theoretical proportionality factor 15 ml/min/kg; population-specific factor 14.6 (2.6) in 66 players aged 39.3 (5.8)).',
    url: 'https://pubmed.ncbi.nlm.nih.gov/14624296/',
    retrieved: '2026-09-21',
    verified: true,
    checks: [
      { pmid: '14624296', first_author: 'Uth', year: '2004', journal: 'Eur J Appl Physiol', doi: '10.1007/s00421-003-0988-y' },
      { pmid: '35301581', first_author: 'Castagna', year: '2022', journal: 'Eur J Appl Physiol', doi: '10.1007/s00421-022-04928-0' },
    ],
  },
  constants: {
    factors: [
      { key: 'uth', label: 'Uth 2004 measured factor 15.3', value: 15.3, basis: 'PMID 14624296, subgroup of 10 well-trained men, factor 15.3 with SD 0.7' },
      { key: 'tpf', label: 'Theoretical factor 15.0', value: 15.0, basis: 'PMID 35301581, Fick-principle derivation used as the theoretical proportionality factor' },
      { key: 'spf', label: 'Football-player specific factor 14.6', value: 14.6, basis: 'PMID 35301581, population-specific factor in 66 recreational players' },
    ],
    maxSources: [
      { key: 'measured', label: 'Measured in a test (recommended)' },
      { key: 'tanaka', label: 'Age-predicted, 208 - 0.7 x age' },
      { key: 'nes', label: 'Age-predicted, 211 - 0.64 x age' },
    ],
  },
  formula: {
    expression: 'VO2max (ml/kg/min) = factor x (HRmax / HRrest). Standard factor 15.3. METs = VO2max / 3.5.',
    description: 'The ratio carries the signal: a high maximum and a low resting rate both raise the estimate, which is why the same calculation moves with training and with age in opposite directions.',
    citation: 'Uth N, Sørensen H, Overgaard K, Pedersen PK. Eur J Appl Physiol 2004;91(1):111-5, PMID 14624296.',
  },
  inputs: [
    { id: 'maxSource', label: 'Maximum heart rate', type: 'select', optionsKey: 'maxSources' },
    { id: 'hrmax', label: 'Your measured maximum heart rate', unit: 'bpm', type: 'number', min: 100, max: 230 },
    { id: 'age', label: 'Age (only used if you pick an age-predicted maximum)', unit: 'years', type: 'number', min: 10, max: 100 },
    { id: 'hrrest', label: 'Measured resting heart rate', unit: 'bpm', type: 'number', min: 25, max: 120 },
  ],
  workedExamples: [
    { label: 'Measured 192 max, 46 resting', inputs: { maxSource: 'measured', hrmax: 192, age: 0, hrrest: 46 } },
    { label: 'Measured 178 max, 62 resting', inputs: { maxSource: 'measured', hrmax: 178, age: 0, hrrest: 62 } },
    { label: 'Age-predicted at 40, 58 resting', inputs: { maxSource: 'tanaka', hrmax: 0, age: 40, hrrest: 58 } },
  ],
  limitation: 'The method was validated in 46 well-trained men aged 21-51, and its own authors state that use in other groups "will have to await direct validation". The published standard error is 2.7 ml/kg/min with a measured maximum and 4.7 ml/kg/min with an age-predicted one, so treat the number as a range. People taking beta-blockers, ivabradine or other rate-affecting medication, and anyone pacing a maximum from a submaximal test, should not use this at all.',
  sections: [
    {
      h2: 'Where the factor 15.3 comes from',
      paragraphs: [
        'Uth and colleagues did not fit this equation to a dataset. They started from the Fick principle, which says that oxygen uptake is heart rate multiplied by stroke volume multiplied by the arterio-venous oxygen difference, and noted from published data that both stroke volume reserve and oxygen extraction reserve scale with the ratio between maximum and resting heart rate. That reasoning produced a proportionality factor of about 15 millilitres per kilogram per minute, which they then tested experimentally.',
        'In a subgroup of 10 of their 46 well-trained men, the measured factor between the heart-rate ratio and mass-specific VO2max came out at 15.3 with a standard deviation of 0.7. Applying that value to the remaining 36 men reproduced directly measured VO2max with a standard error of estimate of 0.21 litres per minute, or 2.7 millilitres per kilogram per minute, roughly 4.5 percent. The authors judged that to compare favourably with other common indirect tests.',
        'The same paper reports what happens when you replace a measured maximum with an age-predicted one, which is what most people are tempted to do: the standard error rises to 0.37 litres per minute, or 4.7 millilitres per kilogram per minute, about 7.8 percent. That is still usable, but it is the reason this calculator asks how your maximum was obtained and doubles the error bar when it was predicted.',
      ],
    },
    {
      h2: 'What a later study found in a different population',
      paragraphs: [
        'Castagna, Krustrup and Póvoas tested the method on 66 recreational football players with a mean age of 39.3 years, measuring VO2max on a treadmill with alternating speed and incline increments every 30 seconds and taking resting heart rate supine after 15 minutes of rest. Their population-specific proportionality factor was 14.6 with a standard deviation of 2.6, against the theoretical 15.',
        'In the untrained state, the actual VO2max of the group, 41.3 millilitres per kilogram per minute, was about 2 millilitres per kilogram per minute lower than the value estimated with the theoretical factor - so the method over-reached slightly. Using the population-specific factor brought the difference down to 0.7 and it was no longer significant. After 12 weeks of training the estimates no longer differed significantly from the measured values.',
        'Read together, the two studies say the factor is real but not universal: 15.3 was measured in trained young men, and in a middle-aged recreational group the better fit was somewhat lower. This calculator therefore shows all three values rather than one, because the spread between them is itself the honest uncertainty for anyone who is neither of those samples.',
      ],
    },
    {
      h2: 'Getting a maximum heart rate you can trust',
      paragraphs: [
        'A measured maximum means the highest rate you actually attained on a day when you were not fatigued, not ill and not short of effort. A training-recorded peak from a hard interval session is usually close enough, provided it was genuinely a maximal effort and the device did not drop samples. Wrist optical readings can lose beats during high-intensity work, so a chest strap is the better source for this particular number.',
        'Resting rate has to be measured the way the literature measures it. Castagna took it supine after 15 minutes of rest, which is a stricter standard than the first waking pulse you get from a watch, and it is the number the equation expects. Because the resting rate sits in the denominator, an error there moves the answer every time: two beats too high at a resting rate of 50 costs roughly four percent of the result.',
        'If you have never pushed to a true maximum, choose one of the age-predicted options in the form and accept the wider error, or do not use the figure at all. The heart rate zone calculator linked below shows how far apart the age-predicted equations are for the same person.',
      ],
    },
    {
      h2: 'What the number is good for, and what it is not',
      paragraphs: [
        'VO2max is the amount of oxygen your body consumes per minute per kilogram of body mass at the limit of aerobic effort, expressed here in millilitres per kilogram per minute, and divided by 3.5 it converts to METs, multiples of the resting metabolic rate. Castagna opens with the reason people care: maximal oxygen uptake is associated with cardiovascular and metabolic health in the general population. Association is as far as this page goes.',
        'This calculator deliberately does not grade your result against an age-and-sex norm table. Normative tables for cardiorespiratory fitness are published in the American College of Sports Medicine guideline volumes, which are books rather than indexed papers, and the reference values on those pages could not be read from a primary source during the citation check for this page. Following the rule this site sets for itself, unverifiable reference data is left out rather than estimated, so you get the raw number and its error bar and nothing that dresses it up as a verdict.',
        'The dependable use is longitudinal: same measurement method, same time of day, same resting-rate protocol, tracked over months. Because the equation is a ratio, it responds to the two things training changes first, a lower resting rate and a slightly higher usable maximum, and both moves are in the same direction, which is what makes the trend readable even when the absolute value is off by a couple of points.',
      ],
    },
  ],
  faq: [
    { q: 'Is 15.3 or 15 the right factor?', a: 'Uth and colleagues measured 15.3 with a standard deviation of 0.7 in a subgroup of 10 well-trained men, and derived approximately 15 from Fick-principle reasoning. Castagna used the theoretical 15 and found a population-specific value of 14.6 with a standard deviation of 2.6 in recreational players. This page shows all three, and the gap between them is part of the error.' },
    { q: 'Why does my resting heart rate matter so much?', a: 'It is the denominator. The estimate is the factor multiplied by maximum divided by resting rate, so a two-beat error at a resting rate of 50 changes the answer by about four percent, which is more than a tenth of the published standard error.' },
    { q: 'Should I enter a measured or an age-predicted maximum?', a: 'Measured if you have one. With a measured maximum the published standard error of estimate is 2.7 ml/kg/min; substituting an age-predicted maximum raises it to 4.7 ml/kg/min, roughly 7.8 percent.' },
    { q: 'Does this work for women?', a: 'The validation sample was 46 well-trained men aged 21 to 51, and the authors state that use in other groups will have to await direct validation. Nothing in the derivation is sex-specific, but nothing here can tell you how much that matters.' },
    { q: 'Why does this page not tell me whether my VO2max is good?', a: 'Because the normative tables by age and sex live in ACSM guideline books, which are not indexed primary sources, and this site does not publish reference data it could not read at the source. You get the number, its units, its MET equivalent and its error bar.' },
    { q: 'Can I use this to track training?', a: 'That is the best use, provided the resting and maximum rates are measured the same way each time. A change of less than about 3 ml/kg/min with a measured maximum is within the published standard error.' },
  ],
  related: ['heart-rate-zone-calculator', 'caffeine-half-life-calculator', 'us-navy-body-fat-calculator'],
}

export function compute(i, k) {
  const rest = Number(i.hrrest) || 0
  const age = Number(i.age) || 0
  const src = i.maxSource || 'measured'
  let max = Number(i.hrmax) || 0
  if (src === 'tanaka' && age > 0) max = 208 - 0.7 * age
  if (src === 'nes' && age > 0) max = 211 - 0.64 * age
  if (!(max > 0)) return { error: src === 'measured' ? 'Enter your measured maximum heart rate.' : 'Enter an age to predict a maximum.' }
  if (!(rest > 0)) return { error: 'Enter a measured resting heart rate.' }
  const ratio = max / rest
  const rows = k.factors.map(f => ({
    factor: f.label,
    vo2max: Math.round(f.value * ratio * 10) / 10,
    mets: Math.round(f.value * ratio / 3.5 * 10) / 10,
    basis: f.basis,
  }))
  return {
    hrmaxUsed: Math.round(max),
    ratioUsed: Math.round(ratio * 100) / 100,
    see: src === 'measured' ? 'published standard error 2.7 ml/kg/min (about 4.5%)' : 'published standard error 4.7 ml/kg/min (about 7.8%), because an age-predicted maximum adds its own error',
    rows,
  }
}
