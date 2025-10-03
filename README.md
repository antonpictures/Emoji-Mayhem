# Angry Words / Emoji Wars - Game Design Document

This document outlines the core concepts, gameplay mechanics, and future ideas for the game.

## Project Overview
A physics-based puzzle game where the player launches positive projectiles (words or emojis) to defeat negative forces. The game combines the satisfying destruction mechanics of games like Angry Birds with a unique theme.

---

## Future Vision: The Emoji Machine

Building upon the core slingshot mechanic, the game will evolve to incorporate complex, Rube Goldberg-style puzzles. Firing a projectile will be the catalyst that sets off an "Emoji Machine," a chain reaction of interacting objects designed to perform a simple task in a needlessly complex fashion.

**Concept:**
Each level becomes a unique puzzle where the goal is not just destruction, but triggering a specific outcome, such as "put the ⚽ into a 📦" or "start a mixer and turn on a 💨".

**Emoji-Based Physics Interactions:**
The world will be filled with a rich collection of emoji objects with unique physical properties and behaviors:
- **Simple Machines:** ⛓️ (ropes), ⚙️ (gears), and pulleys.
- **Physics Objects:** 🎳 (bowling balls), 🪨 (rocks), and other items with varying mass and momentum.
- **Interactive Pairs:** A 🐭 will run towards nearby 🧀, and a 🔦 placed next to a 🔍 will ignite a 💣 wick.
- **Living Emojis:** 🐈, 🐁, and 🧍 will have specific reactions to other objects and each other, creating dynamic and unpredictable chains.

**Gameplay & Level Design:**
- **Puzzle Solving:** Levels will feature a set of fixed objects. The player must solve the puzzle by strategically placing a limited set of movable objects to complete the chain reaction.
- **Level Editor & Freeform Mode:** A robust "freeform" sandbox mode will allow players to experiment with all available objects. This will also power a user-friendly level editor, enabling players to create their own Emoji Machine puzzles and share them with the community.

**Deterministic Physics Engine:**
Notably, the game's physics engine will simulate not only direct physical interactions but also ambient effects like varying air pressure and gravity. The engine will not use a random number generator, ensuring that the results for any given machine are deterministic and repeatable, which is crucial for fair and solvable puzzles.

---

## Core Gameplay Mechanics to Copy:
- **Simple one-touch/swipe controls** - Easy to learn, hard to master
- **Physics-based gameplay** - Satisfying destruction and trajectory mechanics
- **Short play sessions** - 30 seconds to 2 minutes per level
- **Clear objectives** - Destroy all enemies/targets to win
- **Star rating system** - 1-3 stars per level for replay value
- **Progressive difficulty** - Gradually increasing challenge

---

## Addictive Design Elements:
- **"Just one more level" progression** - Always show the next level
- **Power-ups and special abilities** - Unique character abilities
- **Combo/chain reactions** - Satisfying cascading destruction
- **$MPS competition** - Leaderboards and social sharing
- **Daily challenges** - Reasons to return daily
- **Achievement system** - Unlock rewards and bragging rights

---

## Character Design Using Default Emojis:
Here are universally available emojis Gemini can use for characters:

**Heroes/Projectiles:**
- 😡 (angry face) - Main angry character
- 😤 (huffing face) - Powered-up version  
- 🔥 (fire) - Fire-powered character
- ⚡ (lightning) - Electric/speed character
- 💥 (explosion) - Bomb character
- ⭐ (star) - Special/rare character

**Enemies/Targets:**
- 🐷 (pig) - Classic enemy
- 👹 (ogre) - Boss enemy
- 🤖 (robot) - Mechanical enemy
- 👾 (alien) - Space-themed enemy
- 🎯 (target) - Bullseye targets

**Environment/Objects:**
- 🧱 (brick) - Destructible walls
- 🪨 (rock) - Heavy obstacles  
- 🪶 (feather) - Light objects
- 💎 (diamond) - Collectible gems
- 🏰 (castle) - Structures to destroy

---

## Ideas for Gemini's Game:

**Theme Options:**
- "Emoji Wars" - Battle of expressions
- "Mood Google Maps" - Emotions vs obstacles
- "Symbol Smash" - Abstract emoji destruction

**Unique Mechanics:**
- **Emotion combos** - Match similar emoji moods for bonus damage
- **Weather effects** - ☀️🌧️❄️ change physics/gameplay
- **Day/night cycle** - 🌙☀️ Different challenges at different times
- **Seasonal events** - 🎃🎄🎆 Limited-time levels with special emojis

**Progression Hooks:**
- Unlock new emoji characters every few levels
- "Emoji collection" - Gotta catch 'em all mentality  
- Customize your launcher with different emoji styles
- Boss battles using big emojis like 🐉🦅🔱

**Social Features:**
- Share your high scores with emoji reactions
- Challenge friends with custom emoji level codes
- Weekly emoji tournaments

The key is making it **visually appealing with chunky, satisfying destruction**, **easy to pick up but hard to put down**, and giving players **constant small rewards** to keep them coming back!
---

## Visual Enhancements
1. Better Backgrounds & Environments

Add animated gradient backgrounds that change per level
Include parallax scrolling background elements (clouds, mountains, trees)
Add environmental decorations that match each level's theme

2. Enhanced Particle Effects

More dynamic explosion particles with realistic physics
Trail effects for projectiles
Impact ripple effects when projectiles hit the ground
Dust clouds and debris particles

3. Improved Slingshot Visual

Animated rubber band that stretches when aiming
Better slingshot model with wood texture and realistic proportions
Aiming trajectory visualization with dotted arc
Loading animation when pulling back

4. Better Entity Graphics

Add shadow effects under all entities
Implement wobble/bounce animations for enemies
Scale and rotation effects during impacts
Glowing outlines for special enemies

5. UI/HUD Improvements

Animated $MPS counters with pop effects
Progress bars with smooth animations
Better typography with game-appropriate fonts
Floating damage numbers and $MPS popups

6. Lighting & Atmosphere

Dynamic lighting effects from explosions
Ambient lighting that changes with level theme
Glow effects around special elements
Screen shake on big impacts

7. Smooth Animations

Easing functions for all movements
Anticipation and follow-through in animations
Smooth camera transitions between game states
Fluid UI transitions