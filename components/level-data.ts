import { Level } from '../types';

// Chapter 2: People & Body
import { level7 } from './levels/2-people-body/7-ninja-dojo';
import { level13 } from './levels/2-people-body/13-pirate-treasure';

// Chapter 3: Animals & Nature
import { level6 } from './levels/3-animals-nature/6-wild-safari';
import { level10 } from './levels/3-animals-nature/10-dinosaur-valley';
import { level12 } from './levels/3-animals-nature/12-winter-wonderland';
import { level14 } from './levels/3-animals-nature/14-flower-power';
import { level16 } from './levels/3-animals-nature/16-forest-frogs';
import { level26 } from './levels/3-animals-nature/26-a-year-in-a-day';

// Chapter 4: Food & Drink
import { level3 } from './levels/4-food-drink/3-food-fight-frenzy';
import { level8 } from './levels/4-food-drink/8-candy-crush';
import { level11 } from './levels/4-food-drink/11-fruit-ninja';

// Chapter 5: Travel & Places
import { level1 } from './levels/5-travel-places/1-moon-bounce-mania';
import { level2 } from './levels/5-travel-places/2-spooky-bounce-castle';
import { level4 } from './levels/5-travel-places/4-ocean-chaos';
import { level5 } from './levels/5-travel-places/5-space-madness';

// Chapter 6: Activities
import { level15 } from './levels/6-activities/15-sports-arena';
import { level17 } from './levels/6-activities/17-musical-mayhem';
import { level19 } from './levels/6-activities/19-sports-champions';

// Chapter 7: Objects
import { level9 } from './levels/7-objects/9-robot-uprising';
import { level18 } from './levels/7-objects/18-digital-dungeon';
import { level21 } from './levels/7-objects/21-movie-magic';
import { level22 } from './levels/7-objects/22-library-of-legends';
import { level23 } from './levels/7-objects/23-money-mountain';
import { level24 } from './levels/7-objects/24-science-lab';
import { level25 } from './levels/7-objects/25-medical-mission';


// Chapter 9: Flags
import { level20 } from './levels/9-flags/20-flag-frenzy';

const allLevels: Level[] = [
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
  level10,
  level11,
  level12,
  level13,
  level14,
  level15,
  level16,
  level17,
  level18,
  level19,
  level20,
  level21,
  level22,
  level23,
  level24,
  level25,
  level26,
];

// Sort by ID to ensure correct order for level select screen and "next level" logic
export const LEVELS_DATA: Level[] = allLevels.sort((a, b) => a.id - b.id);