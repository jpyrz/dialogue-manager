import React from "react";
import { Character, Scene, SceneNode } from "../types";

export const useDialogueManager = (
  initialStory: Scene,
  startNodeId: string
) => {
  const [currentNodeId, setCurrentNodeId] = React.useState(startNodeId);

  const getCurrentNode = (): SceneNode => {
    const node = initialStory.nodes.find((n) => n.id === currentNodeId);
    if (!node) {
      throw new Error(`Node with ID ${currentNodeId} not found`);
    }
    return node;
  };

  const progressToNextNode = (nextNodeId: string) => {
    if (!nextNodeId) return;
    setCurrentNodeId(nextNodeId);
  };

  return {
    getCurrentNode,
    progressToNextNode,
  };
};
