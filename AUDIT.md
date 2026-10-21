# Website quality audit — October 21, 2026

## Design direction

Reference: https://archar.framer.website/

Adapted its oversized editorial typography, warm paper/orange/black palette, hairline grids, asymmetric compositions, and generous section rhythm to Aliyan's existing content. Retained the portrait, projects, career history, service offerings, contact links, and React/Vite architecture.

## Prioritized findings and fixes

| Priority | Finding | Resolution |
| --- | --- | --- |
| Critical | Direct production requests to offerings and project routes returned 404. | Generate actual route HTML files and a custom 404 entry; enable Vercel clean URLs. |
| High | Narrow mission grids exceeded their container; global clipping concealed the problem. | Use shrinkable grid tracks, stack layouts at appropriate widths, remove masking overflow. |
| High | Mobile navigation needed reliable keyboard focus, Escape handling, and resize cleanup. | Native modal dialog, explicit focus cycle, focus restoration, scroll lock, desktop resize close. |
| High | Small body text and inconsistent spacing weakened readability. | Consolidated responsive type, spacing, section widths, control sizes, and focus styles. |
| High | Absolute store portrait placement and hero text could overlap content. | In-flow store grid, responsive hero composition, readable mobile title backdrop. |
| Medium | Long sticky video section created excess scrolling and relied on an external CDN. | Normal-flow local video, poster, viewport playback, manual pause, reduced-motion support. |
| Medium | Portrait PNG payloads were unnecessarily large. | WebP variants with dimensions and responsive source sets; full-size files reduced about 95–97%. |
| Medium | Carousel remounting interrupted keyboard focus. | Stable component identity, live announcements, preserved keyboard and swipe controls. |
| Medium | Repeated CSS overrides made breakpoints inconsistent. | Consolidated stylesheet; built CSS reduced from about 55.4 KB to 34.1 KB. |
| Medium | Metadata was shared across routes; malformed URI decoding could crash rendering. | Route-specific build/runtime metadata, sitemap and robots file, guarded decoding. |
| Low | Decorative arrows implied actions on static rows; one dark-section label had weak contrast. | Removed misleading affordances and corrected label contrast. |

## Verification

The Playwright suite covers:

- Home, offerings, both project routes, and the missing-page view at widths 320, 390, 768, 1024, 1440, 1920, and 2560 pixels.
- Horizontal overflow, image loading, runtime errors, and internal link targets.
- Mobile menu focus cycle, Escape, focus restoration, selection, scroll unlock, and desktop resize.
- Career disclosure, carousel keyboard interaction, and reduced-motion video controls.
- Axe WCAG A/AA checks on the four content routes at mobile and desktop sizes, plus the open mobile menu.
- Generated route metadata and the custom 404 artifact.

Visual review also includes short landscape, mobile, tablet, desktop, and ultrawide captures. Automated accessibility checks complement visual and keyboard review; they do not certify all accessibility requirements.

## Scope and ongoing checks

- Existing email, phone, and external social destinations are preserved. A user's mail or phone application handles those links; this site has no submission form/backend to validate.
- Existing project content uses designed typographic covers because no project screenshots were supplied. The motion reel is labeled as design inspiration.
- Check real device/browser behavior periodically, especially mobile Safari media playback. Current automated coverage uses Chromium.
- Vite reports a harmless dependency-level `use client` directive warning from lucide-react during builds; the production build succeeds.
