---
bannerImage: Wallpaper Pin.jpg
date: 2026-01-07
---

# node-canvas registerFont() windows solution - custom fonts loading to canvas

https://github.com/Muhammed770 🖊️

There is a known issue since v2.10.2 ,the registerFont() is not working in windows.

The font register was used to load custom fonts to node-canvas.

Here is the actual way to load font to canvas using registerFont()

```tsx
const merri = path.join(fontsPath, 'Merriweather-Regular.ttf');
registerFont(merri, {
    family: 'AppMerriweather',
    weight: 'normal',
    style: 'normal',
});
```

This works for Mac, but not on windows.

so the solution is to 

1>  when app starts, copy the font files to AppData USER LOCATION in c folder

2> Using script, install and register the font

3> the registered fonts now will be available to all processes, that means when we create an instance of canvas using node-canvas, we will get the system installed font

Full Code for windows font Installation:

```tsx
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

// Windows font install locations and registry keys
const WINDOWS_FONTS_DIR = path.join(process.env.WINDIR || 'C:\\Windows', 'Fonts');

// Registry additions require admin to write to HKLM. We'll prefer per-user font install via shell API fallback:
// Strategy:
// 1) Copy TTF files to %WINDIR%\Fonts if we have permission; else fall back to %LOCALAPPDATA%\Fonts (Windows 10+ supports per-user fonts)
// 2) For per-user fonts, ensure directory exists and copy there
// 3) We cannot rename the internal font family from file; we have figured out the family names by powershell script
// Add-Type -AssemblyName System.Drawing
// (New-Object System.Drawing.Text.InstalledFontCollection).Families |
//   ForEach-Object { $_.Name } | Where-Object { $_ -match 'Merriweather' }

function ensureDirSync(dir: string) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyIfNeeded(src: string, destDir: string) {
    ensureDirSync(destDir);
    const dest = path.join(destDir, path.basename(src));
    try {
        if (fs.existsSync(dest)) {
            const srcStat = fs.statSync(src);
            const dstStat = fs.statSync(dest);
            if (srcStat.size === dstStat.size) return dest; // likely already installed
        }
        fs.copyFileSync(src, dest);
        return dest;
    } catch {
        return null;
    }
}

export type InstallResult = {
    installedTo: string[];
    skipped: string[];
    errors: string[];
    registry: string[];
};

export async function installWindowsFontsIfNeeded(fontsDir: string): Promise<InstallResult> {
    const result: InstallResult = { installedTo: [], skipped: [], errors: [], registry: [] };

    if (process.platform !== 'win32') {
        return result;
    }

    try {
        const candidates = [
            { file: 'Roboto-Regular.ttf', regName: 'Roboto (TrueType)' },
            { file: 'Merriweather-Regular.ttf', regName: 'Merriweather (TrueType)' },
            { file: 'RobotoMono-Regular.ttf', regName: 'Roboto Mono (TrueType)' },
        ];

        // Prefer per-user fonts directory when not elevated
        const perUserFontsDir = path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'), 'Microsoft', 'Windows', 'Fonts');

        for (const item of candidates) {
            try {
                const src = path.join(fontsDir, item.file);
                if (!fs.existsSync(src)) {
                    result.skipped.push(`${src} (missing)`);
                    continue;
                }

                // Try %WINDIR%\Fonts first
                let installedPath = copyIfNeeded(src, WINDOWS_FONTS_DIR);
                if (!installedPath) {
                    // Fallback to per-user fonts directory
                    installedPath = copyIfNeeded(src, perUserFontsDir);
                }

                if (installedPath) {
                    result.installedTo.push(installedPath);
                    // Add per-user registry entry so Windows treats as installed
                    try {
                        const regKey = 'HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Fonts';
                        // Use full path for per-user fonts registrations
                        execFileSync('reg', ['add', regKey, '/v', item.regName, '/t', 'REG_SZ', '/d', installedPath, '/f'], { stdio: 'ignore' });
                        result.registry.push(`${item.regName} -> ${installedPath}`);
                    } catch (e: any) {
                        result.errors.push(`Registry add failed for ${item.regName}: ${e?.message || String(e)}`);
                    }
                } else {
                    result.errors.push(`Failed to copy ${path.basename(src)} to Fonts directories`);
                }
            } catch (e: any) {
                result.errors.push(`${item.file}: ${e?.message || String(e)}`);
            }
        }
    } catch (e: any) {
        result.errors.push(e?.message || String(e));
    }

    return result;
}

```

for verification you may check whether the font is installed or not using 

1. ⊞ Win + R 
2. `shell:fonts`

This will display the installed fonts.

if you are installing single font files like the one above, you may not find the font family name of the file. You may check it by the below power shell command (replace the font name)

```jsx
Add-Type -AssemblyName System.Drawing
 (New-Object System.Drawing.Text.InstalledFontCollection).Families |
  ForEach-Object { $_.Name } | Where-Object { $_ -match 'Merriweather' }
```

`output: Merriweather 36pt 36pt`

so this font family you have to use in the canvas

```tsx
import { createCanvas } from 'canvas';

const canvas = createCanvas(0, 0); //no need to render to screen
const ctx = canvas.getContext('2d');

ctx.font= '20px 'Merriweather 36pt 36pt'';  //Place the Font family name inside ''
 
```

