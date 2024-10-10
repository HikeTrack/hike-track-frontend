const ICONS_BASE_PATH = '/hike-track-frontend/img/icons';

const getIcons = (name: string): string => {
  return `${ICONS_BASE_PATH}/${name}.svg`;
};

export const getLogoIcon = (): string => getIcons('logo');
export const getMenuIcon = (isMenuOpen: boolean): string => {
  return getIcons(isMenuOpen ? 'close' : 'burgerMenu');
};
export const getCloseIcon = (): string => getIcons('close');

export const getDefaultAvatarIcon = (): string => getIcons('defaultAvatar');
export const getPencilIcon = (): string => getIcons('pencil');
export const getGoNextIcon = (): string => getIcons('goNext');

export const getRegistrationGoogleIcon = (): string => getIcons('registrationGoogle');
export const getRegistrationFacebookIcon = (): string => getIcons('registrationFacebook');
export const getRegistrationAppleIcon = (): string => getIcons('registrationApple');

export const getDifficultyGreenIcon = (): string => getIcons('difficultyGreen');
export const getDifficultyYellowIcon = (): string => getIcons('difficultyYellow');
export const getDifficultyRedIcon = (): string => getIcons('difficultyRed');

export const getGeoTagGreyIcon = (): string => getIcons('geoTagGrey');
export const getGeoTagGreenIcon = (): string => getIcons('geoTagGreen');

export const getDateIcon = (): string => getIcons('date');
export const getPriceIcon = (): string => getIcons('price');
export const getLengthIcon = (): string => getIcons('length');

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

export const getWorldGreenIcon = (): string => getIcons('worldGreen');
export const getEuropeGreenIcon = (): string => getIcons('europeGreen');
export const getAsiaGreenIcon = (): string => getIcons('asiaGreen');
export const getSouthAmericaGreenIcon = (): string => getIcons('southAmericaGreen');
export const getAfricaGreenIcon = (): string => getIcons('africaGreen');
export const getNorthAmericaGreenIcon = (): string => getIcons('northAmericaGreen');

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

export const getArrowLeftActiveIcon = (): string => getIcons('arrowLeftActive');
export const getArrowRightActiveIcon = (): string => getIcons('arrowRightActive');
export const getArrowLeftDisabledIcon = (): string => getIcons('arrowLeftDisabled');
export const getArrowRightDisabledIcon = (): string => getIcons('arrowRightDisabled');

export const getArrowLeftActiveGreenIcon = (): string => getIcons('arrowLeftActive-green');
export const getArrowRightActiveGreenIcon = (): string => getIcons('arrowRightActive-green');
export const getArrowLeftDisabledGreenIcon = (): string => getIcons('arrowLeftDisabled-green');
export const getArrowRightDisabledGreenIcon = (): string => getIcons('arrowRightDisabled-green');

export const getPrevMonthArrow = (): string => getIcons('prevMonthArrow');
export const getNextMonthArrow = (): string => getIcons('nextMonthArrow');