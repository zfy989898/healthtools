export const tool = {
  slug: 'waist-to-height-ratio-calculator',
  name: 'Waist to Height Ratio Calculator',
  h1: 'Waist-to-Height Ratio Calculator: Should Your Waist Be Under Half Your Height?',
  seo: {
    title: 'Waist to Height Ratio (WHtR) Calculator | HealthTools',
    desc: 'Calculate your waist-to-height ratio in centimetres or inches and compare it with the published 0.5 boundary value, with the study evidence behind that cut-off and what it cannot tell you.',
  },
  intro: 'Waist-to-height ratio (WHtR) is one number divided by another: your waist circumference by your height. This page computes it from either centimetres or inches, then sets it against the boundary value of 0.5 that the published screening literature uses - and states what that boundary is and is not evidence of, which most WHtR pages skip entirely.',
  category: 'body-composition',
  provenance: {
    source: 'Browning LM, Hsieh SD, Ashwell M. "A systematic review of waist-to-height ratio as a screening tool for the prediction of cardiovascular disease and diabetes: 0.5 could be a suitable global boundary value", Nutr Res Rev 2010 Dec;23(2):247-69, doi 10.1017/S0954422410000144, PMID 20819243 - collates 78 studies, reports mean AUROC values of 0.704 for WHtR, 0.693 for waist circumference and 0.671 for BMI, and mean boundary values of 0.50 for men and 0.50 for women across studies in fourteen countries. Ashwell M, Gunn P, Gibson S. "Waist-to-height ratio is a better screening tool than waist circumference and BMI for adult cardiometabolic risk factors: systematic review and meta-analysis", Obes Rev 2012 Mar;13(3):275-86, doi 10.1111/j.1467-789X.2011.00952.x, PMID 22106927 - 31 papers and more than 300,000 adults; waist circumference improved discrimination over BMI by 3% (P<0.05) and WHtR by 4-5% (P<0.01), and WHtR was significantly better than waist circumference for diabetes, hypertension, cardiovascular disease and all outcomes combined (P<0.005) in men and women. Ashwell M, Gibson S. "Waist-to-height ratio as an indicator of \'early health risk\': simpler and more predictive than using a \'matrix\' based on BMI and waist circumference", BMJ Open 2016 Mar 14;6(3):e010159, doi 10.1136/bmjopen-2015-010159, PMID 26975935 - 1,453 adults in the UK National Diet and Nutrition Survey 2008-2012; 35% of those classed at "no increased risk" by the BMI/waist matrix had WHtR at or above 0.5. Gibson S, Ashwell M. "A simple cut-off for waist-to-height ratio (0.5) can act as an indicator for cardiometabolic risk: recent data from adults in the Health Survey for England", Br J Nutr 2020 Mar 28;123(6):681-690, doi 10.1017/S0007114519003301, PMID 31840619 - 4,112 adults aged 18 and over; of adults with raised HbA1c, 15% would be judged at no increased risk by the matrix against 3% using WHtR 0.5, for hypertension 23% against 9%, and for total/HDL cholesterol above 4, 26% against 13%.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20819243/',
    retrieved: '2026-09-23',
    verified: true,
    checks: [
      { pmid: '20819243', first_author: 'Browning', year: '2010', journal: 'Nutr Res Rev', doi: '10.1017/S0954422410000144' },
      { pmid: '22106927', first_author: 'Ashwell', year: '2012', journal: 'Obes Rev', doi: '10.1111/j.1467-789X.2011.00952.x' },
      { pmid: '26975935', first_author: 'Ashwell', year: '2016', journal: 'BMJ Open', doi: '10.1136/bmjopen-2015-010159' },
      { pmid: '31840619', first_author: 'Gibson', year: '2020', journal: 'Br J Nutr', doi: '10.1017/S0007114519003301' },
    ],
  },
  constants: {
    unitOptions: [
      { key: 'metric', label: 'Centimetres' },
      { key: 'imperial', label: 'Inches' },
    ],
    boundary: 0.5,
    cmPerInch: 2.54,
    auroc: { whtr: 0.704, waist: 0.693, bmi: 0.671 },
  },
  formula: {
    expression: 'WHtR = waist circumference / height, with both measured in the same unit. Boundary value used by the cited literature: 0.5. Because it is a ratio, centimetres and inches give the identical answer.',
    description: 'Divide the waist reading by the height reading. A 34-inch waist at 5 feet 10 inches (70 inches) is 34 / 70 = 0.49. The same measurements in centimetres, 86.4 / 177.8, give 0.49 again - the units cancel, so the choice of unit changes only the labels on the form, not the number. The published boundary is a single value applied to both sexes and, in the 2010 review, across Caucasian, Asian and Central American samples.',
    citation: 'Boundary value and comparative discrimination figures from Browning LM et al., Nutr Res Rev 2010;23(2):247-69 (PMID 20819243) and Ashwell M et al., Obes Rev 2012;13(3):275-86 (PMID 22106927). Cohort classification figures from BMJ Open 2016;6(3):e010159 (PMID 26975935) and Br J Nutr 2020;123(6):681-90 (PMID 31840619).',
  },
  inputs: [
    { id: 'unit', label: 'Units', type: 'select', optionsKey: 'unitOptions' },
    { id: 'waist', label: 'Waist circumference', unit: 'cm or in', type: 'number', min: 40, max: 200 },
    { id: 'height', label: 'Height', unit: 'cm or in', type: 'number', min: 100, max: 240 },
  ],
  workedExamples: [
    { label: 'Waist 92 cm at 178 cm', inputs: { unit: 'metric', waist: 92, height: 178 } },
    { label: 'Waist 71 cm at 162 cm', inputs: { unit: 'metric', waist: 71, height: 162 } },
    { label: 'Waist 36 in at 5 ft 10 in (70 in)', inputs: { unit: 'imperial', waist: 36, height: 70 } },
    { label: 'Waist 104 cm at 182 cm', inputs: { unit: 'metric', waist: 104, height: 182 } },
  ],
  limitation: 'This is a screening ratio, not a diagnosis, and the 0.5 figure is a mean boundary value drawn from pooled ROC analyses rather than a clinical threshold. The cited papers measure how well WHtR separates groups with cardiometabolic risk factors from groups without them; a discrimination statistic of that kind says nothing reliable about one individual. None of the four sources measures body composition, so a person with a small waist and high visceral fat, and a heavily muscled person with a large waist, can both be misclassified by this number. The four studies share authors with the group that has promoted the ratio, which is a reason to read the "better than BMI" claims as one research programme\'s finding rather than settled consensus. Age, sex and ethnicity shift where a given waist measurement sits on the risk curve, and the cited reviews did not produce separate boundary values for each of those strata. If a result here concerns you, the number to act on is whatever a clinician measures directly: blood pressure, lipids, glycated haemoglobin.',
  sections: [
    {
      h2: 'How to read the result',
      paragraphs: [
        'The calculator returns your ratio, the waist measurement that would place you exactly at 0.5 for your height, and the distance between the two, expressed in whichever unit you entered. A ratio below 0.5 is the region the cited papers describe as the lower-risk side of the boundary; a ratio at or above 0.5 is where their screening analyses would flag a person for further measurement.',
        'That is the whole of what the number supports. It is not a body fat percentage, not a risk percentage, and not a diagnosis of anything. Two people at 0.52 can be in completely different metabolic positions, and the ratio cannot tell them apart because the only things it knows are a tape measure and a stadiometer.',
        'The "waist at exactly 0.5" figure is the most actionable line in the output, because it converts an abstract cut-off into a measurement you can check with a tape. If it says 82 cm and you measured 90 cm, the arithmetic says 8 cm of waist separates you from the boundary. It does not say that losing 8 cm moves you out of a risk category, because the boundary is a line drawn through study data, not a step in the underlying biology.',
      ],
    },
    {
      h2: 'Where the 0.5 boundary comes from',
      paragraphs: [
        'The 2010 systematic review in Nutrition Research Reviews gathered 78 studies of waist-to-height ratio, waist circumference and BMI as predictors of diabetes and cardiovascular disease, published in English between 1950 and 2008. Across those studies the mean area under the receiver-operating-characteristic curve was 0.704 for WHtR, 0.693 for waist circumference and 0.671 for BMI. Mean boundary values for WHtR, covering all cardiometabolic outcomes in studies from fourteen countries and including Caucasian, Asian and Central American subjects, came out at 0.50 for men and 0.50 for women.',
        'The 2012 meta-analysis in Obesity Reviews narrowed the comparison to 31 papers and more than 300,000 adults. Against BMI, waist circumference improved discrimination of adverse outcomes by 3% (P<0.05) and WHtR by 4-5% (P<0.01). On the within-study differences in AUC, WHtR was significantly better than waist circumference for diabetes, hypertension, cardiovascular disease and all outcomes combined, at P<0.005 in both men and women.',
        'Two points follow from the papers themselves rather than from interpretation. First, the advantage over waist circumference is the part that matters for the ratio, because a bare waist number has no height term in it: at 0.704 against 0.693 the margin is small, and the 2012 analysis is what supports it statistically. Second, "better than BMI" is a statement about discrimination between groups. BMI has its own well-documented weaknesses, and beating it on an AUROC is a lower bar than the phrase suggests.',
      ],
    },
    {
      h2: 'Why a ratio instead of a waist measurement alone',
      paragraphs: [
        'The information in a waist number comes from its relationship to the frame carrying it. A 94 cm waist is a different physical situation on a 155 cm skeleton and on a 190 cm one, and absolute waist cut-offs cannot express that difference. Dividing by height restores it, which is the entire conceptual content of WHtR.',
        'That is also what the cohort papers tested directly. In the UK National Diet and Nutrition Survey data (1,453 adults, 2008-2012), 35% of the people classified at "no increased risk" by the conventional matrix of BMI bands and waist circumference thresholds had a WHtR at or above 0.5. The matrix could not see them because it evaluates the two measurements separately; the ratio is the same two measurements combined.',
        'The 2020 Health Survey for England analysis (4,112 adults aged 18 and over) put the same comparison against laboratory markers. Among adults with raised glycated haemoglobin, 15% would have been judged at no increased risk by the matrix, against 3% using WHtR 0.5. For hypertension the pair was 23% and 9%, and for total-to-HDL cholesterol above 4, 26% and 13%. The authors\' conclusion is that a single ratio cut-off under-diagnoses fewer people than the two-axis matrix, and they note that NICE had acknowledged the ratio\'s value as an indicator of early health risk.',
        'A useful caution sits inside those numbers. The comparison is between two screening rules, not between screening and not screening. Halving a missed-case rate within a cross-sectional survey is not the same as showing that acting on the ratio improves outcomes, and none of these four papers follows anyone forward to a treatment decision.',
      ],
    },
    {
      h2: 'Measuring a waist that is comparable to the studies',
      paragraphs: [
        'The ratio is only as good as the tape measure, and waist circumference is the more variable of the two inputs by a wide margin. The measurement sites differ between published studies - some take the level of the navel, others the midpoint between the lowest rib and the top of the hip bone - and a shift of two centimetres between those two sites is ordinary, which at 175 cm height is more than one twentieth of the distance to the boundary.',
        'Practically: stand, feet shoulder-width apart, arms at the sides. Find the top of your hip bone and the bottom of your last rib, and put the tape about halfway between them, in the horizontal plane, at the end of a normal breathe out. Do not suck in, do not measure over a pulled-up shirt, and do not take the reading standing slumped, which pushes the abdomen out. A fibreglass tape that has not stretched is worth more than any calculation here.',
        'Take three readings and use the middle one. Enter your height without shoes against a wall, heels together, because a measured height taken in the morning differs from an evening one and shoes add 2-3 cm that inflates the denominator and lowers your ratio.',
      ],
    },
    {
      h2: 'What this page does not claim',
      paragraphs: [
        'You will not get a colour-coded risk band, a "healthy waist range", or an age-and-sex adjustment table from this calculator. Some WHtR pages print tiers such as 0.5-0.6 as moderate risk and 0.6 and above as high risk. Those tiers are not in the four papers on this page. What those papers support is one boundary value, 0.5, reported as a mean across studies and applied to both sexes, so this page reports the position relative to that line and nothing more precise than that.',
        'The same rule applies to the comparative accuracy figures. The AUROC values are printed on this page because they are stated in the cited abstract and they let you judge the size of the claimed advantage; they are not converted into a personal probability, because no such conversion exists. A 0.704 area under the curve describes how often the ratio ranks a randomly chosen affected person above a randomly chosen unaffected one in a study population.',
        'For tracking change in yourself, the ratio has one genuine practical advantage over weight or BMI: it responds to where you lose, not only how much. If two people both lose 4 kg, one from the abdomen and one from elsewhere, only the first sees this number move. That makes it a reasonable thing to re-measure monthly under fixed conditions - and the trend, not any single reading, is what carries information.',
      ],
    },
  ],
  faq: [
    { q: 'What is a good waist-to-height ratio?', a: 'The published screening literature uses one boundary value: 0.5, reported as the mean across studies in fourteen countries and for both men and women. Below it is the region those studies treat as lower risk; at or above it is where they flag someone for further measurement. That is a mean boundary from ROC analyses, not a clinical threshold, and these papers do not define graded tiers above 0.5.' },
    { q: 'Is waist-to-height ratio better than BMI?', a: 'In the two systematic reviews cited here it discriminates better. Mean AUROC was 0.704 for the ratio against 0.671 for BMI in the 2010 review, and the 2012 meta-analysis of 31 papers covering more than 300,000 adults found the ratio improved discrimination by 4-5% over BMI (P<0.01). All four sources share authors with the group that has advocated the ratio, so treat the margin as that programme\'s finding rather than settled consensus across independent groups.' },
    { q: 'Does the ratio work the same in inches as in centimetres?', a: 'Yes. It is one length divided by another, so the units cancel: 92 cm over 178 cm and 36.2 in over 70.1 in are both 0.52. The unit selector on this page only changes what you are asked to type in.' },
    { q: 'How do I measure my waist for this?', a: 'Stand with arms at your sides and place a horizontal tape about halfway between the top of your hip bone and the bottom of your last rib, at the end of a normal exhale. Do not pull it in or measure over thick clothing. Take three readings and use the middle one, and measure at the same time of day each time you recheck.' },
    { q: 'Can I be slim and still have a ratio above 0.5?', a: 'Yes, and that case is the reason the cohort papers were interesting. The 2016 NDNS analysis found 35% of adults classed at no increased risk by the BMI and waist matrix had a ratio at or above 0.5. The ratio also cannot see body composition, so a muscular person with a large waist can be flagged without carrying excess fat. It is a reason to get actual blood pressure and lipid measurements, not a verdict.' },
  ],
  related: ['us-navy-body-fat-calculator', 'body-fat-from-bmi-calculator'],
}

export function compute(i, k) {
  const rawWaist = Number(i.waist) || 0
  const rawHeight = Number(i.height) || 0
  if (!rawWaist || !rawHeight) return { error: 'Enter both a waist measurement and a height.' }
  const factor = i.unit === 'imperial' ? k.cmPerInch : 1
  const waistCm = rawWaist * factor
  const heightCm = rawHeight * factor
  if (waistCm >= heightCm) return { error: 'A waist larger than your whole height is not a measurement this ratio can use - check you have not entered your height in the waist box.' }
  if (waistCm < 40 || waistCm > 220) return { error: 'That waist measurement is outside the range this page will calculate. Check the unit selector matches the numbers you typed.' }
  if (heightCm < 100 || heightCm > 240) return { error: 'That height is outside the range this page will calculate. Check the unit selector matches the numbers you typed.' }
  const r = waistCm / heightCm
  if (r < 0.3 || r > 0.95) return { error: 'Those two numbers give an implausible ratio. The waist is usually well under half the height, so check you have not swapped them.' }
  const round = (v, d) => Math.round(v * 10 ** d) / 10 ** d
  const boundaryWaistCm = heightCm * k.boundary
  const unit = i.unit === 'imperial' ? 'in' : 'cm'
  const toUnit = cm => i.unit === 'imperial' ? cm / k.cmPerInch : cm
  const shown = cm => `${round(toUnit(cm), 1)} ${unit}`
  return {
    whtr: round(r, 2),
    status: r >= k.boundary ? 'At or above 0.5' : 'Below 0.5',
    boundaryWaist: shown(boundaryWaistCm),
    waistVsBoundary: `${waistCm >= boundaryWaistCm ? '+' : '-'}${shown(Math.abs(waistCm - boundaryWaistCm))}`,
    // Deliberately no risk tier: the cited reviews support one mean boundary value, not graded bands.
  }
}
