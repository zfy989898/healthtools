export const tool = {
  slug: 'us-navy-body-fat-calculator',
  name: 'US Navy Body Fat Calculator',
  h1: 'US Navy Body Fat Calculator (Tape Measure Method)',
  seo: {
    title: 'US Navy Body Fat Calculator | Tape Measure Method',
    desc: 'Body fat percentage from neck, waist and hip circumferences using the tape-measure equations the US military applies, with the error those validation papers reported against DXA.',
  },
  intro: 'The US Navy body fat method estimates body fat from a tape measure - neck, waist and, for women, hip circumference - with no weigh-in, no scan and no skinfold calliper. This page applies the circumference equations the military uses, then states the error those equations carry rather than presenting the number as exact.',
  category: 'body-composition',
  provenance: {
    source: 'Foulis SA, Friedl KE, Spiering BA, Walker LA, Guerriere KI, Pecorelli VP, Zeppetelli DJ, Reynoso MC, Taylor KM, Hughes JM. Body composition changes during 8 weeks of military training are not accurately captured by circumference-based assessments. Front Physiol 2023;14:1183836, PMID 37351259, doi 10.3389/fphys.2023.1183836 - prints both equations and reports circumference error against DXA. Potter AW, Friedl KE. US Army Accession and Retention Standards: Impact on Obesity and Medical Readiness. Mil Med 2025;190(7-8):e1587-e1594, PMID 39721003, doi 10.1093/milmed/usae554 - prints the same equations as prescribed for all services in DoDI 1308.1 (November 2002) and gives the Army body-fat standard ranges. Foulis attributes the underlying method to the Navy in 1984 (Hodgdon and Beckett) and to Hodgdon 1992; that 1984 report is not indexed in MEDLINE, so this page cites the two indexed papers above, which reproduce the constants verbatim.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10282178/',
    retrieved: '2026-09-20',
    verified: true,
    checks: [
      { pmid: '37351259', first_author: 'Foulis', year: '2023', journal: 'Front Physiol', doi: '10.3389/fphys.2023.1183836' },
      { pmid: '39721003', first_author: 'Potter', year: '2025', journal: 'Mil Med', doi: '10.1093/milmed/usae554' },
    ],
  },
  constants: {
    sexOptions: [
      { key: 'male', label: 'Male' },
      { key: 'female', label: 'Female' },
    ],
    armyStandardRange: { male: '20-26', female: '30-36' },
  },
  formula: {
    expression: 'Male: %fat = 86.010 x log10((waist - neck)/2.54) - 70.041 x log10(height/2.54) + 36.76.  Female: %fat = 163.205 x log10((waist + hip - neck)/2.54) - 97.684 x log10(height/2.54) - 78.387.  Enter centimetres; the published equations take inches, so the code divides each measurement by 2.54 before taking log10.',
    description: 'Logarithm base 10. The centimetre inputs are converted inside the logarithms, which is what the cited papers print; applying the same constants to raw centimetre values shifts the answer, see the section below.',
    citation: 'Foulis SA et al., Front Physiol 2023;14:1183836 (PMID 37351259); Potter AW, Friedl KE, Mil Med 2025;190(7-8):e1587-e1594 (PMID 39721003). Method developed for the US Navy in 1984 by Hodgdon and Beckett, per Foulis.',
  },
  inputs: [
    { id: 'sex', label: 'Sex', type: 'select', optionsKey: 'sexOptions' },
    { id: 'age', label: 'Age', unit: 'years', type: 'number', min: 18, max: 100 },
    { id: 'height', label: 'Height', unit: 'cm', type: 'number', min: 120, max: 230 },
    { id: 'neck', label: 'Neck circumference', unit: 'cm', type: 'number', min: 20, max: 70 },
    { id: 'waist', label: 'Waist circumference', unit: 'cm', type: 'number', min: 40, max: 200 },
    { id: 'hip', label: 'Hips at widest point', unit: 'cm', type: 'number', min: 50, max: 220, showIf: 'female' },
  ],
  workedExamples: [
    { label: 'Male, 178 cm, neck 38, waist 92', inputs: { sex: 'male', age: 34, height: 178, neck: 38, waist: 92, hip: 0 } },
    { label: 'Female, 165 cm, neck 32, waist 78, hip 98', inputs: { sex: 'female', age: 29, height: 165, neck: 32, waist: 78, hip: 98 } },
    { label: 'Male, 182 cm, neck 41, waist 104', inputs: { sex: 'male', age: 47, height: 182, neck: 41, waist: 104, hip: 0 } },
  ],
  limitation: 'Against DXA in 1,407 soldiers at the start of basic training, these circumference equations underestimated body fat by a mean of 6.0 percentage points in both sexes, with a spread of about 4 points in women and 3.5 in men. This is not a compliance determination and not a clinical measure of adiposity; the Army stopped using these equations for that purpose in 2023.',
  sections: [
    {
      h2: 'Where to put the tape',
      paragraphs: [
        'The cited papers define the sites, and they differ by sex. For men the circumference of interest is the abdomen at the level of the umbilicus, measured together with the neck. For women the equations use the natural waist - the narrowest part of the torso - the hips at their widest point, and the neck.',
        'Use a fibreglass tape rather than a cloth one that stretches, measure over bare skin or a single thin layer, and keep the tape horizontal by checking it against a mirror on both sides. Do not pull it in far enough to compress soft tissue.',
        'For men, take the abdominal reading in the relaxed state at the end of a normal exhale, not sucked in. For women, the narrowest part of the torso is usually above the navel, so the same tape position used for a man will bias the result. Take two or three readings at each site and enter the median.',
        'If you are tracking change over time, measure at the same time of day, fasted, before training. Daytime fluid shifts and food volume move abdominal circumference enough to swamp the change you are looking for.',
      ],
    },
    {
      h2: 'How accurate it is, with the numbers',
      paragraphs: [
        'Foulis and colleagues examined 481 women and 926 men at the start of US Army basic training and again eight weeks later, comparing the circumference equations against dual-energy X-ray absorptiometry. At the start of training the circumference method underestimated body fat by 6.0 percentage points on average in both sexes - a standard deviation of 4.4 points in women and 3.5 in men - and the difference between the sexes was not significant.',
        'The longitudinal result is the more damaging one. Over the eight weeks DXA measured a fall of 4.0 points in women and 3.3 points in men, both significant, while the circumference equations reported no change at all in women (0.0 points, p = 0.86) and a smaller change in men (2.2 points). The authors conclude that circumference-based metrics may not be an appropriate tool for tracking body-composition change over short training blocks.',
        'The same paper records what the method has always been known to do: it underestimates body fat at the upper end of the range and overestimates it at the lower end relative to criterion methods such as underwater weighing. A lean, wide-hipped build and an internally-carried build are both read badly by a tape measure.',
        'The practical use is a rough level, not a trend line and not a verdict. If a number from this calculator matters to you, get a DXA or at least measure the same way, at the same time of day, every time.',
      ],
    },
    {
      h2: 'The centimetre problem',
      paragraphs: [
        'Most pages offering this calculator apply the constants straight to centimetre values. The equations were fitted on inches, and both of the indexed papers that print them convert centimetres by dividing by 2.54 before taking the logarithm.',
        'That distinction is not cosmetic. Because log10(x/2.54) equals log10(x) minus log10(2.54), feeding raw centimetres into the male equation shifts the result by (86.010 - 70.041) x 0.40483, about 6.5 percentage points, in the same direction as the paper-reported bias against DXA. This calculator does the conversion, so its output sits roughly 6 points below the naive centimetre version for men.',
        'If you have a figure from another site and it looks implausibly high, that is probably why.',
      ],
    },
    {
      h2: 'The military standards this method was built to enforce',
      paragraphs: [
        'Potter and Friedl report that military body-fat standards were mandated in the United States in the early 1980s, that the Army eventually set sex- and age-based standards ranging from 20 to 26 percent body fat for men and 30 to 36 percent for women, and that the most liberal limits, 26 and 36 percent, apply to soldiers over 40. They also note that the original directive specified 20 and 26 percent for all men and women, and argue that the standards have become a de facto weight target that pushes larger soldiers into risky acute weight loss to make the number.',
        'That is an administrative standard for service fitness, not a health recommendation, and this page shows the published range only as context for the figure you computed. It does not print a per-age-band table, because the specific table in DoD Instruction 1308.03 could not be retrieved from the publisher during the source check for this page, and a reference value that cannot be read from its own document does not get published here.',
        'Potter and Friedl also record that the Army replaced these DoD-prescribed circumference equations with a new method under Army Directive 2023-11, which is a reasonable indication of how the military itself regarded the accuracy of the tape method.',
      ],
    },
    {
      h2: 'Why it disagrees with BMI',
      paragraphs: [
        'BMI divides mass by height and cannot distinguish muscle, fat, bone and organ size, so a muscular athlete and a sedentary person of the same build can share a BMI while differing widely in fatness. The circumference method reads where tissue sits, and the two routinely disagree.',
        'Neither is a direct measurement of body composition the way a DXA scan is; both are proxies, and the proxy error for this one is measured and printed above. That is why this page shows the formula and its validation data rather than presenting a single number as truth.',
      ],
    },
  ],
  faq: [
    { q: 'Why does this differ from a BMI-based body-fat estimate?', a: 'BMI uses only mass and height, so it cannot see where tissue sits. This method uses circumferences, which capture fat distribution, so the two routinely disagree by wide margins. Neither is a measurement of adiposity in the way a DXA scan is.' },
    { q: 'Where exactly do I measure?', a: 'Men: abdomen at the level of the navel, plus the neck. Women: the natural waist at the narrowest part of the torso, the hips at the widest point, plus the neck. All of the cited papers measure over bare skin or thin clothing with the tape held horizontal.' },
    { q: 'Can I enter inches?', a: 'The form asks for centimetres and converts them to inches inside the logarithms, which is how the cited papers write the equations. If you work in inches, enter the centimetre equivalent (1 inch = 2.54 cm).' },
    { q: 'How far off is this likely to be?', a: 'In 1,407 soldiers compared against DXA, the mean error was 6.0 percentage points of body fat low, with a standard deviation of 3.5 to 4.4 points. Bias also runs with body type: it underestimates at the high end of fatness and overestimates at the low end.' },
    { q: 'Can I use this to check whether I meet military standards?', a: 'No. The Army replaced these equations with a different method under Army Directive 2023-11, and service-specific tables are administrative determinations made by personnel with a certified measurement technique. The range shown here is quoted context only.' },
    { q: 'Is the age input used in the calculation?', a: 'No. The circumference equations take height, neck, waist and, for women, hips. Age is asked only to select the body-fat standard range quoted alongside the result, because the published Army limits are age-banded.' },
  ],
  related: ['caffeine-half-life-calculator', 'heart-rate-zone-calculator'],
}

export function compute(i, k) {
  const sex = i.sex === 'female' ? 'female' : 'male'
  const h = Number(i.height), n = Number(i.neck), w = Number(i.waist), hip = Number(i.hip) || 0
  if (!(h > 0 && n > 0 && w > 0)) return { error: 'Enter height, neck and waist.' }
  const IN = 2.54
  let pct
  if (sex === 'male') {
    if (w - n <= 0) return { error: 'Waist must be larger than neck.' }
    pct = 86.010 * Math.log10((w - n) / IN) - 70.041 * Math.log10(h / IN) + 36.76
  } else {
    if (hip <= 0 || w + hip - n <= 0) return { error: 'For the female equation, hips and waist must both be measured.' }
    pct = 163.205 * Math.log10((w + hip - n) / IN) - 97.684 * Math.log10(h / IN) - 78.387
  }
  const age = Number(i.age) || 0
  const limits = sex === 'male' ? '26% over 40, down to 20% for the youngest' : '36% over 40, down to 30% for the youngest'
  return {
    bodyFat: Math.round(pct * 10) / 10,
    publishedError: 'mean -6.0 percentage points versus DXA',
    armyRange: `${k.armyStandardRange[sex]}% published Army range - ${limits}`,
    ageUsed: age > 0 ? (age >= 40 ? 'over 40: the most liberal published limit' : 'under 40: a stricter limit applies') : 'no age entered',
  }
}
