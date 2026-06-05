# 🪐 Stellar Words

A mobile-first word puzzle game with a space exploration theme, built as a single-file HTML/JS/CSS app — no frameworks, no build step.

## Overview

The player connects letters on a spinning orb to form hidden words, which then reveal themselves on a crossword-style grid. Planets serve as level chapters, each with its own theme, word set, and three challenge modes.

## Files

| File | Description |
|------|-------------|
| `words-game.html` | Core game prototype — letter wheel + crossword grid, single level |
| `space-words.html` | Full "Stellar Words" app — 4-tab iOS-style UI with planets, daily challenges, quests, and profile |

## Gameplay

- **Letter Wheel** — drag/swipe across circular letter nodes to spell words; lines draw between connected letters in real time
- **Crossword Grid** — required words are hidden in a crossword layout; each found word reveals its cells with an animation
- **Bonus Words** — extra valid words award coins but don't reveal grid cells
- **Hint** — costs 10 🪙, auto-selects and submits the next required word
- **Shuffle** — randomises letter positions on the wheel

## App Structure (`space-words.html`)

### Tabs

| Tab | Content |
|-----|---------|
| 🪐 **Planets** | Level map — planet cards with lock/unlock progression, star ratings, and per-planet challenges |
| 🌠 **Daily** | Streak tracker, daily challenge card with countdown timer, 7-day reward track, weekly activity grid |
| ⚡ **Quests** | Daily and weekly quest cards with progress bars and rewards (coins, gems, trophies) |
| 🧑‍🚀 **Profile** | Avatar, level/XP bar, stats grid, achievement shelf, settings |

### Planet Progression

```
Mercury → Venus → Earth (current) → Mars 🔒 → Jupiter 🔒 → Saturn 🔒
```

Each planet has 3 challenge modes unlocked after clearing the base level:

- **⚡ Speed Run** — complete within a time limit
- **🔥 Hard Mode** — no hints, stricter rules
- **⭐ Perfect** — find every word including bonuses

### Economy

- 🪙 **Coins** — awarded per letter in found words (5× word length), spent on hints
- 💎 **Gems** — rare rewards from daily challenges and weekly quests
- ⭐ **Stars** — 1–3 per level, tracked for quest objectives

## Tech

- Vanilla HTML/CSS/JS — zero dependencies, zero build tooling
- iOS 18-style glassmorphism UI (`backdrop-filter`, layered box-shadows)
- `<canvas>` animated star field
- CSS animations for orb glow, planet pulse, flame float, slot reveal
- Touch + mouse event parity on the letter wheel (drag-to-connect)
- Responsive: fills `100vw/dvh` on screens ≤ 420px

## Running

Open either `.html` file directly in any modern browser. No server required.

```bash
open space-words.html   # macOS
# or just double-click the file
```

## Status

Active prototype. Currently one playable level (Earth/Mercury/Venus unlocked in map; single word set in core engine). Planned: per-planet word sets, persistent save via localStorage, backend leaderboard.
