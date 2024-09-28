const IMAGE_BASE_PATH = '/hike-track-frontend/img/page-images';

const getImages = (name: string): string => {
  return `${IMAGE_BASE_PATH}/${name}.png`;
};

export const getOurMissionImg = (): string => getImages('our-mission');

export const getStoriesImg1 = (): string => getImages('stories-1');
export const getStoriesImg2 = (): string => getImages('stories-2');
export const getStoriesImg3 = (): string => getImages('stories-3');
export const getStoriesImg4 = (): string => getImages('stories-4');

export const getMapImg = (): string => getImages('map-piece');
export const getUserImg = (): string => getImages('user-pic');
export const getUserContent1 = (): string => getImages('user-content-1');
export const getUserContent2 = (): string => getImages('user-content-2');
export const getUserContent3 = (): string => getImages('user-content-3');

const TEAM_IMAGE_BASE_PATH = '/hike-track-frontend/img/team/';

const getTeamImages = (code: string): string => {
  return `${TEAM_IMAGE_BASE_PATH}/team-${code}.png`;
};

export const getTeamImg1 = (): string => getTeamImages('1');
export const getTeamImg2 = (): string => getTeamImages('2');
export const getTeamImg3 = (): string => getTeamImages('3');
export const getTeamImg4 = (): string => getTeamImages('4');
export const getTeamImg5 = (): string => getTeamImages('5');
export const getTeamImg6 = (): string => getTeamImages('6');
export const getTeamImg7 = (): string => getTeamImages('7');
export const getTeamImg8 = (): string => getTeamImages('8');
export const getTeamImg9 = (): string => getTeamImages('9');
