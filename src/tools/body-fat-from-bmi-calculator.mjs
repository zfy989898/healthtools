export const tool = {
  slug: 'body-fat-from-bmi-calculator',
  name: 'Body Fat From BMI Calculator',
  h1: 'Body Fat Percentage From BMI: The Deurenberg Formula',
  seo: {
    title: 'Body Fat Percentage Calculator From BMI | HealthTools',
    desc: 'Calculate body fat percentage from height, weight, age and sex using the Deurenberg prediction formula, with its published error of 4.1 points and where it goes wrong.',
  },
  intro: 'This page calculates body fat percentage from the four numbers most people already know - height, weight, age and sex - using the prediction formula published by Deurenberg and colleagues in 1991. It is the formula behind most "body fat from BMI" calculators on the internet, and this page states both the constants and the error they carry, which those calculators usually do not.',
  category: 'body-composition',
  provenance: {
    source: 'Deurenberg P, Weststrate JA, Seidell JC. "Body mass index as a measure of body fatness: age- and sex-specific prediction formulas", Br J Nutr 1991 Mar;65(2):105-14, doi 10.1079/bjn19910073, PMID 2043597. The abstract of that paper states the adult formula BF% = 1.20 x BMI + 0.23 x age - 10.8 x sex - 5.4 with R-squared 0.79 and standard error of the estimate 4.1% body fat, the child formula for those aged 15 and under, the coding of the sex variable (males = 1, females = 0), the sample of 1,229 subjects (521 men, 708 women) aged 7-83 years with BMI 13.9-40.9 kg/m2, the method of measurement (densitometry and anthropometry), and the finding that in obese subjects the formulas slightly overestimated body fat percentage.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/2043597/',
    retrieved: '2026-09-21',
    verified: true,
    checks: [
      { pmid: '2043597', first_author: 'Deurenberg', year: '1991', journal: 'Br J Nutr', doi: '10.1079/bjn19910073' },
    ],
  },
  constants: {
    sexOptions: [
      { key: 'male', label: 'Male', coded: 1 },
      { key: 'female', label: 'Female', coded: 0 },
    ],
    coefficients: { bmi: 1.20, age: 0.23, sex: 10.8, intercept: 5.4 },
    seePercentagePoints: 4.1,
    rSquared: 0.79,
    validatedBmiRange: [13.9, 40.9],
    referenceFormulaForChildren: 'BF% = 1.51 x BMI - 0.70 x age - 3.6 x sex + 1.4 (aged 15 and under, R-squared 0.38, SEE 4.4% body fat)',
  },
  formula: {
    expression: 'BF% = 1.20 x BMI + 0.23 x age - 10.8 x sex - 5.4, where BMI = weight in kg / (height in m)^2 and sex is coded 1 for male, 0 for female',
    description: 'A single linear equation. The sex term subtracts 5.4 points for everyone and then a further 10.8 points for males, which is why the same BMI produces a substantially lower body fat estimate for a man than for a woman. Age adds 0.23 points per year, so two people of identical BMI ten years apart differ by 2.3 points of estimated body fat.',
    citation: 'Deurenberg P, Weststrate JA, Seidell JC. Br J Nutr 1991;65(2):105-14 (PMID 2043597). Constants and error figures are quoted from the published abstract.',
  },
  inputs: [
    { id: 'sex', label: 'Sex', type: 'select', optionsKey: 'sexOptions' },
    { id: 'age', label: 'Age', unit: 'years', type: 'number', min: 16, max: 90 },
    { id: 'height', label: 'Height', unit: 'cm', type: 'number', min: 130, max: 230 },
    { id: 'weight', label: 'Weight', unit: 'kg', type: 'number', min: 35, max: 250 },
  ],
  workedExamples: [
    { label: 'Man, 35 years, 178 cm, 82 kg', inputs: { sex: 'male', age: 35, height: 178, weight: 82 } },
    { label: 'Woman, 35 years, 165 cm, 68 kg', inputs: { sex: 'female', age: 35, height: 165, weight: 68 } },
    { label: 'Man, 60 years, 172 cm, 74 kg', inputs: { sex: 'male', age: 60, height: 172, weight: 74 } },
  ],
  limitation: 'The published standard error of the estimate is 4.1 percentage points of body fat, meaning roughly one in three people who use this formula get an answer more than 4 points away from their measured body fat, and some considerably further. The formula was derived from a Dutch sample measured by densitometry in 1991 and is not adjusted for ethnicity, for the ratio of muscle to fat, or for fat distribution. The authors report that in obese subjects the formula slightly overestimates body fat percentage, and inputs above BMI 40.9 or below 13.9 sit outside the range the equation was fitted on. This is a population prediction applied to one person, not a measurement of you.',
  sections: [
    {
      h2: 'How to read the answer',
      paragraphs: [
        'The calculator gives you a single estimated body fat percentage plus a range. That range is not a guess at precision - it is the standard error of the estimate reported in the source paper, applied either side of the point figure. If the page returns 22 percent, the honest reading is "somewhere between roughly 18 and 26 percent, most likely near 22".',
        'The fat mass and fat-free mass figures are derived by multiplying your entered weight by that percentage. They inherit the same error, and because they are mass rather than a percentage, a four-point error at 82 kg is over three kilograms of tissue. Anyone using these numbers to set a target weight should treat the fat-free figure as the more stable of the two, because it changes less when the percentage moves.',
        'The percentage band shown alongside the result is descriptive only. Population averages by age and sex vary by study, sport and country, and this page does not have a traceable reference table for them, so it does not claim where you rank. A number on this page that is not backed by the cited paper would be worth less than no number at all.',
      ],
    },
    {
      h2: 'Why the same BMI gives different body fat',
      paragraphs: [
        'BMI is weight divided by the square of height, and it knows nothing about what that weight is made of. Two people at BMI 27 can differ by ten points of body fat if one lifts weights and the other does not. The formula compensates for the two things BMI cannot see, using the only signals available to it: sex and age.',
        'The sex term is the larger of the two. At a given BMI, women carry proportionally more fat mass than men as a normal physiological difference, and the equation encodes about 11 percentage points of that separation. The age term is smaller but not trivial: at 0.23 points a year, a 25-year-old and a 55-year-old at identical BMI are told they differ by just under 7 points of estimated body fat.',
        'That is also the formula\'s main weakness. It adjusts for age as a smooth line, which is a reasonable description of what happens to the average person, and a poor description of anyone who has spent those thirty years resistance training. Age here is standing in for the loss of muscle that tends to accompany it, and if that loss has not happened in your case, the correction pushes the estimate in the wrong direction.',
      ],
    },
    {
      h2: 'What the formula was built on',
      paragraphs: [
        'The 1991 study analysed 1,229 apparently healthy people - 521 men and 708 women - aged 7 to 83 years, spanning BMI from 13.9 to 40.9 kg per square metre. Body composition was determined by densitometry, the underwater weighing method that served as the reference standard before DEXA scans became routine, together with anthropometry.',
        'The relationship between measured body fat and BMI was then modelled with age and sex added, and the resulting equation was validated both internally and against a separate sample. The reported fit was R-squared 0.79, which means BMI, age and sex together accounted for about four fifths of the variation in measured body fat across that group. The remaining fifth is everything the formula cannot see.',
        'A second equation was published in the same paper for children aged 15 and under, because BMI rises with height during growth rather than tracking fat the way it does in adults. That child formula is markedly weaker, with R-squared 0.38, and this calculator does not apply it. The age floor on the inputs above exists so that nobody mistakes the adult constants for a paediatric estimate.',
      ],
    },
    {
      h2: 'How this compares with the tape-measure method',
      paragraphs: [
        'The other body composition calculator on this site uses the US Navy circumference equations, which need a tape measure at the neck, waist and, for women, hips. The two methods answer the same question from completely different information, and that difference is the useful part.',
        'Circumference equations read fat distribution: a wider waist at the same weight produces a higher estimate. The BMI formula reads nothing about distribution and instead leans on sex and age. So agreement between the two is weak evidence of accuracy, while disagreement tells you something real - typically that your build is unusually muscular, unusually thin, or carrying weight somewhere the tape is not measuring.',
        'Their errors point in opposite directions too. Validation of the military circumference equations against DEXA found they underestimated body fat by around six percentage points in new recruits. The BMI formula, by contrast, was reported to slightly overestimate in obese subjects. If both methods land in the same place, at least one is probably wrong.',
        'For following change in one person over months, the practical choice is the method with the least measurement noise rather than the one with the smallest average bias, because it is the trend you are reading. Weigh at the same time of day, and if you use the tape, measure fasted and in the same body position each time. The formula will not compensate for inconsistent inputs.',
      ],
    },
    {
      h2: 'Getting a number you can actually trust',
      paragraphs: [
        'If you want a figure you can act on rather than an estimate, the reference methods are DEXA, air-displacement plethysmography, or a four-site skinfold calliper test performed by the same technician each time. Each has its own error, and none of them is free, which is precisely why an equation built on 1,229 people produces a four-point spread.',
        'For most purposes the sensible approach is to use this page as a starting point, then track one measurement consistently and treat changes larger than the stated error as the only ones worth responding to. A two-point shift is noise. A seven-point drift over a year is a real signal, whichever method produced it.',
      ],
    },
  ],
  faq: [
    { q: 'What is the Deurenberg formula?', a: 'Body fat percentage = 1.20 x BMI + 0.23 x age - 10.8 x sex - 5.4, with sex coded 1 for male and 0 for female. It was published in 1991 from 1,229 subjects measured by densitometry, with R-squared 0.79 and a standard error of 4.1 percentage points.' },
    { q: 'How accurate is body fat from BMI?', a: 'The published standard error is 4.1 percentage points, so a large share of people will be several points away from their measured value, and the formula is worse for very muscular or very obese builds.' },
    { q: 'Why is my body fat estimate higher than the gym machine says?', a: 'Bioelectrical impedance scales vary widely between devices and are strongly affected by hydration. Neither method measures fat directly, so a difference of several points between them is unremarkable.' },
    { q: 'Does the formula work for children?', a: 'No. The same paper published a separate, weaker equation for those aged 15 and under, and this calculator refuses input below 16 years for that reason.' },
  ],
  related: ['us-navy-body-fat-calculator', 'heart-rate-zone-calculator'],
}

export function compute(i, k) {
  const c = k.coefficients
  const weight = Number(i.weight) || 0
  const heightM = (Number(i.height) || 0) / 100
  const age = Number(i.age) || 0
  if (!weight || !heightM || !age) return { error: 'Enter your age, height and weight.' }
  const bmi = weight / (heightM * heightM)
  const sexCode = i.sex === 'male' ? 1 : i.sex === 'female' ? 0 : null
  if (sexCode === null) return { error: 'Select a sex; the formula treats the two differently.' }
  const bf = c.bmi * bmi + c.age * age - c.sex * sexCode - c.intercept
  const round = v => Math.round(v * 10) / 10
  if (bf < 3 || bf > 75) return { error: 'That combination gives an implausible estimate, so the calculator will not report it. Check the height and weight you entered.' }
  const see = k.seePercentagePoints
  const fatMass = weight * bf / 100
  return {
    bmi: round(bmi),
    bodyFat: round(bf),
    bodyFatRange: `${round(bf - see)}-${round(bf + see)} %`,
    fatMassKg: round(fatMass),
    leanMassKg: round(weight - fatMass),
    see: `${see} points`,
    rSquared: k.rSquared,
    outOfRange: bmi < k.validatedBmiRange[0] || bmi > k.validatedBmiRange[1],
  }
}
