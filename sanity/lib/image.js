import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'y5ygdyls';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const imageBuilder = imageUrlBuilder({
  projectId,
  dataset
});

export const urlForImage = (source) => {
  if (!source || !source.asset) return null;
  return imageBuilder.image(source);
};
