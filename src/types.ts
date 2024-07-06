export type StoryNode = {
  id: string;
  type: "dialogue" | "decision";
  content?: { character: string; text: string }[];
  text?: string;
  choices?: {
    text: string;
    nextNode: string;
    relationshipEffects?: { [characterId: string]: number };
  }[];
  nextNode?: string;
};

export type Character = {
  id: string;
  name: string;
  relationshipPoints: number;
  thresholds: { friendship: number; romance: number; marriage: number };
  currentPose?: string;
};

export type Story = {
  nodes: StoryNode[];
  characters: Character[];
};
