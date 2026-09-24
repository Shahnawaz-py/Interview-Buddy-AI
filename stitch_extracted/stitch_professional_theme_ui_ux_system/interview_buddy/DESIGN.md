---
name: Interview Buddy
colors:
  surface: '#031427'
  surface-dim: '#031427'
  surface-bright: '#2a3a4f'
  surface-container-lowest: '#000f21'
  surface-container-low: '#0b1c30'
  surface-container: '#102034'
  surface-container-high: '#1b2b3f'
  surface-container-highest: '#26364a'
  on-surface: '#d3e4fe'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#d3e4fe'
  inverse-on-surface: '#213145'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#c0c1ff'
  on-secondary: '#1000a9'
  secondary-container: '#3131c0'
  on-secondary-container: '#b0b2ff'
  tertiary: '#d8ffe7'
  on-tertiary: '#003824'
  tertiary-container: '#65f2b5'
  on-tertiary-container: '#006d4a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#031427'
  on-background: '#d3e4fe'
  surface-variant: '#26364a'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  title-md:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  code-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 22px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  gutter-lg: 1.5rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels an exacting, high-performance developer workspace aesthetic built for technical interviews. It combines the rigorous ergonomics of contemporary IDEs (VS Code, Zed, Linear) with the polished clarity of top-tier developer platforms.

### Brand Personality & Emotional Impact
- **Surgical Precision:** Every border, line-height, and padding token aligns to an intentional grid rhythm.
- **Calm Mastery under Pressure:** The UI minimizes cognitive friction during high-stakes practice sessions, transforming interview anxiety into disciplined preparation.
- **Instrument-grade Utility:** UI controls resemble high-end developer instrumentation—dense, legible, responsive, and tactile.

### Design Movement & Aesthetic Archetype
The style merges **Technical Minimalism** with **Refined Surface Glass**. Crisp 1px micro-borders isolate interactive regions, dark charcoal backgrounds anchor deep focus, and precise neon accents (Electric Cyan, Tech Indigo, Emerald, Amber, Rose) communicate real-time simulation metrics, audio ingestion, code analysis, and feedback scoring without visual clutter.

## Colors

The palette operates across dual operational themes: a default **Deep Charcoal Dark Mode** engineered for low eye fatigue during intensive live coding sessions, and a **Crisp Architectural Light Mode** providing maximum contrast and readability for retrospective evaluation.

### Core Roles & Palette Architecture
- **Primary (`#00F0FF` - Electric Cyan):** Active execution states, primary CTAs, active cursor indicators, and real-time AI generation nodes.
- **Secondary (`#6366F1` - Tech Indigo):** Structural metadata, system architecture tags, active tabs, and secondary interactive states.
- **Tertiary (`#10B981` - Emerald Green):** Optimized solutions, pass states, high signal-to-noise metrics, and algorithm efficiency callouts.
- **Warning (`#F59E0B` - Precision Amber):** Sub-optimal time complexities, edge-case warnings, and hints.
- **Destructive / Live Recording (`#F43F5E` - Vivid Rose):** Syntax failures, runtime exceptions, anti-patterns, and live microphone/webcam recording pulses.
- **Neutral (`#64748B` - Slate Neutral):** Structural balance, divider lines, disabled states, and metadata labels.

### Dark Mode Surface Hierarchy
- `bg-canvas`: `#0A0D12` (Void Black/Charcoal)
- `surface-base`: `#111620` (Deep Slate Editor Base)
- `surface-elevated`: `#171E2C` (Panel/Card Surface)
- `surface-overlay`: `#1E283A` (Flyouts, Menus, Active Modals)
- `border-subtle`: `rgba(255, 255, 255, 0.08)`
- `border-strong`: `rgba(255, 255, 255, 0.16)`

### Light Mode Surface Hierarchy
- `bg-canvas`: `#F8FAFC` (Pure Technical White-Slate)
- `surface-base`: `#FFFFFF` (Surface White)
- `surface-elevated`: `#F1F5F9` (Muted Technical Slate)
- `surface-overlay`: `#FFFFFF` with drop micro-stroke
- `border-subtle`: `rgba(15, 23, 42, 0.08)`
- `border-strong`: `rgba(15, 23, 42, 0.18)`

## Typography

The typographic hierarchy marries the clarity of **Geist** for natural conversation and structural layout with the developer-native monospace characteristics of **JetBrains Mono** for code execution, system telemetry, and metadata badges.

### Typographic Roles
- **Headlines & Interface Titles (Geist):** Clean, geometric, neutral grotesque without idiosyncratic distractions. Tighter tracking (`-0.02em`) on display sizes to replicate IDE headers.
- **Body & Dialogue (Geist):** Optimized for fast scanning of complex problem statements, AI feedback debriefs, and transcript analysis.
- **System, Code & Telemetry (JetBrains Mono):** Monospace treatment reserved for timestamps, complexity scores ($O(n \log n)$), token counters, audio waveforms, keybindings, and syntax editors.

## Layout & Spacing

The design system employs a **modular split-pane workbench layout** anchored on a strict 4px base increment.

### Structural Layout Model
- **Workbench Composition:** The simulator screen utilizes a 3-pane layout on desktop:
  1. *Left Rail:* Problem manifesto, transcript, and AI interviewer audio-visual module (320px–420px flexible bounds).
  2. *Center Stage:* Main code editor / interactive whiteboard (fluid column).
  3. *Right Drawer / Bottom Dock:* Live feedback diagnostics, test run assertions, and AST insights (collapsible, default 360px).
- **Responsive Adaptations:**
  - **Desktop (>= 1280px):** Multi-pane split screen with draggable resizer gutters (8px hit target, 1px visual rule).
  - **Tablet (768px - 1279px):** Tab-driven workspace switching between Code Editor, Interviewer Stream, and Feedback Inspector. Margins drop to `margin-sm`.
  - **Mobile (< 768px):** Single-column stacked mode with persistent audio status bar, simplified mobile code viewer, and stacked critique blocks.

## Elevation & Depth

This design system abandons heavy, muddy drop shadows in favor of **Tonal Layering**, **Micro-Borders**, and **High-Frequency Glass Panels**.

### Hierarchy of Surfaces
1. **Canvas Layer (`0dp`):** `#0A0D12` (dark) / `#F8FAFC` (light). The root substrate upon which panels rest.
2. **Panel Tier (`1dp`):** `#111620` (dark) / `#FFFFFF` (light). Separated from canvas exclusively by a 1px border (`border-subtle`). No shadow.
3. **Floating Overlays & Diagnostics (`2dp`):** Dropdowns, auto-complete popovers, and debug tooltips use translucent acrylic surfaces:
   - Dark: `rgba(23, 30, 44, 0.85)` with `backdrop-filter: blur(12px)`.
   - Micro-shadow: `0 8px 24px -4px rgba(0, 0, 0, 0.45)`.
4. **Active Attention / Modal Tier (`3dp`):** Centered critique popovers, live session end screens:
   - Micro-shadow with subtle chromatic glow: `0 16px 40px -8px rgba(0, 240, 255, 0.08)`.

## Shapes

The design system maintains an intentional, utilitarian **Soft Geometry (`roundedness: 1`)**.

### Geometry Application
- **Buttons, Inputs, Badges:** `0.25rem` (4px). Replicates precise terminal windows and hardware-like click targets.
- **Panels, Windows, Code Blocks:** `0.5rem` (8px). Softens the intersection of large rectangular split-views.
- **Floating Modals & Cards:** `0.75rem` (12px). Provides distinct containment for overlay elements.
- **Pulse Indicators & Avatars:** Fully rounded circular geometry (`pill/full`) reserved exclusively for live session indicators (e.g., active recording dot, speaker status).

## Components

### Buttons
- **Primary Action (Run Code / Submit):** High-energy Electric Cyan background (`#00F0FF`) with deep slate text (`#0A0D12`), weight 600. Subtle cyan hover bloom (`box-shadow: 0 0 16px rgba(0, 240, 255, 0.35)`).
- **Secondary (Inspect / Reset):** Transparent fill, 1px border (`border-subtle`), text in Geist light slate. Hover triggers surface highlight (`surface-elevated`) and border color transition to Tech Indigo.
- **Destructive / Recording Toggle:** Vivid Rose tint (`#F43F5E`) with interactive recording beacon animation.

### Chips & Badges
- Built strictly using `JetBrains Mono` at `label-sm` or `label-md`.
- **Syntax / Metrics:** Subdued tinted backgrounds (`rgba(color, 0.12)`) with a 1px solid border (`rgba(color, 0.3)`).
- **Status Variants:**
  - *Optimal Answer:* Tertiary (`#10B981`) text + border.
  - *Time Complexity Drift:* Warning (`#F59E0B`) text + border.
  - *Syntax Bug / Edge Case Missed:* Destructive (`#F43F5E`) text + border.

### Input Fields & Code Editors
- Inset background (`surface-base`) with 1px border (`border-subtle`).
- Active focus state: No heavy outer ring; transitions border to Primary Electric Cyan (`#00F0FF`) accompanied by a 1px inner hairline stroke.
- Monospace font styling for algorithmic parameters; placeholder copy in muted slate (`#475569`).

### Checkboxes & Radios
- Sharp 4px corner radius for checkboxes; circular for radios.
- Inactive: Deep charcoal background with 1px solid slate border.
- Active: Electric Cyan fill with stark charcoal check icon.

### Cards & Feedback Panels
- Flat panel base with 1px hairline border.
- Grouped with an interior sub-header divider separating metadata (runtime, memory usage, AI confidence score) from the body text.
- Glass panels incorporate a 1px inner top highlight (`border-t: rgba(255, 255, 255, 0.08)`) simulating light hitting machined glass.

### Domain-Specific Components
- **Audio Pulse / Waveform Bar:** Oscillating vertical frequency bars rendered in Electric Cyan and Rose indicating interviewer voice activity versus candidate speech stream.
- **Diff / Lint Callout:** In-line feedback accordion highlighting candidate code snippet side-by-side with an idiomatic AI refactoring suggestion.