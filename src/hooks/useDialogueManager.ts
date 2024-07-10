import React from "react";
import { Character, Story, StoryNode } from "../types";

export const useDialogueManager = (
  initialStory: Story,
  startNodeId: string
) => {
  const [story, setStory] = React.useState(initialStory);
  const [currentNodeId, setCurrentNodeId] = React.useState(startNodeId);

  const getCurrentNode = (): StoryNode => {
    const node = story.nodes.find((n) => n.id === currentNodeId);
    if (!node) {
      throw new Error(`Node with ID ${currentNodeId} not found`);
    }
    return node;
  };

  const progressToNextNode = (
    nextNodeId: string,
    relationshipEffects?: { [characterId: string]: number },
    poseChanges?: { [characterId: string]: string }
  ) => {
    if (!nextNodeId) return;

    setCurrentNodeId(nextNodeId);
    setStory((prevStory) => {
      let updatedCharacters = prevStory.characters;

      if (relationshipEffects) {
        updatedCharacters = applyRelationshipEffects(
          updatedCharacters,
          relationshipEffects
        );
      }

      if (poseChanges) {
        updatedCharacters = applyPoseChanges(updatedCharacters, poseChanges);
      }

      return { ...prevStory, characters: updatedCharacters };
    });
  };

  const applyRelationshipEffects = (
    characters: Character[],
    effects: { [characterId: string]: number }
  ): Character[] => {
    return characters.map((character) => {
      const effect = effects[character.id];
      if (effect !== undefined) {
        return {
          ...character,
          relationshipPoints: character.relationshipPoints + effect,
        };
      }
      return character;
    });
  };

  const applyPoseChanges = (
    characters: Character[],
    poseChanges: { [characterId: string]: string }
  ): Character[] => {
    return characters.map((character) => {
      const newPose = poseChanges[character.id];
      if (newPose !== undefined) {
        return { ...character, currentPose: newPose };
      }
      return character;
    });
  };

  const getCharacterRelationshipStage = (characterId: string): string => {
    const character = story.characters.find((c) => c.id === characterId);
    if (!character) {
      throw new Error(`Character with ID ${characterId} not found`);
    }

    const { relationshipPoints, thresholds } = character;
    if (relationshipPoints >= thresholds.marriage) {
      return "marriage";
    } else if (relationshipPoints >= thresholds.romance) {
      return "romance";
    } else if (relationshipPoints >= thresholds.friendship) {
      return "friendship";
    } else {
      return "neutral";
    }
  };

  return {
    getCurrentNode,
    progressToNextNode,
    getCharacterRelationshipStage,
  };
};
