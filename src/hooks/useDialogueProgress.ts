import { useEffect, useCallback } from "react";
import { StoryNode } from "../types";

export const useDialogueProgress = (
  getCurrentNode: () => StoryNode,
  progressToNextNode: (
    nextNodeId: string,
    relationshipEffects?: { [characterId: string]: number },
    poseChanges?: { [characterId: string]: string }
  ) => void,
  onNodeChange: (node: StoryNode) => void,
  selectedChoiceIndex: number = 0,
  triggerKey: string = "Space"
) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === triggerKey) {
        const currentNode = getCurrentNode();
        if (currentNode.type === "dialogue") {
          progressToNextNode(currentNode.nextNode!);
        } else if (
          currentNode.type === "decision" &&
          currentNode.choices &&
          currentNode.choices.length > 0
        ) {
          const choice = currentNode.choices[selectedChoiceIndex];
          progressToNextNode(choice.nextNode, choice.relationshipEffects);
        }
        onNodeChange(getCurrentNode());
      }
    },
    [
      getCurrentNode,
      progressToNextNode,
      onNodeChange,
      selectedChoiceIndex,
      triggerKey,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};
