const BANNER_IMAGE_BASE_PATH = 'https://hiketrack.github.io/hike-track-frontend/img/banner';

const getBannerImages = (name: string): string => {
  return `${BANNER_IMAGE_BASE_PATH}/${name}.png`;
};

export const getBannerImage1 = (): string => getBannerImages('banner-img-1');
export const getBannerImage2 = (): string => getBannerImages('banner-img-2');
export const getBannerImage3 = (): string => getBannerImages('banner-img-3');
