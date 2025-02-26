import { Tutorial } from "./tutorial";

export interface Video {
  id: number;
  title: string;
  path: string;
  tutorialId: number;
  tutorial?: Tutorial;
}
