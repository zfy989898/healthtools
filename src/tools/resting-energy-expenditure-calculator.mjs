export const tool = {
  slug: 'resting-energy-expenditure-calculator',
  name: 'Resting Energy Expenditure Calculator',
  h1: 'Resting Energy Expenditure Calculator: The Mifflin-St Jeor Equation, Term by Term',
  seo: {
    title: 'Resting Energy Expenditure (REE) Calculator | HealthTools',
    desc: 'Compute resting energy expenditure from the 1990 Mifflin-St Jeor equation, see what your weight, height, age and sex term contribute in kilocalories, and read what the source study measured.',
  },
  intro: 'Resting energy expenditure (REE) is the kilocalories a body burns at rest, and the equation behind most "calorie calculator" pages on the internet produces it from four numbers: weight, height, age and sex. This page runs that equation, shows you each of its four terms separately, and states what the 1990 study that produced it did and did not measure - which is why there is no activity-level selector and no daily calorie target here.',
  category: 'energy',
  provenance: {
    source: 'Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO. "A new predictive equation for resting energy expenditure in healthy individuals", Am J Clin Nutr 1990 Feb;51(2):241-7, doi 10.1093/ajcn/51.2.241, PMID 2305711 - the abstract states the equation was derived from data from 498 healthy subjects, including females (n = 247) and males (n = 251), aged 19-78 y (45 +/- 14 y, mean +/- SD); that normal-weight (n = 264) and obese (n = 234) individuals were studied and REE was measured by indirect calorimetry; that multiple-regression analyses of weight, height and age for both men and women gave R2 = 0.71 and REE = 9.99 x weight + 6.25 x height - 4.92 x age + 166 x sex (males, 1; females, 0) - 161; that simplification of this formula and separation by sex did not affect its predictive value, giving REE (males) = 10 x weight (kg) + 6.25 x height (cm) - 5 x age (y) + 5 and REE (females) = 10 x weight (kg) + 6.25 x height (cm) - 5 x age (y) - 161; that the inclusion of relative body weight and body-weight distribution did not significantly improve the predictive value of these equations; that the Harris-Benedict Equations derived in 1919 overestimated measured REE by 5% (p less than 0.01); that fat-free mass was the best single predictor of REE (R2 = 0.64): REE = 19.7 x FFM + 413; and that weight also was closely correlated with REE (R2 = 0.56): REE = 15.1 x weight + 371. Frankenfield DC, Muth ER, Rowe WA. "The Harris-Benedict studies of human basal metabolism: history and limitations", J Am Diet Assoc 1998 Apr;98(4):439-45, doi 10.1016/S0002-8223(98)00100-X, PMID 9550168 - the abstract states that prediction equations for basal energy expenditure were developed from studies conducted at the Nutrition Laboratory of the Carnegie Institution of Washington in Boston under the direction of Francis G. Benedict; that the expressed purpose of those equations was to establish normal standards to serve as a benchmark for comparison with BEE of persons with various disease states such as diabetes, thyroid, and other febrile diseases; that the Harris-Benedict equations remain the most common method for calculating BEE for clinical and research purposes; that a review of the data reveals the methods and conclusions of Harris and Benedict "appear valid and reasonable, albeit not error free"; that all of the variables used in the equations have sound physiologic basis for use in predicting BEE; that supplemental data from the Nutrition Laboratory indicates the original equations can be applied over a wide range of age and body types; and that the commonly held assumption that the Harris-Benedict equations overestimate BEE in obese persons may not be true for persons who are moderately obese.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/',
    retrieved: '2026-09-24',
    verified: true,
    checks: [
      { pmid: '2305711', first_author: 'Mifflin', year: '1990', journal: 'Am J Clin Nutr', doi: '10.1093/ajcn/51.2.241' },
      { pmid: '9550168', first_author: 'Frankenfield', year: '1998', journal: 'J Am Diet Assoc', doi: '10.1016/S0002-8223(98)00100-X' },
    ],
  },
  constants: {
    unitOptions: [
      { key: 'metric', label: 'Kilograms and centimetres' },
      { key: 'imperial', label: 'Pounds and inches' },
    ],
    sexOptions: [
      { key: 'male', label: 'Male' },
      { key: 'female', label: 'Female' },
    ],
    gPerKg: 2.2046226,
    cmPerInch: 2.54,
    coefficients: { weight: 10, height: 6.25, age: 5, sexMale: 5, sexFemale: -161 },
    regressionCoefficients: { weight: 9.99, height: 6.25, age: 4.92, sex: 166, intercept: -161 },
    studyAgeRange: [19, 78],
  },
  formula: {
    expression: 'REE (men) = 10 x weight(kg) + 6.25 x height(cm) - 5 x age(y) + 5. REE (women) = 10 x weight(kg) + 6.25 x height(cm) - 5 x age(y) - 161. Both lines are printed in the abstract of Mifflin et al., Am J Clin Nutr 1990;51(2):241-7 (PMID 2305711).',
    description: 'Take a 34-year-old man weighing 82 kg at 178 cm. His weight term is 10 x 82 = 820, his height term is 6.25 x 178 = 1112.5, his age term subtracts 5 x 34 = 170, and the male constant adds 5: 820 + 1112.5 - 170 + 5 = 1767.5, which this page prints as 1768 kcal/day. The same arithmetic for a woman subtracts 161 instead of adding 5, which is a 166 kcal/day gap between the two constants, and 166 is the same number as the sex coefficient in the pre-simplification regression. The equation is linear in all three measurements: each extra kilogram adds 10 kcal, each extra centimetre adds 6.25, each extra year of age takes 5 away. Nothing in the published equation multiplies by an activity level, so neither does this calculator.',
    citation: 'Both the simplified sex-split form used here and the 9.99 / 6.25 / 4.92 / 166 regression form printed alongside it come from Mifflin MD et al., Am J Clin Nutr 1990 Feb;51(2):241-7 (PMID 2305711, doi 10.1093/ajcn/51.2.241). The account of the Harris-Benedict equations and their stated purpose and limits comes from Frankenfield DA et al., J Am Diet Assoc 1998 Apr;98(4):439-45 (PMID 9550168, doi 10.1016/S0002-8223(98)00100-X).',
  },
  inputs: [
    { id: 'unit', label: 'Units', type: 'select', optionsKey: 'unitOptions' },
    { id: 'sex', label: 'Sex assigned in the equation', type: 'select', optionsKey: 'sexOptions' },
    { id: 'weight', label: 'Weight', unit: 'kg or lb', type: 'number', min: 30, max: 250 },
    { id: 'height', label: 'Height', unit: 'cm or in', type: 'number', min: 120, max: 230 },
    { id: 'age', label: 'Age', unit: 'years', type: 'number', min: 18, max: 100 },
  ],
  workedExamples: [
    { label: 'Man, 82 kg, 178 cm, 34 y', inputs: { unit: 'metric', sex: 'male', weight: 82, height: 178, age: 34 } },
    { label: 'Woman, 64 kg, 165 cm, 41 y', inputs: { unit: 'metric', sex: 'female', weight: 64, height: 165, age: 41 } },
    { label: 'Man, 231 lb, 74.8 in, 55 y', inputs: { unit: 'imperial', sex: 'male', weight: 231, height: 74.8, age: 55 } },
    { label: 'Woman, 172 lb, 62.2 in, 66 y', inputs: { unit: 'imperial', sex: 'female', weight: 172, height: 62.2, age: 66 } },
  ],
  limitation: 'The equation predicts a group average, not your metabolism. The source abstract reports R2 = 0.71 for weight, height and age taken together, and it does not report a per-person error band, so this page cannot give you one either; the honest reading is that a prediction and a measured value differ for a real person by an amount the abstract does not quantify. The 498 subjects were healthy adults aged 19 to 78 y, so the equation carries no evidence about children, adults over 78, pregnancy, lactation, or illness, and the second cited paper is explicit that the older Harris-Benedict standards were built to be compared against diseased people rather than to describe them. Fat-free mass was the best single predictor in the same dataset (R2 = 0.64), and fat-free mass is not measurable with a bathroom scale, so a calculator that asks for four numbers cannot reproduce the strongest predictor the study found. This is an arithmetic tool for a resting measurement; it is not a diet plan, not a weight-loss prescription and not medical advice. If a number here matters to a decision, the decision belongs with a clinician who can measure things this form cannot.',
  sections: [
    {
      h2: 'What each of the four terms costs you',
      paragraphs: [
        'The output table is not decoration. The published equation is a sum of four parts, and most calorie calculators print only the total, which hides how much of your number is fixed and how much moves. Weight and height are the two positive terms: 10 kcal per kilogram and 6.25 kcal per centimetre. Age is the only term that works against you at 5 kcal per year. The sex constant is a single step: +5 for men, -161 for women.',
        'Read the breakdown row by row and the structure becomes obvious. For a tall, heavy, young person the positive terms dominate and the resting number is high mostly because there is more body to run. For a short, older person the age term and the small height term do most of the downward work. A 20-year difference in age is 100 kcal/day inside this equation, while a 20 cm difference in height is 125 kcal/day - the two are not as far apart as the way people talk about age and metabolism would suggest.',
        'The 166 kcal gap between the two sex constants is the largest single switch on this form. It is worth being precise about what that is: the equation was fitted with a sex indicator coded 1 for males and 0 for females, and the coefficient on that indicator in the regression form is 166. When the authors simplified and split the equation by sex, that 166 became the difference between +5 and -161. It describes an average difference between the men and women in that sample once weight, height and age are already accounted for. It is not a claim about why, and the abstract offers no mechanism.',
      ],
    },
    {
      h2: 'Why the regression form is printed next to the simplified one',
      paragraphs: [
        'The 1990 abstract contains two versions of the same equation. The multiple-regression version is REE = 9.99 x weight + 6.25 x height - 4.92 x age + 166 x sex - 161, with sex coded 1 for males and 0 for females. The simplified version rounds 9.99 to 10 and 4.92 to 5, and separates the sexes. The authors state that the simplification and the separation by sex did not affect its predictive value.',
        'This calculator prints both, and the difference line is there to make the authors claim checkable rather than ask you to trust it. For a 34-year-old man at 82 kg and 178 cm the simplified form gives 1767.5 and the regression form gives 1769.4 - under two kilocalories, about one tenth of a percent. That is what "did not affect its predictive value" looks like arithmetically: the rounding is invisible next to the spread between people the equation cannot explain.',
        'The comparison also shows where the equation is sensitive. Because the weight coefficient moves from 9.99 to 10 and the age coefficient from 4.92 to 5, the rounding error grows with body mass and with age, and the two mostly cancel in the same direction rather than compounding. Anyone comparing this page to a calculator that uses the unsimplified coefficients should expect a difference of a couple of kilocalories, not a disagreement.',
      ],
    },
    {
      h2: 'The 1919 equations it replaced, and what that claim is worth',
      paragraphs: [
        'The Harris-Benedict equations come from basal-metabolism studies conducted at the Nutrition Laboratory of the Carnegie Institution of Washington in Boston under Francis G. Benedict, and the 1998 review cited on this page states their expressed purpose plainly: to establish normal standards that could serve as a benchmark when comparing the energy expenditure of people with disease states such as diabetes, thyroid disease and other febrile illnesses. The same review reports that those equations remain the most common method for calculating basal energy expenditure for clinical and research purposes.',
        'That review is also the more careful source about their standing. Its conclusion is that the methods and conclusions of Harris and Benedict "appear valid and reasonable, albeit not error free", that all of the variables used have a sound physiologic basis, and - against a very widely repeated claim - that the assumption that the equations overestimate in obesity may not hold for people who are moderately obese. The 1990 study, for its part, reports a specific number: the Harris-Benedict equations derived in 1919 overestimated measured REE by 5%, at p less than 0.01, in the 498 subjects it measured.',
        'So the case for the newer equation in the primary source is a 5% average overestimate by the older one in one dataset. That is a real finding and it is also a narrow one: an average difference of 5% says nothing about which equation is better for a particular person, and it is not evidence that the older equations are invalid. Pages that describe the replacement of the 1919 equations as a settled correction are reporting more than either abstract supports.',
      ],
    },
    {
      h2: 'Why there is no activity level on this form',
      paragraphs: [
        'Almost every competing page asks whether you are sedentary, lightly active or very active, and multiplies the resting number by a factor. Neither of the two sources retrieved for this page supplies activity factors. The quantity the study measured is resting energy expenditure by indirect calorimetry - a measurement taken at rest, under conditions the equation is fitted to - and turning that into a daily total needs a second model that is not in the record this page was built from.',
        'The consequence is that this page gives you one number and refuses to call it your calorie requirement. If you came here for a target to eat to, the honest answer is that the arithmetic to get from resting expenditure to a daily requirement is a separate, weaker inference than the equation itself, and the multipliers most sites use are not in either source printed above. A resting number is still useful on its own: it is the floor under your intake, it is comparable across time as your weight and age change, and it is the figure a dietitian or physician refers to when they talk about metabolic rate.',
      ],
    },
    {
      h2: 'What the study behind the equation actually measured',
      paragraphs: [
        'The abstract is specific, and the specificity is the useful part. 498 healthy subjects, 247 female and 251 male, aged 19 to 78 years with a mean of 45 +/- 14. Both normal-weight (n = 264) and obese (n = 234) individuals were included. REE was measured by indirect calorimetry rather than estimated, and multiple regression related it to weight, height and age for both men and women with R2 = 0.71.',
        'Two of the reported results are unflattering to the equation and appear in the abstract anyway, which is why they are on this page. Adding relative body weight and body-weight distribution did not significantly improve predictive value. And fat-free mass was the best single predictor of REE at R2 = 0.64 (REE = 19.7 x FFM + 413), while weight alone reached R2 = 0.56 (REE = 15.1 x weight + 371). Read those three figures together: the best single measure the dataset contains gets you most of the way, and the four-input equation buys the remaining improvement.',
        'That last comparison is the most practical thing on this page. Weight alone explains 0.56 of the variance and the full equation explains 0.71, so the equation is better - and the whole reason a predictive equation is preferable to a rule of thumb is that it separates a 45 kg person from a 120 kg person by more than a scale reading. It does not follow that the difference between a predicted number and your own metabolism is small, and the abstract gives no per-person error term with which to size it.',
      ],
    },
    {
      h2: 'Using a resting number without over-reading it',
      paragraphs: [
        'Treat the output as one estimate of one quantity, and use it for the comparisons it can actually support. Re-running it after a 6 kg weight change moves the weight term by 60 kcal; re-running it five years later moves the age term by 25. Those are legitimate uses of the equation because they hold the model fixed and vary the inputs, which is exactly what a linear equation is for.',
        'What it cannot do is tell you whether your metabolism is fast or slow. To know that you would need the measured value the equation is estimating against, and indirect calorimetry of the kind performed on the 498 subjects is a laboratory measurement, not something the four boxes on this form can substitute for. If the difference between prediction and measurement matters to you, that is a question for a clinic that runs metabolic carts.',
        'The same caution applies to the age range. The subjects were 19 to 78 years old, and the page flags your inputs when they fall outside that window. That flag is not a rounding note: outside the studied range the equation is being used in a population nobody measured it against, and the printed number is an extrapolation.',
      ],
    },
  ],
  faq: [
    { q: 'How is resting energy expenditure calculated here?', a: 'With the sex-split simplified form from Mifflin et al. 1990: 10 x weight in kilograms, plus 6.25 x height in centimetres, minus 5 x age in years, plus 5 for men or minus 161 for women. The result is kilocalories per day at rest. The page also computes the unsimplified regression form, 9.99 x weight + 6.25 x height - 4.92 x age + 166 x sex - 161, and shows the gap between the two, which is typically under two kilocalories.' },
    { q: 'Is this the same as a calorie needs calculator?', a: 'No, and the difference is deliberate. A resting expenditure is one component of daily energy expenditure. Converting it into a daily requirement needs an activity factor, and neither source retrieved for this page publishes one, so this page does not invent one. The number here is the resting figure, not a target to eat to.' },
    { q: 'Why is the result different from a Harris-Benedict calculator?', a: 'The 1990 study measured REE by indirect calorimetry in 498 healthy adults and reports that the 1919 Harris-Benedict equations overestimated that measured value by 5% (p < 0.01). The 1998 review of the Harris-Benedict data cited here does not treat the older equations as invalid; it calls them valid and reasonable though not error free, notes they remain the most common clinical method, and reports that the assumption that they overestimate in obesity may not be true for moderately obese people.' },
    { q: 'How accurate is the number for me personally?', a: 'The source reports R2 = 0.71 for the equation across its dataset and does not report a per-person error band, so no interval can honestly be printed on this page. For context, the same dataset gave fat-free mass alone R2 = 0.64 and body weight alone R2 = 0.56. Predictions from a group fit can be several hundred kilocalories away from an individual measurement, and only indirect calorimetry can tell you where you actually sit.' },
    { q: 'Can I use it for a child, or during pregnancy?', a: 'No. The equation was derived from healthy adults aged 19 to 78 years, and the page marks the result as an extrapolation outside that age range. Nothing in either cited source addresses children, pregnancy or lactation, and the 1998 review describes the older standards as benchmarks for comparing people with disease states rather than evidence about them.' },
    { q: 'Does muscle mass change the answer?', a: 'It changes the real value more than this equation can see. Fat-free mass was the best single predictor in the source dataset (R2 = 0.64, REE = 19.7 x FFM + 413), but that quantity is not one of the four inputs, and adding relative body weight and body-weight distribution did not significantly improve the equation. Two people of the same weight, height, age and sex get the same number here even if their body composition differs; that is a property of the equation, not a fact about their metabolism.' },
  ],
  related: ['us-navy-body-fat-calculator', 'body-fat-from-bmi-calculator'],
}

export function compute(i, k) {
  const rawWeight = Number(i.weight) || 0
  const rawHeight = Number(i.height) || 0
  const age = Number(i.age) || 0
  if (!rawWeight || !rawHeight || !age) return { error: 'Enter a weight, a height and an age.' }
  if (i.sex !== 'male' && i.sex !== 'female') return { error: 'Choose which sex the equation should use.' }
  const kg = i.unit === 'imperial' ? rawWeight / k.gPerKg : rawWeight
  const cm = i.unit === 'imperial' ? rawHeight * k.cmPerInch : rawHeight
  if (kg < 25 || kg > 250) return { error: 'That weight is outside the range this page will calculate. Check the unit selector matches the number you typed.' }
  if (cm < 120 || cm > 230) return { error: 'That height is outside the range this page will calculate. Check the unit selector matches the number you typed.' }
  if (age < 10 || age > 100) return { error: 'Enter an age in whole years between 10 and 100.' }
  const c = k.coefficients
  const sexConstant = i.sex === 'male' ? c.sexMale : c.sexFemale
  const weightTerm = c.weight * kg
  const heightTerm = c.height * cm
  const ageTerm = -c.age * age
  const ree = weightTerm + heightTerm + ageTerm + sexConstant
  const r = k.regressionCoefficients
  const sexFlag = i.sex === 'male' ? 1 : 0
  const reeRegression = r.weight * kg + r.height * cm - r.age * age + r.sex * sexFlag + r.intercept
  const kcal = v => `${Math.round(v)} kcal/day`
  const signed = v => `${v < 0 ? '-' : '+'}${Math.abs(Math.round(v))}`
  const outOfRange = age < k.studyAgeRange[0] || age > k.studyAgeRange[1]
  return {
    ree: kcal(ree),
    equationUsed: i.sex === 'male'
      ? '10 x weight(kg) + 6.25 x height(cm) - 5 x age(y) + 5'
      : '10 x weight(kg) + 6.25 x height(cm) - 5 x age(y) - 161',
    terms: [
      {
        weightTerm: `${signed(weightTerm)} from ${Math.round(kg * 10) / 10} kg`,
        heightTerm: `${signed(heightTerm)} from ${Math.round(cm * 10) / 10} cm`,
        ageTerm: `${signed(ageTerm)} from ${age} years`,
        sexTerm: `${signed(sexConstant)} for ${i.sex === 'male' ? 'men' : 'women'}`,
        total: kcal(ree),
      },
    ],
    reeFromRegression: kcal(reeRegression),
    simplificationGap: `${signed(ree - reeRegression)} kcal between the two published forms`,
    studyRange: outOfRange
      ? `Age ${age} is outside the 19-78 y range of the 498 subjects this equation was derived from, so the result is an extrapolation.`
      : 'Inside the 19-78 y age range of the 498 subjects this equation was derived from.',
  }
}
