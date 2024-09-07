import React, { useState, useEffect } from "react";
import { useDialogueManager } from "../../hooks/useDialogueManager";
import { Scene, SceneNode } from "../../types";
import "./ScenePlayer.css"; // Assuming you are using CSS modules or a similar approach

export type SceneProps = {
  scene: {
    initialStory: Scene;
    startNodeId: string;
  };
};

const ScenePlayer = ({ scene }: SceneProps) => {
  const { initialStory, startNodeId } = scene;
  const { getCurrentNode, progressToNextNode } = useDialogueManager(
    initialStory,
    startNodeId
  );

  const [background, setBackground] = useState(initialStory.initialBackground);
  const currentNode: SceneNode = getCurrentNode();

  useEffect(() => {
    if (currentNode.background) {
      setBackground(currentNode.background);
    }
  }, [currentNode]);

  const handleNextNode = (nextNodeId: string | undefined) => {
    if (!nextNodeId) {
      return;
    }
    progressToNextNode(nextNodeId);
  };

  return (
    <div
      className="scene-player"
      style={{ backgroundImage: `url(${background})` }}
    >
      {currentNode.content?.map((dialogue, index) => (
        <img
          key={`${dialogue.character}-${dialogue.pose}-${index}`}
          className={`character-image ${dialogue.position}`}
          src={dialogue.pose}
          alt={`${dialogue.character} pose`}
        />
      ))}
      <div className="dialogue-box">
        {currentNode.type === "dialogue" && (
          <div>
            {currentNode.content?.map((dialogue, index) => (
              <div key={index} className="dialogue-content">
                <div className="character-name">{dialogue.character}</div>
                <div className="character-dialogue">{dialogue.text}</div>
              </div>
            ))}
            {currentNode.nextNode && (
              <div
                className="continue-indicator"
                onClick={() => handleNextNode(currentNode.nextNode)}
              >
                ▶
              </div>
            )}
          </div>
        )}
        {currentNode.type === "decision" && (
          <div>
            {currentNode.content?.map((dialogue, index) => (
              <div key={index} className="dialogue-content">
                <div className="character-name">{dialogue.character}</div>
                <div className="character-dialogue">{dialogue.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {currentNode.type === "decision" && (
        <div className="choices">
          {currentNode.choices?.map((choice, index) => (
            <button
              key={index}
              className="choice-button"
              onClick={() => handleNextNode(choice.nextNode)}
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScenePlayer;
