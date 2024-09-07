import React from "react";
import { SceneNode } from "../types";

export const useDialogueProgress = (
  getCurrentNode: () => SceneNode,
  progressToNextNode: (nextNodeId: string) => void,
  onNodeChange: (node: SceneNode) => void,
  selectedChoiceIndex: number = 0,
  triggerKey: string = "Space"
) => {
  const progress = React.useCallback(() => {
    const currentNode = getCurrentNode();
    if (currentNode.type === "dialogue" && currentNode.nextNode) {
      progressToNextNode(currentNode.nextNode!);
    } else if (
      currentNode.type === "decision" &&
      currentNode.choices &&
      currentNode.choices.length > 0
    ) {
      const choice = currentNode.choices[selectedChoiceIndex];
      if (choice && choice.nextNode) {
        progressToNextNode(choice.nextNode);
      }
    }
    onNodeChange(getCurrentNode());
  }, [getCurrentNode, progressToNextNode, onNodeChange, selectedChoiceIndex]);

  const handleKeyPress = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.code === triggerKey) {
        progress();
      }
    },
    [progress, triggerKey]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return { progress };
};
