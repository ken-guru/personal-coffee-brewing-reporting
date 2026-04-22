# Third-Party Licenses

This document lists all third-party software used by **BrewLog – Personal Coffee Brewing Reporter**, along with their respective licenses and source references.

BrewLog is a private application deployed as a web service. The dependencies below fall into two categories:

1. **Runtime dependencies** – bundled into the client application or executed server-side and therefore *distributed* to end users.
2. **Development-only dependencies** – used exclusively during the build/test pipeline and *not* distributed to end users.

All licenses identified are **permissive open-source licenses**. No incompatibilities with the project's private/closed-source nature were found. See the [Compatibility Summary](#license-compatibility-summary) for details.

---

## Table of Contents

- [Runtime Dependencies](#runtime-dependencies)
- [Development-Only Dependencies](#development-only-dependencies)
- [Notable Transitive Dependencies](#notable-transitive-dependencies)
- [License Compatibility Summary](#license-compatibility-summary)
- [License Texts](#license-texts)

---

## Runtime Dependencies

These packages are bundled into the final application and served to end users.

| Package | Version | License | Source |
|---------|---------|---------|--------|
| `@hookform/resolvers` | 3.10.0 | MIT | https://github.com/react-hook-form/resolvers |
| `@radix-ui/react-dialog` | 1.1.15 | MIT | https://github.com/radix-ui/primitives |
| `@radix-ui/react-label` | 2.1.8 | MIT | https://github.com/radix-ui/primitives |
| `@radix-ui/react-select` | 2.2.6 | MIT | https://github.com/radix-ui/primitives |
| `@radix-ui/react-separator` | 1.1.8 | MIT | https://github.com/radix-ui/primitives |
| `@radix-ui/react-slider` | 1.3.6 | MIT | https://github.com/radix-ui/primitives |
| `@radix-ui/react-slot` | 1.2.4 | MIT | https://github.com/radix-ui/primitives |
| `@radix-ui/react-switch` | 1.2.6 | MIT | https://github.com/radix-ui/primitives |
| `@radix-ui/react-toast` | 1.2.15 | MIT | https://github.com/radix-ui/primitives |
| `@radix-ui/react-tooltip` | 1.2.8 | MIT | https://github.com/radix-ui/primitives |
| `@radix-ui/react-visually-hidden` | 1.2.4 | MIT | https://github.com/radix-ui/primitives |
| `@types/react` | 19.2.14 | MIT | https://github.com/DefinitelyTyped/DefinitelyTyped |
| `@types/react-dom` | 19.2.3 | MIT | https://github.com/DefinitelyTyped/DefinitelyTyped |
| `@vercel/analytics` | 1.6.1 | **MPL-2.0** | https://github.com/vercel/analytics |
| `@vercel/blob` | 2.3.0 | Apache-2.0 | https://github.com/vercel/storage |
| `@vercel/speed-insights` | 1.3.1 | Apache-2.0 | https://github.com/vercel/speed-insights |
| `class-variance-authority` | 0.7.1 | Apache-2.0 | https://github.com/joe-bell/cva |
| `clsx` | 2.1.1 | MIT | https://github.com/lukeed/clsx |
| `lucide-react` | 0.575.0 | ISC | https://github.com/lucide-icons/lucide |
| `react` | 19.2.4 | MIT | https://github.com/facebook/react |
| `react-dom` | 19.2.4 | MIT | https://github.com/facebook/react |
| `react-hook-form` | 7.71.2 | MIT | https://github.com/react-hook-form/react-hook-form |
| `react-router-dom` | 7.13.1 | MIT | https://github.com/remix-run/react-router |
| `tailwind-merge` | 3.5.0 | MIT | https://github.com/dcastil/tailwind-merge |
| `zod` | 4.3.6 | MIT | https://github.com/colinhacks/zod |

> **Note on build tools bundled into the client**: `vite` and `typescript` are build-time tools that produce the compiled client bundle. Their code is not itself shipped to users, only their output is.

---

## Development-Only Dependencies

These packages are used exclusively during development and testing. They are not included in any build artifact distributed to end users.

| Package | Version | License | Source |
|---------|---------|---------|--------|
| `@tailwindcss/forms` | 0.5.11 | MIT | https://github.com/tailwindlabs/tailwindcss-forms |
| `@testing-library/jest-dom` | 6.9.1 | MIT | https://github.com/testing-library/jest-dom |
| `@testing-library/react` | 16.3.2 | MIT | https://github.com/testing-library/react-testing-library |
| `@testing-library/user-event` | 14.6.1 | MIT | https://github.com/testing-library/user-event |
| `@types/node` | 25.3.3 | MIT | https://github.com/DefinitelyTyped/DefinitelyTyped |
| `@vitejs/plugin-react` | 5.1.4 | MIT | https://github.com/vitejs/vite-plugin-react |
| `autoprefixer` | 10.4.27 | MIT | https://github.com/postcss/autoprefixer |
| `jsdom` | 28.1.0 | MIT | https://github.com/jsdom/jsdom |
| `postcss` | 8.5.6 | MIT | https://github.com/postcss/postcss |
| `tailwindcss` | 3.4.19 | MIT | https://github.com/tailwindlabs/tailwindcss |
| `typescript` | 5.9.3 | Apache-2.0 | https://github.com/microsoft/TypeScript |
| `vite` | 7.3.2 | MIT | https://github.com/vitejs/vite |
| `vitest` | 4.0.18 | MIT | https://github.com/vitest-dev/vitest |

---

## Notable Transitive Dependencies

The following packages are indirect (transitive) dependencies with licenses that are noteworthy. They are all compatible with the project's usage.

| Package | Version | License | Introduced via | Note |
|---------|---------|---------|----------------|------|
| `caniuse-lite` | 1.0.30001774 | CC-BY-4.0 | `autoprefixer` → `browserslist` | Build-time data only; not distributed to users |
| `entities` | 6.0.1 | BSD-2-Clause | `jsdom` (dev/test only) | Testing environment only |
| `mdn-data` | 2.12.2 | CC0-1.0 | `css-tree` → `jsdom` (dev/test only) | Public domain; no restrictions |
| `source-map-js` | 1.2.1 | BSD-3-Clause | `postcss` (build tool) | Build-time only |
| `tough-cookie` | 6.0.0 | BSD-3-Clause | `jsdom` (dev/test only) | Testing environment only |
| `tslib` | 2.8.1 | 0BSD | `typescript` (build tool) | Extremely permissive; no conditions |
| `webidl-conversions` | 8.0.1 | BSD-2-Clause | `jsdom` (dev/test only) | Testing environment only |
| `lru-cache` (nested) | 11.2.6 | BlueOak-1.0.0 | CSS tooling (dev/test only) | Permissive; simpler than MIT |

> Transitive dependencies not listed here are MIT or ISC licensed.

---

## License Compatibility Summary

All licenses found in this dependency tree are **permissive open-source licenses**. No copyleft licenses (GPL, LGPL, AGPL) were identified. No incompatibilities with the private, closed-source nature of this project were found.

### License-by-license assessment

**MIT / ISC / 0BSD / MIT-0 / BlueOak-1.0.0**
Standard permissive licenses. No restrictions beyond inclusion of the copyright notice in distributed source (MIT/ISC/BlueOak). 0BSD and MIT-0 have no attribution requirement. All are fully compatible.

**Apache-2.0** (`@vercel/blob`, `@vercel/speed-insights`, `class-variance-authority`, `typescript`)
Permits use, modification, and distribution in proprietary software. Requires preservation of copyright and license notices and a NOTICE file when distributing. As a web service, distribution of notices in user-facing documentation (such as this file) satisfies this requirement. Fully compatible.

**MPL-2.0** (`@vercel/analytics`)
The Mozilla Public License 2.0 is a *file-level weak copyleft* license. It requires that modifications made *to MPL-licensed source files themselves* are made available under the MPL. It does **not** require that the containing application be open-sourced. Since BrewLog uses `@vercel/analytics` as an unmodified npm dependency, no source disclosure obligation is triggered. Fully compatible.

**CC-BY-4.0** (`caniuse-lite`)
Creative Commons Attribution 4.0, applied to the browser compatibility data embedded in `caniuse-lite`. This package is consumed exclusively at build time by `autoprefixer`/`browserslist` to generate vendor-prefixed CSS; its data files are not distributed as part of the application. Attribution for Can I Use is provided here and satisfies the CC-BY-4.0 requirement.

> **Can I Use** data by Alexis Deveria and contributors (https://caniuse.com) — licensed under [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/).

**CC0-1.0** (`mdn-data`)
Creative Commons Zero — effectively public domain. No restrictions whatsoever.

**BSD-2-Clause / BSD-3-Clause**
Standard permissive BSD licenses. Require retention of copyright notice and disclaimer. BSD-3-Clause additionally prohibits use of project names for endorsement. Fully compatible.

---

## License Texts

Full license texts are maintained by each package in their respective repositories. Canonical texts for each license family are available at the links below.

| License | Canonical Text |
|---------|---------------|
| MIT | https://opensource.org/licenses/MIT |
| ISC | https://opensource.org/licenses/ISC |
| Apache-2.0 | https://www.apache.org/licenses/LICENSE-2.0 |
| MPL-2.0 | https://www.mozilla.org/en-US/MPL/2.0/ |
| BSD-2-Clause | https://opensource.org/licenses/BSD-2-Clause |
| BSD-3-Clause | https://opensource.org/licenses/BSD-3-Clause |
| CC-BY-4.0 | https://creativecommons.org/licenses/by/4.0/ |
| CC0-1.0 | https://creativecommons.org/publicdomain/zero/1.0/ |
| BlueOak-1.0.0 | https://blueoakcouncil.org/license/1.0.0 |
| 0BSD | https://opensource.org/licenses/0BSD |
| MIT-0 | https://opensource.org/licenses/MIT-0 |

---

*This document was last updated: 2026-04-22. It reflects the dependency tree at the versions pinned in `package-lock.json`. It should be reviewed and updated whenever direct dependencies are added, removed, or upgraded.*
