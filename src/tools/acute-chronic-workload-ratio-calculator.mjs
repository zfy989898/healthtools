export const tool = {
  slug: 'acute-chronic-workload-ratio-calculator',
  name: 'Acute:Chronic Workload Ratio Calculator',
  h1: 'Acute:Chronic Workload Ratio (ACWR) Calculator',
  seo: {
    title: 'Acute:Chronic Workload Ratio (ACWR) Calculator | HealthTools',
    desc: 'Enter your weekly training totals to get the acute:chronic workload ratio, the sweet-spot and danger-zone ranges Gabbett published, and your week-to-week change.',
  },
  intro: 'An acute:chronic workload ratio calculator turns the weekly training totals you already record into the ratio used in the sports-medicine literature, and reports the ranges those papers actually named instead of inventing categories in between. Every number on this page is either your own arithmetic or a figure quoted from a named study of team-sport athletes.',
  category: 'training',
  provenance: {
    source: 'Gabbett TJ. The training-injury prevention paradox: should athletes be training smarter and harder? Br J Sports Med 2016;50(5):273-9, PMID 26758673, doi 10.1136/bjsports-2015-095788 (session-RPE definition, the 0.8-1.3 and 1.5 ranges, acute = one week and chronic = rolling average of the most recent 3-6 weeks). Blanch P, Gabbett TJ. Has the athlete trained enough to return to play safely? The acute:chronic workload ratio permits clinicians to quantify a player\'s risk of subsequent injury. Br J Sports Med 2016;50(5):273-7, PMID 26701923, doi 10.1136/bjsports-2015-095445 (the interpretation figure the ranges are redrawn from). Foster C. Monitoring training in athletes with reference to overtraining syndrome. Med Sci Sports Exerc 1998;30(7):1164-8, PMID 9662690, doi 10.1097/00005768-199807000-00023 (session-RPE method, rolling 6-week load, monotony and strain). Hulin BT, Gabbett TJ, Blanch P, Chapman P, Bailey D, Orchard JW. Spikes in acute workload are associated with increased injury risk in elite cricket fast bowlers. Br J Sports Med 2014;48(8):708-12, PMID 23962877, doi 10.1136/bjsports-2013-092524 (one-week acute and four-week rolling-average chronic; relative risks of 2.1-2.2 for a negative training-stress balance and 4.5 (3.43-5.90) above 200%). Rogalski B, Dawson B, Heasman J, Gabbett TJ. Training and game loads and injury risk in elite Australian footballers. J Sci Med Sport 2013;16(6):499-503, PMID 23333045, doi 10.1016/j.jsams.2012.12.004 (absolute weekly and week-to-week load thresholds with odds ratios).',
    url: 'https://pubmed.ncbi.nlm.nih.gov/26758673/',
    retrieved: '2026-09-21',
    verified: true,
    checks: [
      { pmid: '26758673', first_author: 'Gabbett', year: '2016', journal: 'Br J Sports Med', doi: '10.1136/bjsports-2015-095788' },
      { pmid: '26701923', first_author: 'Blanch', year: '2016', journal: 'Br J Sports Med', doi: '10.1136/bjsports-2015-095445' },
      { pmid: '9662690', first_author: 'Foster', year: '1998', journal: 'Med Sci Sports Exerc', doi: '10.1097/00005768-199807000-00023' },
      { pmid: '23962877', first_author: 'Hulin', year: '2014', journal: 'Br J Sports Med', doi: '10.1136/bjsports-2013-092524' },
      { pmid: '23333045', first_author: 'Rogalski', year: '2013', journal: 'J Sci Med Sport', doi: '10.1016/j.jsams.2012.12.004' },
    ],
  },
  constants: {
    windows: [
      { key: '3', label: '3-week rolling average' },
      { key: '4', default: true, label: '4-week rolling average (the window Hulin and Rogalski used)' },
      { key: '5', label: '5-week rolling average' },
      { key: '6', label: '6-week rolling average (the window Foster used)' },
    ],
    publishedBands: [
      { min: 0.8, max: 1.3, name: 'sweet spot' },
      { min: 1.5, max: null, name: 'danger zone' },
    ],
  },
  formula: {
    expression: 'Session load (arbitrary units) = session RPE x session minutes. Acute workload = week 1 total. Chronic workload = rolling average of the most recent 3-6 weekly totals, the current week included. Acute:chronic workload ratio = acute / chronic.',
    description: 'The ratio compares how much you did recently with how much you have been doing. That is the whole idea: a given weekly load means something different depending on the weeks behind it, so the ratio is a measure of change rather than of volume.',
    citation: 'Gabbett TJ. Br J Sports Med 2016;50(5):273-9, PMID 26758673; method from Foster C, Med Sci Sports Exerc 1998;30(7):1164-8, PMID 9662690.',
  },
  inputs: [
    { id: 'window', label: 'Chronic window', type: 'select', optionsKey: 'windows' },
    { id: 'wk1', label: 'Week 1 total (most recent)', unit: 'arbitrary units', type: 'number', min: 0, max: 30000 },
    { id: 'wk2', label: 'Week 2 total', unit: 'arbitrary units', type: 'number', min: 0, max: 30000 },
    { id: 'wk3', label: 'Week 3 total', unit: 'arbitrary units', type: 'number', min: 0, max: 30000 },
    { id: 'wk4', label: 'Week 4 total', unit: 'arbitrary units', type: 'number', min: 0, max: 30000 },
    { id: 'wk5', label: 'Week 5 total (only needed for a 5- or 6-week window)', unit: 'arbitrary units', type: 'number', min: 0, max: 30000 },
    { id: 'wk6', label: 'Week 6 total (only needed for a 6-week window)', unit: 'arbitrary units', type: 'number', min: 0, max: 30000 },
  ],
  workedExamples: [
    { label: 'Four weeks within about 250 units of each other', inputs: { window: '4', wk1: '4200', wk2: '4100', wk3: '4300', wk4: '4000', wk5: '', wk6: '' } },
    { label: 'One large week on top of a steady four-week base', inputs: { window: '4', wk1: '6800', wk2: '4200', wk3: '4000', wk4: '4100', wk5: '', wk6: '' } },
    { label: 'A deliberate easy week after three heavy ones', inputs: { window: '4', wk1: '1800', wk2: '4500', wk3: '4500', wk4: '4600', wk5: '', wk6: '' } },
    { label: 'Six weeks of a long build, 6-week window', inputs: { window: '6', wk1: '5200', wk2: '4900', wk3: '4700', wk4: '4400', wk5: '4100', wk6: '3900' } },
  ],
  limitation: 'This is arithmetic on numbers you enter, not an injury forecast. Every range and risk figure shown comes from professional or elite team-sport cohorts - 28 cricket fast bowlers over 43 seasons, 46 Australian footballers aged about 22, rugby league squads - followed by paid performance staff who record every session. None of it was measured in the general population, none of it was measured in the United States, and the review that supplies the 0.8-1.3 and 1.5 ranges says in terms that applying those ranges to individual-sport athletes should be done with caution. A ratio of 1.0 with a chronic window of zero is meaningless, and if your sport is not session-based your weekly total is an estimate you built yourself.',
  sections: [
    {
      h2: 'How a week gets turned into a number',
      paragraphs: [
        'At the end of each session you give one rating, from 1 to 10, for how hard the whole session was - not the average of its parts, and not the hardest moment. Multiply that rating by the session length in minutes and you have that session\'s load in what the papers call arbitrary units. Sum the sessions in a week and you have a weekly total, which is what this calculator asks for. Gabbett notes that the units are literally "RPE units x minutes" and that "exertional minutes" would be a more accurate name than arbitrary units.',
        'To give the scale of the number: in the football codes Gabbett reports, a lower-intensity session typically lands between 300 and 500 arbitrary units and a higher-intensity session between 700 and 1000. A week of five or six sessions therefore commonly sits in the thousands, which is why the studies quote thresholds like 1750 or 3000 rather than percentages. If your own weekly totals look nothing like those, that says more about how you counted than about your fitness - a three-hour weekend ride at rating 6 is 1080 units on its own.',
        'Foster\'s 1998 paper, which introduced the method while looking at overtraining in 25 experienced athletes, defined two further indices that this page does not compute: monotony, the daily mean load divided by the daily standard deviation, and strain, the weekly load multiplied by monotony. Both need your day-by-day numbers rather than weekly totals, so a steady five-equal-days week and one monstrous weekend session can share a weekly total and have very different strain.',
      ],
    },
    {
      h2: 'Where the two windows come from',
      paragraphs: [
        'Gabbett\'s review states the definitions plainly: an acute training load can be as short as one session, but in team sports one week of training is the logical and convenient unit, while a chronic load represents the rolling average of the most recent three to six weeks. That is why the window above is a choice rather than a fixed constant - the published literature itself uses different windows, and the ratio moves depending on which one you pick.',
        'The specific studies give the specific defaults. Hulin and colleagues, following 28 elite cricket fast bowlers across 43 individual seasons in a six-year period, calculated one-week data as the acute workload and a four-week rolling average as the chronic workload. Foster, whose athletes recorded their own training, summarised load as a rolling six-week average. This calculator therefore defaults to four weeks, offers three through six, and prints which one it used, because a ratio reported without its window is not reproducible.',
        'The chronic average includes the week you are calling acute. That is deliberate and it is what makes the ratio behave the way it does: a big week pulls the chronic baseline up towards itself, so a first big spike reports a higher ratio than the same spike in the fifth week of a build.',
      ],
    },
    {
      h2: 'What the published ranges actually say',
      paragraphs: [
        'Gabbett writes that, taken from three sports - cricket, Australian football and rugby league - ratios within 0.8 to 1.3 "could be considered the training sweet spot", while ratios of 1.5 or above represent the "danger zone". The interpretation figure those ranges come from is credited to Blanch and Gabbett, the paper that argued the ratio lets clinicians quantify an athlete\'s risk of a subsequent injury.',
        'Notice what is missing from that pair of ranges: the space between 1.3 and 1.5. The published guidance does not name it, so this calculator calls it what it is, a gap in the source material, rather than inventing a label for it. Ratios below 0.8 are below the named sweet-spot range; the review does not call them dangerous, and its framing is the opposite - that a low acute load against a high chronic baseline is a well-prepared state.',
        'The reason those authors and not others keep appearing above is worth being blunt about: Gabbett, Blanch, Hulin, Rogalski and Piggott are a connected group working on Australian professional team sport, several of them the same laboratory, and the load-injury literature they built is partly self-cited. Hulin\'s own paper is explicit that its findings come from elite fast bowlers, and Gabbett states that individual sports may behave differently and that the ranges should be applied with caution until more data exists. Treat the bands as a description of what a specific body of team-sport research reported, not as a health guideline for you.',
      ],
    },
    {
      h2: 'The risk figures behind the bands',
      paragraphs: [
        'Hulin and colleagues reported that a negative training-stress balance - the acute week sitting below the chronic baseline - was associated with increased injury risk in the following week, with relative risks of 2.2 (95% CI 1.91 to 2.53) for internal workload and 2.1 (1.81 to 2.44) for the external workload of balls bowled. Bowlers whose internal training-stress balance exceeded 200% had a relative risk of injury of 4.5 (3.43 to 5.90) compared with those between 50% and 99%. That 200% figure is the same quantity as a ratio of 2.0, which is well above the range the review calls the danger zone.',
        'This page deliberately does not convert your number into one of those percentage categories, because the papers\' "training-stress balance" is reported as a percentage whose exact cut-points are defined in the full text of a paper that is not open access, and an ambiguous definition is not a good thing to compute a verdict from. The relative risks are quoted above so you can see the strength of the association that the bands rest on, and where they stop applying.',
        'Rogalski, in 46 elite Australian footballers with a mean age of 22.2 years followed for one season, reported results as odds ratios against the lowest load range rather than as a ratio at all: a one-week load above 1750 arbitrary units carried OR 2.44 to 3.38, a two-week load above 4000 units OR 4.74, and a previous-to-current-week increase above 1250 units OR 2.58. Those associations appeared in the in-season phase and not in preseason, which is the kind of detail that gets lost when a threshold is copied onto a landing page. This calculator shows your absolute weekly totals next to those figures for comparison, not as a personal risk statement.',
        'On week-to-week change, Gabbett\'s review also reports his own unpublished modelling of professional rugby league preseason data: players whose load stayed within about 5% less to 10% more than the previous week had under a 10% injury risk, and a jump of 15% or more raised it to between 21% and 49%, which led him to recommend keeping weekly increases under 10%. Those numbers are labelled unpublished by the author himself, and this page reproduces them for that reason only - the calculator prints your percentage change and leaves the interpretation with the source.',
      ],
    },
    {
      h2: 'Using this well, and using it badly',
      paragraphs: [
        'The ratio is only as good as the ratings, and the ratings are only comparable if you keep the same convention. People tend to rate their own sessions generously after a good feeling and stingily after a bad one, which is a feature rather than a bug for trend watching: the number tracks perception, and perceived effort is exactly the internal load the method was designed to capture. What breaks it is changing scale mid-season or forgetting rest days, because a missing session and a zero both read as an easy week but mean different things.',
        'The most useful thing the ratio does is stop a raw volume number from being read out of context. A 5200-unit week is a hard week for someone whose chronic baseline is 2800 and a normal week for someone whose baseline is 5100, and the two situations were reported to carry very different injury risk in the studies above. That is the entire value of the calculation. Comparing your absolute arbitrary units against someone else\'s is not a use case, because your rating scale, your sport\'s session lengths and your counting rules are not the same instrument as theirs.',
        'If you are returning from an injury, or your clinician has set a load limit for you, this page has nothing to say about that. Blanch and Gabbett framed the ratio as a tool for clinicians to quantify return-to-play risk in team sport, which is a decision made alongside examination, not a number you read off alone.',
      ],
    },
  ],
  faq: [
    { q: 'What are arbitrary units?', a: 'Session rating of perceived exertion multiplied by session duration in minutes, so the unit is literally exertion-minutes. Foster introduced the convention in 1998; Gabbett points out that "exertional minutes" is a more accurate name.' },
    { q: 'Which chronic window should I use?', a: 'Four weeks, which is what Hulin and Rogalski used and what this calculator defaults to. Three to six weeks are all published in the literature - Foster summarised load as a rolling six-week average - and the ratio changes with the choice, so report the window alongside the number.' },
    { q: 'Is a ratio of 1.5 dangerous for me?', a: 'It is the cut-point above which the reviewed team-sport data reported elevated injury risk. It was measured in professional cricketers, Australian footballers and rugby league players followed by performance staff, and the review itself cautions that individual-sport athletes may behave differently. It is not a clinical threshold.' },
    { q: 'My ratio is between 1.3 and 1.5. What does that mean?', a: 'Nothing that the sources name. Gabbett labels 0.8 to 1.3 the sweet spot and 1.5 and above the danger zone and does not name the range in between, so this page reports it as a gap in the published guidance rather than inventing a category.' },
    { q: 'Why does a big week change my chronic average too?', a: 'Because the chronic window includes the current week. A spike lifts its own baseline, so the same absolute week produces a higher ratio the first time it happens and a lower one after several weeks at that level.' },
    { q: 'Can this work if I lift weights?', a: 'The session-RPE part transfers, but the published weekly totals and thresholds were all locomotion- or sport-based sessions. A week of heavy resistance training rated honestly will produce numbers whose absolute size has no counterpart in the studies quoted here, so only the ratio is comparable and even that is a stretch.' },
    { q: 'Does this replace a coach or a physiotherapist?', a: 'No. It divides one number by another and quotes the ranges that specific papers published. Return-to-play and pain-related decisions belong with a clinician.' },
  ],
  related: ['vo2-max-heart-rate-ratio-calculator', 'heart-rate-zone-calculator', 'us-navy-body-fat-calculator'],
}

const num = v => {
  if (v === '' || v === null || v === undefined) return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

export function compute(i, k) {
  const weeks = [num(i.wk1), num(i.wk2), num(i.wk3), num(i.wk4), num(i.wk5), num(i.wk6)]
  if (weeks[0] === null) return { error: 'Enter at least the most recent week total.' }
  const win = Number(i.window) || 4
  const missing = weeks.slice(0, win).findIndex(v => v === null)
  if (missing > -1) return { error: `A ${win}-week window needs week ${missing + 1} as well. Enter it, or shorten the window.` }
  if (weeks.slice(0, win).some(v => v < 0)) return { error: 'Weekly totals cannot be negative.' }

  const used = weeks.slice(0, win)
  const acute = weeks[0]
  const chronic = used.reduce((a, b) => a + b, 0) / win
  if (chronic <= 0) return { error: 'Every week in the chosen window is zero, so the ratio has no denominator.' }

  const acwr = Math.round((acute / chronic) * 100) / 100
  const sweet = k.publishedBands[0]
  const danger = k.publishedBands[1]
  let band
  if (acwr >= danger.min) band = `At or above ${danger.min} - the published "${danger.name}" range (PMID 26758673)`
  else if (acwr > sweet.max) band = 'Between the two published ranges; the sources name no category here'
  else if (acwr >= sweet.min) band = `Within ${sweet.min}-${sweet.max} - the published "${sweet.name}" range (PMID 26758673)`
  else band = `Below ${sweet.min}; below the named range, which the review describes as low acute load against a higher chronic baseline`

  const rows = used.map((v, idx) => ({
    week: idx === 0 ? 'Week 1 (acute)' : `Week ${idx + 1}`,
    load: Math.round(v),
    share: `${Math.round((v / (win * chronic)) * 1000) / 10}%`,
  }))

  const prev = weeks[1]
  let weekOnWeek = 'Not available - a one-week window was chosen'
  if (win > 1) weekOnWeek = prev > 0
    ? `${Math.round(((acute - prev) / prev) * 1000) / 10}% against week 2`
    : 'Week 2 was zero, so a percentage change is undefined'

  return {
    acute,
    chronic: Math.round(chronic * 10) / 10,
    acwr,
    windowUsed: `${win}-week rolling average, current week included`,
    band,
    weekOnWeek,
    loadRows: rows,
  }
}
