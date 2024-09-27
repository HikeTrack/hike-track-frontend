import { getStoriesImg1, getStoriesImg2, getStoriesImg3, getStoriesImg4 } from "./getImages";

export const storyCards = [
  {
    id: 1,
    image: getStoriesImg1(),
    date: 'August 03, 2018',
    title: 'Sunrise at the Summit of the Carpathians',
    description: 'It was an incredible moment when we reached the summit and saw the sun slowly setting below the horizon, bathing everything around us in golden light. The fatigue from the long ascent instantly vanished, giving way to a feeling of freedom and awe at the beauty of nature. This sunrise will forever be remembered as a symbol of reaching new heights.'
  },
  {
    id: 2,
    image: getStoriesImg2(),
    date: 'October 12, 2020',
    title: 'Forest Trail in the Morning Fog',
    description: 'This journey felt like a real fairy tale—thick fog enveloped the trees as we moved along a narrow path, feeling like characters in a movie. Every step brought new discoveries, and we savored every moment. In times like these, you realize that nature is always ready to surprise and inspire.'
  },
  {
    id: 3,
    image: getStoriesImg3(),
    date: 'June 22, 2019',
    title: 'Friendly Meeting at the Summit of Hoverla',
    description: 'One of the warmest moments of our hikes was meeting other travelers at the summit. Sharing impressions and smiles, we realized that the love for mountains unites people from all walks of life. This journey reminded us of the importance of supporting one another and sharing the joy of achievements.'
  },
  {
    id: 4,
    image: getStoriesImg4(),
    date: 'July 10, 2021',
    title: 'Hike Along Lake Synevyr',
    description: 'Our route took us along the picturesque Lake Synevyr, and we couldn’t take our eyes off its crystal-clear water. The silence, fresh air, and the calm surface of the lake created a sense of harmony and tranquility. This journey helped us find inner balance and truly enjoy the present moment.'
  }
];
