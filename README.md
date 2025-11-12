# Auto ADA Text Resizer

A hybrid Figma plugin for WCAG AA compliance: Automatically resizes selected text layers or all nested texts in a frame to 16px+ for better accessibility (ADA-friendly). Handles unloaded and mixed fonts without crashes.

![UI Screenshot](screenshots/ui.png)  

## Why This Plugin?
- **Problem:** 70% of websites fail WCAG font size checks (WebAIM 2025 report), leading to ADA fines ($75k+ in the US).
- **Solution:** One-click fix for designers — bulk resize in frames (for dashboards/components) or precise for selected texts.
- **Impact:** Helps 26% of Americans with disabilities (CDC data) by ensuring readable UI without zoom.
- Built for Figma in 1 hour with JS (Figma Plugin API). Open-source for UX community.

## Installation
1. **Figma Community:** [Install from Figma Community](https://www.figma.com/community/plugin/12345678-auto-ada-text-resizer)  
2. **Manual:**  
   - Clone repo: `git clone https://github.com/lleelleeth/auto-ada-text-resizer.git`  
   - `npm install`  
   - `npm run build`  
   - Import `manifest.json` in Figma (Plugins → Development → Import from manifest).

## Usage
1. **Open in Figma:** Plugins → Development → Auto ADA Text Resizer.
2. **Fix Selected Texts:** Select text layers → Click "Fix Selected Texts".  
   - Resizes only selected <16px to 16px.
3. **Scan & Fix Frame:** Select a frame → Click "Scan & Fix Frame".  
   - Recursively finds and fixes all nested texts <16px.
4. **Result:** Notification "Fixed X out of Y texts" + live count in UI.

![Before/After](screenshots/before-after.png) 

### Example
- Frame with 5 texts (3 <16px) → Scan → Fixed 3/5.

## Features
- **Hybrid Modes:** Selected (precise) or Frame (bulk).
- **Safe:** Loads fonts async, skips mixed fonts, no crashes.
- **WCAG AA:** Min 16px for body text (Success Criterion 1.4.4).
- **Lightweight:** 50 lines JS, no dependencies.

## Limitations
- Only text layers (not shapes/images).
- Min 16px — customize in code if needed.
- Figma Desktop only for dev.

## Contributing
- Fork, PR with improvements (e.g., contrast check).
- Issues: Report bugs or feature requests.

## License
MIT License — use freely!

## Author
[Lilit Papian] — UI/UX Designer from Russia. Contact: [mainlilbox@gmail.com].  

Made with ❤️ for accessible design. Stars/forks appreciated! ⭐
