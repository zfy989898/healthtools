# Health calculation functions, with their sources

Every file in `src/tools/` is one calculator: the formula, the published paper the
formula and its constants came from, the accepted input ranges, and a pure
`compute(inputs, constants)` function. The function that runs in the browser is the
same function that runs at build time to produce the worked examples printed on the
page, so the examples cannot drift from the code.

These are arithmetic helpers over numbers you type in. They are not medical advice,
and nothing here recommends a dose, a diagnosis or a training decision.

| Tool | Source module |
| --- | --- |
| [Acute Chronic Workload Ratio Calculator](https://healthtools.icu/acute-chronic-workload-ratio-calculator/) | [`src/tools/acute-chronic-workload-ratio-calculator.mjs`](src/tools/acute-chronic-workload-ratio-calculator.mjs) |
| [Caffeine Half Life Calculator](https://healthtools.icu/caffeine-half-life-calculator/) | [`src/tools/caffeine-half-life-calculator.mjs`](src/tools/caffeine-half-life-calculator.mjs) |
| [Heart Rate Zone Calculator](https://healthtools.icu/heart-rate-zone-calculator/) | [`src/tools/heart-rate-zone-calculator.mjs`](src/tools/heart-rate-zone-calculator.mjs) |
| [Us Navy Body Fat Calculator](https://healthtools.icu/us-navy-body-fat-calculator/) | [`src/tools/us-navy-body-fat-calculator.mjs`](src/tools/us-navy-body-fat-calculator.mjs) |
| [Vo2 Max Heart Rate Ratio Calculator](https://healthtools.icu/vo2-max-heart-rate-ratio-calculator/) | [`src/tools/vo2-max-heart-rate-ratio-calculator.mjs`](src/tools/vo2-max-heart-rate-ratio-calculator.mjs) |

## Layout

- `src/tools/*.mjs` - one data record plus `compute()` per calculator.
- `lib/build.mjs` - generates static pages from those records and stringifies `compute()` into the client.
- `lib/gates.mjs` - the build fails unless every page passes it: English only, complete metadata, a traceable citation, a word floor, no near-duplicate of another page, reachable from the homepage in three links.
- `citations.lock.json` - what the citation check last saw at PubMed, for each PMID used.

## Run

```sh
node lib/build.mjs        # writes dist/
```

Monetisation is not part of the maths, so this copy ships with the publisher id
blank. `lib/gates.mjs` fails the build unless every page carries an ad loader whose
id matches `ads.txt` - set `ADSENSE_PUB` in the environment to your own id, or point
the gate at your own ad policy, before running the build.

## Licence

MIT - see [LICENSE](LICENSE).
