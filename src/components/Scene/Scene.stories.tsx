import ScenePlayer from "./ScenePlayer";
import { Scene } from "../../types";

export const mockStory: Scene = {
  initialBackground:
    "https://cdn.discordapp.com/attachments/1122370418783817771/1136018179026587838/idiot_a_green_prairie_background_with_tall_grass_and_some_hills_7711b042-fb0f-4827-a95b-487d88c3aa5f.png?ex=66b12860&is=66afd6e0&hm=e0da5abe5352fe404d8b7b04af462fc4cee5b0d61129722873b776658e5fd5b2&",
  nodes: [
    {
      id: "1",
      type: "dialogue",
      content: [
        {
          character: "Alice",
          text: "Hello there!",
          pose: "https://github.com/jpyrz/monco-assets/blob/main/assets/Character/marci-no-bg.png?raw=true",
          position: "center",
        },
      ],
      nextNode: "2",
    },
    {
      id: "2",
      type: "dialogue",
      content: [
        {
          character: "Alice",
          text: "My name is Alice. It's nice to meet you!",
          pose: "https://github.com/jpyrz/monco-assets/blob/main/assets/Character/marci-no-bg.png?raw=true",
          position: "center",
        },
      ],
      nextNode: "3",
    },
    {
      id: "3",
      type: "decision",
      content: [
        {
          character: "Alice",
          text: "Do you have a minute to help me out with something?",
          pose: "https://github.com/jpyrz/monco-assets/blob/main/assets/Character/marci-no-bg.png?raw=true",
          position: "center",
        },
      ],
      choices: [
        {
          text: "Sure, I'd love to help! What do you need?",
          nextNode: "4",
        },
        {
          text: "Sorry, I'm a bit busy right now.",
          nextNode: "5",
        },
        {
          text: "Sure, but what's in it for me?",
          nextNode: "4",
        },
      ],
    },
    {
      id: "4",
      type: "decision",
      content: [
        {
          character: "Alice",
          text: "Thank you so much! I need help finding my cat. I dropped a pan and he ran away. Can you help me find him?",
          pose: "https://github.com/jpyrz/monco-assets/blob/main/assets/Character/marci-no-bg.png?raw=true",
          position: "center",
        },
      ],
      choices: [
        {
          text: "Sure thing! What does he look like?",
          nextNode: "6",
        },
        {
          text: "Ew, no. Cats are gross.",
          nextNode: "7",
        },
      ],
      nextNode: undefined,
    },
    {
      id: "5",
      type: "dialogue",
      content: [
        {
          character: "Alice",
          text: "Oh, that's okay. Maybe another time.",
          pose: "https://github.com/jpyrz/monco-assets/blob/main/assets/Character/marci-no-bg.png?raw=true",
          position: "center",
        },
      ],
      nextNode: undefined,
    },
    {
      id: "6",
      type: "dialogue",
      content: [
        {
          character: "Alice",
          text: "Yay! He's a fluffy orange tabby. His name is Whiskers.",
          pose: "https://github.com/jpyrz/monco-assets/blob/main/assets/Character/marci-no-bg.png?raw=true",
          position: "center",
        },
      ],
      nextNode: undefined,
    },
    {
      id: "7",
      type: "dialogue",
      content: [
        {
          character: "Alice",
          text: "Fuck you, then.",
          pose: "https://github.com/jpyrz/monco-assets/blob/main/assets/Character/marci-no-bg.png?raw=true",
          position: "center",
        },
      ],
      nextNode: undefined,
    },
  ],
};

export const SceneData = {
  scene: {
    initialStory: mockStory,
    startNodeId: "1",
  },
};

export default {
  component: ScenePlayer,
  title: "Scene",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    ...SceneData,
  },
};
