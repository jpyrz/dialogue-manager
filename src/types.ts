export type SceneNode = {
  id: string;
  type: "dialogue" | "decision";
  background?: string;
  content?: {
    character: string;
    text: string;
    pose: string;
    position: "left" | "right" | "center";
  }[];
  choices?: {
    text: string;
    nextNode: string;
  }[];
  nextNode?: string;
};

export type Character = {
  id: string;
  name: string;
  relationshipPoints: number;
  thresholds: { friendship: number; romance: number; marriage: number };
};

export type Scene = {
  nodes: SceneNode[];
  initialBackground: string;
};
