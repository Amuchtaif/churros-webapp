---
version: alpha
name: Bakery Flour
description: Artisan bakery: flour dust, rye, sourdough crust.
colors:
  primary: "#2B1E12"
  secondary: "#9B8670"
  tertiary: "#C46A1E"
  neutral: "#F5EEDC"
  surface: "#FBF6E9"
  on-primary: "#FBF6E9"
  outline: "#DCCFB5"
  muted: "#6F5D49"
  error: "#A33B2A"
typography:
  display:
    fontFamily: Cormorant Garamond
    fontSize: 5rem
    fontWeight: 500
    letterSpacing: "-0.015em"
  h1:
    fontFamily: Cormorant Garamond
    fontSize: 2.5rem
    fontWeight: 500
  body:
    fontFamily: Lora
    fontSize: 1.02rem
    lineHeight: 1.7
  label:
    fontFamily: Lora
    fontSize: 0.74rem
    letterSpacing: "0.12em"
  input:
    fontFamily: Lora
    fontSize: 1rem
    lineHeight: 1.4
  helper:
    fontFamily: Lora
    fontSize: 0.8rem
    lineHeight: 1.5
rounded:
  sm: 8px
  md: 14px
  lg: 24px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
motion:
  duration: 160ms
  easing: "cubic-bezier(0.2, 0.7, 0.2, 1)"
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  field:
    gap: 8px
    marginBottom: 24px
  label:
    typography: "{typography.label}"
    textColor: "{colors.primary}"
    textTransform: uppercase
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    placeholderColor: "{colors.secondary}"
    borderColor: "{colors.outline}"
    borderWidth: 1px
    rounded: "{rounded.md}"
    height: 52px
    padding: 0 18px
    typography: "{typography.input}"
  input-hover:
    borderColor: "{colors.secondary}"
  input-focus:
    borderColor: "{colors.tertiary}"
    focusRing: "0 0 0 3px rgba(196, 106, 30, 0.18)"
  input-error:
    borderColor: "{colors.error}"
    focusRing: "0 0 0 3px rgba(163, 59, 42, 0.16)"
  input-disabled:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    borderColor: "{colors.outline}"
  textarea:
    minHeight: 120px
    padding: 14px 18px
    rounded: "{rounded.md}"
  helper-text:
    typography: "{typography.helper}"
    textColor: "{colors.muted}"
  error-text:
    typography: "{typography.helper}"
    textColor: "{colors.error}"
  select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    placeholderColor: "{colors.secondary}"
    borderColor: "{colors.outline}"
    borderWidth: 1px
    rounded: "{rounded.md}"
    height: 52px
    padding: 0 48px 0 18px
    chevron: "1.5px stroke, {colors.secondary}, 16px; rotates 180deg when open"
  select-open:
    borderColor: "{colors.tertiary}"
    focusRing: "0 0 0 3px rgba(196, 106, 30, 0.18)"
  select-menu:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.outline}"
    borderWidth: 1px
    rounded: "{rounded.md}"
    padding: 6px
    offset: 8px
    maxHeight: 280px
    elevation: "0 12px 32px rgba(43, 30, 18, 0.10)"
  select-group-label:
    typography: "{typography.label}"
    textColor: "{colors.muted}"
    padding: 12px 14px 6px
  select-option:
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    height: 44px
    padding: 0 14px
    typography: "{typography.input}"
  select-option-hover:
    backgroundColor: "{colors.neutral}"
  select-option-selected:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    fontWeight: 600
    indicator: "check mark, 16px, {colors.tertiary}"
  select-option-disabled:
    textColor: "{colors.secondary}"
  checkbox:
    size: 20px
    rounded: 6px
    borderColor: "{colors.secondary}"
    backgroundColor: "{colors.surface}"
  checkbox-checked:
    backgroundColor: "{colors.primary}"
    borderColor: "{colors.primary}"
    markColor: "{colors.on-primary}"
  radio:
    size: 20px
    rounded: 999px
    borderColor: "{colors.secondary}"
    backgroundColor: "{colors.surface}"
  radio-checked:
    borderColor: "{colors.primary}"
    dotColor: "{colors.primary}"
    dotSize: 8px
---
## Overview

An artisan-bakery palette: flour-white surfaces, rye browns, crusty ember accent.

## Colors

The palette is built around high-contrast neutrals and a single accent that drives interaction.

- **Primary (`#2B1E12`):** Headlines and core text.
- **Secondary (`#9B8670`):** Borders, captions, and metadata.
- **Tertiary (`#C46A1E`):** The sole driver for interaction. Reserve it.
- **Neutral (`#F5EEDC`):** The page foundation.
- **Outline (`#DCCFB5`):** Hairline borders of fields and menus at rest. A quiet step darker than Neutral, never a visible "box".
- **Muted (`#6F5D49`):** Helper text and group labels. Secondary is too light for small text; Muted keeps it readable.
- **Error (`#A33B2A`):** A brick red used only for validation errors. It is a functional state color, not an accent.

## Typography

- **display:** Cormorant Garamond 5rem
- **h1:** Cormorant Garamond 2.5rem
- **body:** Lora 1.02rem
- **label:** Lora 0.74rem
- **input:** Lora 1rem. Field values and select options.
- **helper:** Lora 0.8rem. Hints and error messages under a field.

## Forms

Forms should feel like a quiet order slip at a bakery counter: generous space, hairline edges, no decoration.

- **Layout:** One column. Label above the field, helper or error text below. Fields are separated by 24px; related fields (such as first and last name) may share a row on wide screens.
- **Label:** Uppercase Lora 0.74rem with 0.12em tracking, in Primary. Always visible; never replace a label with a placeholder.
- **Field surface:** Surface fill on the Neutral page, 1px Outline border, 14px radius, 52px tall, 18px horizontal padding. Flat, with no inner shadow and no gradient.
- **States:**
  - *Hover:* border moves to Secondary.
  - *Focus:* border becomes Tertiary and a soft 3px ring at 18% Tertiary appears. This is the only moment a field uses the accent.
  - *Error:* border becomes Error, with an Error message in helper type below. Pair color with a text message, never color alone.
  - *Disabled:* Neutral fill, Secondary text, no hover response.
- **Placeholder:** Secondary color, used only for example input (such as "e.g. 25 pcs"), never for instructions.
- **Textarea:** Same treatment as input, minimum 120px tall, vertical resize only.
- **Checkbox and radio:** 20px, Secondary border at rest. When checked they fill with Primary (checkbox) or show a Primary dot (radio), so Tertiary stays reserved. Focus uses the same Tertiary ring.
- **Submit:** The form's one primary action uses `button-primary`. Secondary actions (cancel, back) are text-only in Primary.
- **Motion:** Border and ring transitions take 160ms with the standard easing. No bouncing, no scaling.

## Select and Options

The select looks identical to an input at rest, so a form reads as one family. The menu is the only floating element in the system.

- **Trigger:** Same size, border, and radius as input. The value is shown in Primary; the empty state shows a Secondary placeholder. A thin 1.5px chevron in Secondary sits 18px from the right edge and rotates 180° when open.
- **Open state:** The trigger takes the same Tertiary border and ring as input focus.
- **Menu:** Surface fill, 1px Outline border, 14px radius, 6px inner padding, and 8px below the trigger. It matches the trigger width and scrolls after 280px. A soft shadow (`0 12px 32px` at 10% Primary) is the only elevation allowed, because the menu floats above content; do not add shadows elsewhere.
- **Option:** 44px tall, 8px radius, 14px horizontal padding, in input type. The gap between options is zero; the inner padding of the menu supplies the breathing room.
- **Hover and keyboard focus:** Neutral background, text stays Primary.
- **Selected:** Neutral background, weight 600, and a 16px Tertiary check mark on the right. The check is a small marker, not a filled row.
- **Disabled option:** Secondary text, no hover, skipped by keyboard navigation.
- **Groups:** A group label uses label type in Muted, with a hairline Outline divider above every group after the first.
- **Search:** For lists longer than 8 options, show a search input at the top of the menu using the input style at 44px tall.
- **Keyboard and accessibility:** Arrow keys move the highlight, Enter selects, Escape closes and returns focus to the trigger, and typing jumps to a matching option. Use a native `<select>` on small touch screens when custom behaviour is not needed, styled with the same border, radius, and chevron.
- **Motion:** The menu fades and moves 4px down over 160ms. Closing is instant.

## Do's and Don'ts

- **Do** use Tertiary for exactly one action per screen.
- **Do** let Neutral carry the composition — negative space is a feature.
- **Don't** introduce gradients. This system is flat on purpose.
- **Don't** mix Tertiary with alternate accents; the single-accent rule is load-bearing.
- **Do** keep every field at 52px tall and every option at 44px so touch targets stay comfortable.
- **Do** show a text error message with every error border.
- **Do** limit Tertiary in forms to focus, the open select, the selected-option check, and the one submit button.
- **Don't** use filled or tinted backgrounds on fields at rest; the Surface fill and Outline hairline are the whole look.
- **Don't** use shadows on inputs, cards, or buttons. Only the open select menu floats.
- **Don't** use Error red for anything other than validation.