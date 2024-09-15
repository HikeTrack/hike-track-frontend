const ICONS_BASE_PATH = './img/icons';

const getIcons = (name: string): string => {
  return `${ICONS_BASE_PATH}/${name}.svg`;
};

export const getLogoIcon = (): string => getIcons('logo');

export const getDifficultyGreenIcon = (): string => getIcons('difficultyGreen');
export const getDifficultyYellowIcon = (): string => getIcons('difficultyYellow');
export const getDifficultyRedIcon = (): string => getIcons('difficultyRed');

export const getGeoTagGreyIcon = (): string => getIcons('geoTagGrey');
export const getGeoTagGreenIcon = (): string => getIcons('geoTagGreen');

export const getDistanceIcon = (): string => getIcons('distance');
export const getDurationIcon = (): string => getIcons('duration');

export const getHeartWhiteIcon = (): string => getIcons('heartWhite');

export const getOnePercentIcon = (): string => getIcons('onePercent');
export const getTreeIcon = (): string => getIcons('tree');
export const getNoTraceIcon = (): string => getIcons('noTrace');

export const getInstagramIcon = (): string => getIcons('instagram');
export const getFacebookIcon = (): string => getIcons('facebook');
export const getYoutubeIcon = (): string => getIcons('youtube');

export const getSearchIcon = (): string => getIcons('search');
export const getWorldIcon = (): string => getIcons('world');
export const getEuropeIcon = (): string => getIcons('europe');
export const getAsiaIcon = (): string => getIcons('asia');
export const getSouthAmericaIcon = (): string => getIcons('southAmerica');
export const getAfricaIcon = (): string => getIcons('africa');
export const getNorthAmericaIcon = (): string => getIcons('northAmerica');

export const getArrowBackIcon = (): string => getIcons('arrowBack');
export const getCalendarIcon = (): string => getIcons('calendar');

export const getStarIcon = (): string => getIcons('star');
export const getBookmarkIcon = (): string => getIcons('bookmark');
export const getCameraIcon = (): string => getIcons('camera');
export const getCarIcon = (): string => getIcons('car');
export const getPrinterIcon = (): string => getIcons('printer');
export const getShareIcon = (): string => getIcons('share');
export const getArrowNextIcon = (): string => getIcons('arrowNext');
export const getThumbsUpIcon = (): string => getIcons('thumbsUp');
export const getShareSocialsIcon = (): string => getIcons('shareSocials');
