const thumbnailsCount = 20;

export const MockProjectThumbnails = Array.from({ length: thumbnailsCount }).map(
    (_, index) => `http://github.com/TarhunchiKKK/calypso/blob/main/assets/project-thumbnails/${index + 1}.svg`
);
