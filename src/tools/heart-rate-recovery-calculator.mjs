export const tool = {
  slug: 'heart-rate-recovery-calculator',
  name: 'Heart Rate Recovery Calculator',
  h1: 'Heart Rate Recovery Calculator: The One-Minute Fall From Peak, and What the Studies Cut It At',
  seo: {
    title: 'Heart Rate Recovery Calculator (1-Minute Drop) | HealthTools',
    desc: 'Subtract your heart rate one and two minutes after stopping exercise from your peak rate, and read the 1999 and 2004 cohort studies that set the cut-offs this calculator quotes.',
  },
  intro: 'Heart rate recovery is one subtraction: the heart rate you were at when you stopped, minus the heart rate sixty seconds later. It takes two numbers and no equipment beyond something that counts pulses, which is why it has been studied as a mortality marker more often than almost any other exercise-test byproduct. This page does that subtraction at one minute and at two, compares the one-minute figure against the cut-off published in the study that introduced it, and states what those cohorts were and were not - because the most-quoted number here comes from people undergoing a clinical exercise test, not from a training block.',
  category: 'exercise',
  provenance: {
    source: 'Cole CR, Blackstone EH, Pashkow FJ, Snader CE, Lauer MS. "Heart-rate recovery immediately after exercise as a predictor of mortality", N Engl J Med 1999 Oct 28;341(18):1351-7, doi 10.1056/NEJM199910283411804, PMID 10536127 - the abstract states that the increase in heart rate accompanying exercise is due in part to a reduction in vagal tone and that recovery of the heart rate immediately after exercise is a function of vagal reactivation; that for six years the authors followed 2428 consecutive adults (mean [+/-SD] age, 57 +/- 12 years; 63 percent men) without a history of heart failure or coronary revascularization and without pacemakers, who were undergoing symptom-limited exercise testing and single-photon-emission computed tomography with thallium scintigraphy for diagnostic purposes; that the value for the recovery of heart rate was defined as the decrease in the heart rate from peak exercise to one minute after the cessation of exercise; that an abnormal value for the recovery of heart rate was defined as a reduction of 12 beats per minute or less from the heart rate at peak exercise; that there were 213 deaths from all causes and that 639 patients (26 percent) had abnormal values for heart-rate recovery; that in univariate analyses a low value for the recovery of heart rate was strongly predictive of death (relative risk, 4.0; 95 percent confidence interval, 3.0 to 5.2; P<0.001); that after adjustments were made for age, sex, the use or nonuse of medications, the presence or absence of myocardial perfusion defects on thallium scintigraphy, standard cardiac risk factors, the resting heart rate, the change in heart rate during exercise, and workload achieved, a low value for heart-rate recovery remained predictive of death (adjusted relative risk, 2.0; 95 percent confidence interval, 1.5 to 2.7; P<0.001); and, in the conclusions, that a delayed decrease in the heart rate during the first minute after graded exercise, which may be a reflection of decreased vagal activity, is a powerful predictor of overall mortality, independent of workload, the presence or absence of myocardial perfusion defects, and changes in heart rate during exercise. Lipinski MJ, Vetrovec GW, Froelicher VF. "Importance of the first two minutes of heart rate recovery after exercise treadmill testing in predicting mortality and the presence of coronary artery disease in men", Am J Cardiol 2004 Feb 15;93(4):445-9, doi 10.1016/j.amjcard.2003.10.039, PMID 14969619 - the abstract states that the authors retrospectively analyzed exercise treadmill and coronary angiographic data of 2193 men to compare heart rate recovery with angiographic and mortality data during a follow-up study of 7 +/- 2.7 years; that only the first 2 minutes of heart rate recovery predicted mortality (p <0.001); and that the heart rate decrease during the second minute of recovery predicted the presence of coronary artery disease (p <0.05). Lachman S, Terbraak MS, Limpens J, Jorstad H, Lucas C, Scholte Op Reimer W, Boekholdt SM, Ter Riet G, Peters RJG. "The prognostic value of heart rate recovery in patients with coronary artery disease: A systematic review and meta-analysis", Am Heart J 2018 May;199:163-169, doi 10.1016/j.ahj.2018.02.008, PMID 29754656 - the abstract states that routine outpatient care of patients with coronary artery disease lacks a simple measure of physical fitness and risk of mortality and that heart rate recovery is noninvasive and easily obtainable in outpatient settings; that a systematic search in OVID MEDLINE and OVID EMBASE identified studies reporting on heart rate recovery and risk of incident cardiovascular events or mortality in CAD patients, with hazard ratios for delayed versus nondelayed heart rate recovery pooled using random-effects meta-analysis; that four studies were included, comprising 2428 CAD patients, with study quality rated moderate (n = 2) to high (n = 2); that delayed heart rate recovery was defined by <=12 to <=21 beat/min in the recovery period; that during follow-up (range 2.0-9.8 years) 151 patients died (6.2% [range 2.5%-19.5%]); that only data on mortality could be pooled, heterogeneity was limited (I2 = 32%; P = .23), and the pooled unadjusted hazard ratio for mortality, based on 3 studies, was 5.8 (95% CI 3.2-10.4); and, in the conclusions, that in CAD patients delayed heart rate recovery is significantly associated with all-cause mortality, that because exercise testing is performed routinely in CAD patients heart rate recovery can be considered in monitoring exercise, and that further research must investigate the addition of heart rate recovery to current risk scores.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/10536127/',
    retrieved: '2026-09-25',
    verified: true,
    checks: [
      { pmid: '10536127', first_author: 'Cole', year: '1999', journal: 'N Engl J Med', doi: '10.1056/NEJM199910283411804' },
      { pmid: '14969619', first_author: 'Lipinski', year: '2004', journal: 'Am J Cardiol', doi: '10.1016/j.amjcard.2003.10.039' },
      { pmid: '29754656', first_author: 'Lachman', year: '2018', journal: 'Am Heart J', doi: '10.1016/j.ahj.2018.02.008' },
    ],
  },
  constants: {
    cutOff: 12,
    peakRange: [60, 230],
    recoveryRange: [40, 225],
    restingRange: [30, 140],
    coleCohort: { n: 2428, deaths: 213, abnormal: 639, abnormalPct: 26, meanAge: '57 +/- 12', menPct: 63, followUpYears: 6 },
    lipinskiCohort: { n: 2193, followUp: '7 +/- 2.7' },
    lachman: { studies: 4, n: 2428, cutoffRange: '<=12 to <=21', deaths: 151, deathPct: 6.2, hr: 5.8, hrCi: '3.2-10.4', i2: 32 },
  },
  formula: {
    expression: 'One-minute recovery = peak exercise heart rate - heart rate 60 seconds after exercise stops. Cole et al. define it as "the decrease in the heart rate from peak exercise to one minute after the cessation of exercise" and call "a reduction of 12 beats per minute or less" abnormal (N Engl J Med 1999;341(18):1351-7, PMID 10536127). The second-minute figure printed here is heart rate at one minute minus heart rate at two minutes, the interval Lipinski et al. report as predicting the presence of coronary artery disease (Am J Cardiol 2004;93(4):445-9, PMID 14969619).',
    description: 'Take a peak heart rate of 168 bpm, a reading of 152 bpm sixty seconds after stopping, and 141 bpm at two minutes. The one-minute recovery is 168 - 152 = 16 bpm, which is 4 bpm above the 12 bpm cut-off, so this page prints it as at or above the published boundary rather than below it. The second-minute fall is 152 - 141 = 11 bpm and the two-minute total is 168 - 141 = 27 bpm. Now change only the one-minute reading to 156: the recovery is 168 - 156 = 12 bpm, which sits exactly on the cut-off, and because the published definition of abnormal is "12 beats per minute or less", 12 counts as abnormal, not as clear of it. Two properties of the arithmetic are worth holding onto. The subtraction starts from peak, never from resting rate, so a person who finishes a hard effort at 190 and one who finishes at 150 are measured against their own ceilings. And the second-minute drop is a different quantity from the two-minute drop: 11 is the change across the interval between the first and second readings, while 27 is the change from peak to the second reading.',
    citation: 'The one-minute definition and the 12 bpm cut-off are quoted from Cole CR, Blackstone EH, Pashkow FJ, Snader CE, Lauer MS, N Engl J Med 1999 Oct 28;341(18):1351-7 (PMID 10536127, doi 10.1056/NEJM199910283411804). The second-minute comparison comes from Lipinski MJ, Vetrovec GW, Froelicher VF, Am J Cardiol 2004 Feb 15;93(4):445-9 (PMID 14969619, doi 10.1016/j.amjcard.2003.10.039). The pooled figures for patients with coronary artery disease come from Lachman S et al., Am Heart J 2018;199:163-169 (PMID 29754656, doi 10.1016/j.ahj.2018.02.008). All three abstracts were retrieved from PubMed on 2026-09-25 and the figures on this page are taken from them line by line.',
  },
  inputs: [
    { id: 'peak', label: 'Peak heart rate at the end of the effort', unit: 'bpm', type: 'number', min: 60, max: 230 },
    { id: 'hr1', label: 'Heart rate 60 seconds after stopping', unit: 'bpm', type: 'number', min: 40, max: 225 },
    { id: 'hr2', label: 'Heart rate 2 minutes after stopping (optional)', unit: 'bpm', type: 'number', min: 40, max: 225 },
    { id: 'resting', label: 'Resting heart rate before the effort', unit: 'bpm', type: 'number', min: 30, max: 140 },
  ],
  workedExamples: [
    { label: 'Peak 168, 152 at one minute, 141 at two, resting 62', inputs: { peak: 168, hr1: 152, hr2: 141, resting: 62 } },
    { label: 'Exactly on the cut-off: peak 168, 156 at one minute, resting 70', inputs: { peak: 168, hr1: 156, resting: 70 } },
    { label: 'Delayed: peak 174, 168 at one minute, 160 at two, resting 78', inputs: { peak: 174, hr1: 168, hr2: 160, resting: 78 } },
    { label: 'Fast: peak 181, 139 at one minute, 122 at two, resting 55', inputs: { peak: 181, hr1: 139, hr2: 122, resting: 55 } },
  ],
  limitation: 'This is a subtraction and a comparison against a published cut-off; it is not a diagnosis and not a risk score. The 12 bpm boundary comes from 2,428 adults who were undergoing symptom-limited exercise testing with thallium imaging for diagnostic purposes, with a mean age of 57 +/- 12 years and 63 percent men, and who were selected for having no history of heart failure or coronary revascularization and no pacemaker - it is not a reference range established for healthy people training on their own, and the abstract reports no age- or sex-specific cut-offs, so this page prints none either. Your watch is not the measurement instrument: the cohorts above timed recovery from the moment exercise ceased in a laboratory, and a device that starts its clock late, or that keeps counting while you keep walking, is computing something else. The relative risks printed below are group statistics from a six-year follow-up; a 26 percent prevalence of abnormal recovery in that cohort tells you how common the finding was there, not what the probability is for you. Beta-blockers, calcium-channel blockers, dehydration, heat, illness, sleep deprivation and training load on the day all move the numbers, and none of them is a variable this form can see. If you have chest pain, palpitations, fainting or breathlessness out of proportion to the effort, that is a reason to be assessed, not a reason to re-run this calculator.',
  sections: [
    {
      h2: 'What the one-minute number is, exactly',
      paragraphs: [
        'The definition in the 1999 paper is narrower than the way the phrase gets used online. Heart rate recovery there is the decrease from peak exercise to one minute after the cessation of exercise: a single subtraction, anchored to the highest rate the person reached, in a laboratory test taken to symptom limitation. Nothing in that definition asks for age, fitness, workload or resting rate, which is the source of both its appeal and its abuse.',
        'The anchor matters most. Two people can finish an interval at 150 and 190 bpm and both be measured honestly, because each is compared with their own peak rather than with a population number. That is also why the peak value is the input people most often get wrong: a wrist optical reading taken thirty seconds after stopping has already recovered, and using it as the peak shrinks the difference and makes the result look worse than it was.',
        'The physiology claim attached to it is also specific and modest. The 1999 abstract says the rise in heart rate during exercise is due in part to a reduction in vagal tone, and that recovery immediately after exercise is a function of vagal reactivation, and it offers that as the reason a delayed fall might carry prognostic weight. It does not measure vagal tone in the paper, and the abstract does not report any direct autonomic measurement, so on this page the mechanism stays what the authors called it: a hypothesis about why the number predicts.',
      ],
    },
    {
      h2: 'Why 12 bpm, and what that number survives adjustment for',
      paragraphs: [
        'The cut-off is not a rounded convention. Cole and colleagues defined an abnormal recovery as a reduction of 12 beats per minute or less from peak, and then followed 2,428 consecutive adults for six years. There were 213 deaths from all causes, and 639 patients - 26 percent of the cohort - had abnormal values.',
        'In univariate analysis a low recovery value was strongly predictive of death, at a relative risk of 4.0 with a 95 percent confidence interval of 3.0 to 5.2 (P<0.001). After the authors adjusted for age, sex, use or nonuse of medications, the presence or absence of myocardial perfusion defects on thallium scintigraphy, standard cardiac risk factors, resting heart rate, the change in heart rate during exercise, and workload achieved, the adjusted relative risk was 2.0 (95 percent confidence interval, 1.5 to 2.7; P<0.001).',
        'Read those two numbers together, because the drop from 4.0 to 2.0 is the substantive finding. Roughly half the raw association is carried by things that are not heart rate recovery: age, medications, perfusion, workload. What survives is still independent and still significant, and the authors put it that way in their conclusion - a delayed decrease in the first minute predicts overall mortality independent of workload, of perfusion defects, and of changes in heart rate during exercise. It is not a magic number and it is not noise; it is a marker that keeps some signal once the obvious confounders are removed, which is a much smaller claim than most pages quoting it make.',
      ],
    },
    {
      h2: 'The second minute is a separate question',
      paragraphs: [
        'Lipinski, Vetrovec and Froelicher analysed exercise treadmill and coronary angiographic data from 2,193 men, followed for 7 +/- 2.7 years, and asked which recovery intervals carried information. Their abstract reports two findings and they are not the same finding: only the first 2 minutes of heart rate recovery predicted mortality (p <0.001), and the heart rate decrease during the second minute of recovery predicted the presence of coronary artery disease (p <0.05).',
        'The distinction the 2004 paper draws is between the interval that carries mortality information and the quantity that correlates with having detectable disease. Both live inside the first two minutes, and neither extends beyond them in this abstract - that is what "only the first 2 minutes" is excluding. Note also that its population is men only, and that its endpoint for the second-minute figure is the presence of coronary disease on angiography, not death.',
        'This calculator therefore prints three related but different numbers: the one-minute fall from peak, which is the quantity with the published 12 bpm cut-off; the second-minute fall, which is the change across the interval between the one- and two-minute readings; and the total fall from peak to two minutes. Pages that label any of the three "your heart rate recovery" without saying which subtraction they mean are asking you to compare a number against a cut-off derived from a different formula.',
      ],
    },
    {
      h2: 'What a meta-analysis in coronary patients adds, and what it does not',
      paragraphs: [
        'Lachman and colleagues searched OVID MEDLINE and OVID EMBASE for studies reporting heart rate recovery and risk of incident cardiovascular events or mortality in patients with coronary artery disease, and pooled hazard ratios for delayed versus nondelayed recovery with random-effects meta-analysis. Four studies qualified, comprising 2,428 CAD patients, rated moderate (n = 2) to high (n = 2) in quality. During follow-up ranging from 2.0 to 9.8 years, 151 patients died (6.2 percent, range across studies 2.5 to 19.5 percent).',
        'Two details in that abstract deserve to be repeated rather than smoothed over. Delayed heart rate recovery was defined by <=12 to <=21 beat/min in the recovery period - the studies did not agree on a cut-off, and a review that pools across that spread is not endorsing one boundary. And only data on mortality could be pooled; the cardiovascular-event endpoints reported by the included studies could not be combined, so the summary says nothing about them either way.',
        'With those limits, heterogeneity was limited (I2 = 32 percent; P = .23) and the pooled unadjusted hazard ratio for mortality, based on 3 studies, was 5.8 (95 percent CI 3.2-10.4). The authors conclusion is measured: in CAD patients delayed recovery is significantly associated with all-cause mortality, and because exercise testing is routine in those patients heart rate recovery can be considered in monitoring exercise, while further research must investigate its addition to current risk scores. There is no evidence in that abstract for using it as a screening test in people without diagnosed disease.',
      ],
    },
    {
      h2: 'Two cohorts of 2,428, which are not the same 2,428',
      paragraphs: [
        'Both large figures on this page are 2,428 people and they are different sets. Cole and colleagues report a single centre following 2,428 consecutive adults for six years, chosen for having no history of heart failure or coronary revascularization and no pacemaker, mean age 57 +/- 12 years, 63 percent men, all undergoing symptom-limited exercise testing with thallium imaging for diagnostic purposes. The 2018 review reports 2,428 patients pooled across four studies of people with diagnosed coronary artery disease.',
        'That coincidence is worth pausing on because it is the easiest way to misuse these numbers. A prevalence of 26 percent abnormal recovery belongs to the first group. A pooled hazard ratio of 5.8 belongs to the second. Neither is a statement about a healthy person who did a set of intervals in a park and looked at a watch, and this page deliberately has no output line that pretends otherwise.',
        'The practical consequence for how you use the arithmetic: treat a single reading as one observation of your own curve. Repeated at similar effort, in similar conditions, with the peak captured at the moment you actually stopped, the number is comparable across weeks. Measured once, after a hot session, on a device whose peak timestamp you have not checked, it is not comparable to anything - including the 12 bpm line printed above it.',
      ],
    },
    {
      h2: 'How to take the two readings so the subtraction means something',
      paragraphs: [
        'The peak has to be the peak, not your best guess at it: record it the second you stop. Then take the next reading at exactly sixty seconds after cessation, and - if you want the second-minute figures - at exactly one hundred and twenty. The timing is part of the definition, since the quantity being compared to 12 bpm is a fall over a specified interval, and a reading taken at ninety seconds produces a larger fall and a better-looking result.',
        'Stay still during the recovery window or note that you did not. The published definition follows the cessation of exercise; continued slow walking keeps muscle pump and sympathetic drive in the picture and changes what the first minute measures. If you did keep moving, the number you compute here is still arithmetically correct and is not the quantity the cut-off describes.',
        'Finally, keep the context with the number. A recovery reading taken during an illness, in a heat wave, on a dehydration day, or in a heavy training block moves for reasons that have nothing to do with autonomic function, and none of the three sources on this page adjusted for those. The resting heart rate box exists because that is one of the variables Cole and colleagues adjusted for - it lets you see how far your peak sat above your own baseline - not because it enters the recovery subtraction. It does not: only the peak and the post-exercise readings do.',
      ],
    },
  ],
  faq: [
    { q: 'What is a normal heart rate recovery at one minute?', a: 'The cut-off published on this page is Cole et al. 1999: a fall of 12 beats per minute or less from peak exercise to one minute after cessation was classed as abnormal in 2,428 adults undergoing diagnostic exercise testing. Their abstract reports no "normal" value, no age bands and no graded scale, so this calculator only compares your subtraction against that single boundary and prints the difference.' },
    { q: 'Is a heart rate recovery under 12 bpm serious?', a: 'In that cohort it was associated with death from any cause over six years of follow-up: relative risk 4.0 unadjusted, and 2.0 after adjustment for age, sex, medications, thallium perfusion defects, standard cardiac risk factors, resting heart rate, the change in heart rate during exercise and workload achieved. An association measured in people referred for testing is not a diagnosis of you. Symptoms such as chest pain, fainting or disproportionate breathlessness are the reason to be assessed - not a number from a watch.' },
    { q: 'Why does this calculator subtract from peak rather than from resting heart rate?', a: 'Because that is the published definition it is quoting: the decrease in heart rate from peak exercise to one minute after exercise stops. The resting rate is an input here for a different reason - it is one of the variables the 1999 analysis adjusted for, and it shows how far your peak sat above your baseline - but it never enters the recovery subtraction.' },
    { q: 'What about the popular claim that recovery under 20 or 22 bpm at two minutes is bad?', a: 'This page prints no such boundary, because none of the three sources retrieved for it states one. The 2004 study in 2,193 men reports that only the first two minutes of recovery predicted mortality and that the decrease during the second minute predicted the presence of coronary artery disease, but its abstract gives no cut-off value. The 2018 meta-analysis records that included studies defined delayed recovery anywhere from 12 to 21 beats per minute. Those are ranges of definitions, not thresholds to sort yourself into.' },
    { q: 'Can I measure this with a fitness watch or chest strap?', a: 'The arithmetic works with any pulse reading, but the definition is timing-sensitive: the peak must be captured at the moment exercise ceases and the next value at exactly sixty seconds. Laboratory cohorts stopped on cue in front of monitored equipment. If your device timestamps peak late, or you keep walking, you are computing a related but different quantity - and any comparison to the 12 bpm line is then loose in a direction you cannot see.' },
    { q: 'Does heart rate recovery improve with training?', a: 'Nothing in the three abstracts cited here measures training-induced change, so this page makes no claim about it. What the record does support is narrower and still useful: recovery immediately after exercise is described as a function of vagal reactivation, and a delayed fall in the first minute was an independent predictor of all-cause mortality in two cohorts. Whether your own number moves with training is an observation you would make by repeated measurement under consistent conditions, not something these papers can answer for you.' },
  ],
  related: ['heart-rate-zone-calculator', 'vo2-max-heart-rate-ratio-calculator', 'acute-chronic-workload-ratio-calculator'],
}

export function compute(i, k) {
  const peak = Math.round(Number(i.peak))
  const hr1 = Math.round(Number(i.hr1))
  const hr2 = i.hr2 && Number(i.hr2) ? Math.round(Number(i.hr2)) : 0
  const resting = Math.round(Number(i.resting))
  if (!peak || !hr1 || !resting) return { error: 'Enter a peak heart rate, a one-minute heart rate and a resting heart rate. The two-minute box is optional.' }
  if (peak < k.peakRange[0] || peak > k.peakRange[1]) return { error: `Peak heart rate needs to be between ${k.peakRange[0]} and ${k.peakRange[1]} bpm. Check you entered beats per minute and not beats.` }
  if (hr1 > peak) return { error: 'The one-minute heart rate cannot be above the peak. The peak is the highest rate you reached, read at the moment you stopped.' }
  if (hr1 < k.recoveryRange[0] || hr1 > k.recoveryRange[1]) return { error: `The one-minute heart rate needs to be between ${k.recoveryRange[0]} and ${k.recoveryRange[1]} bpm.` }
  if (resting < k.restingRange[0] || resting > k.restingRange[1]) return { error: `Resting heart rate needs to be between ${k.restingRange[0]} and ${k.restingRange[1]} bpm.` }
  if (resting > peak) return { error: 'The resting heart rate you entered is above the peak, so one of the two boxes is the wrong reading.' }
  const hrr1 = peak - hr1
  const cut = k.cutOff
  const out = {
    hrr1: `${hrr1} bpm`,
    vsCutOff: hrr1 <= cut
      ? `${hrr1} is at or below the ${cut} bpm line, which the source study calls an abnormal value for the recovery of heart rate.`
      : `${hrr1} is ${hrr1 - cut} bpm above the ${cut} bpm line.`,
    cutOffNote: 'The boundary is 12 bpm or less counted as abnormal, so 12 is abnormal and 13 is not.',
    hrRise: `${peak - resting} bpm from your resting rate to peak`,
    cohortNote: `Compared against a cut-off derived from ${k.coleCohort.n} adults (mean age ${k.coleCohort.meanAge}, ${k.coleCohort.menPct}% men) followed ${k.coleCohort.followUpYears} years: ${k.coleCohort.abnormal} of them (${k.coleCohort.abnormalPct}%) recovered ${cut} bpm or less, and there were ${k.coleCohort.deaths} deaths.`,
  }
  if (hr2) {
    if (hr2 > hr1) return { error: 'The two-minute heart rate cannot be above the one-minute reading. Check those two boxes are not swapped.' }
    out.fallInSecondMinute = `${hr1 - hr2} bpm during the second minute`
    out.totalTwoMinutes = `${peak - hr2} bpm from peak to two minutes`
    out.secondMinuteNote = 'The 2004 cohort study of 2,193 men reports that the decrease during the second minute of recovery predicted the presence of coronary artery disease (p <0.05), and that only the first two minutes of recovery predicted mortality (p <0.001). Its abstract publishes no cut-off value, so none is applied to this figure.'
  } else {
    out.twoMinuteNote = 'Enter the two-minute reading to get the second-minute fall and the total fall from peak to two minutes.'
  }
  return out
}
