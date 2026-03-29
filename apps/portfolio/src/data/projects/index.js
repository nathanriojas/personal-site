import { asteroids } from "./asteroids";
import { biaxial } from "./biaxial";
import { decisiontrees } from "./decisiontrees";
import { gait } from "./gait";
import { gem } from "./gem";
import { marsGlider } from "./mars-glider";
import { pid } from "./pid";
import { prosthetic } from "./prosthetic";
import { wafer } from "./wafer";

export const projects = [
  asteroids,
  biaxial,
  decisiontrees,
  gait,
  gem,
  marsGlider,
  pid,
  prosthetic,
  wafer,
];

export const projectMap = Object.fromEntries(
  projects.map(p => [p.slug, p])
);