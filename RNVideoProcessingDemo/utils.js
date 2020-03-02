export const resizeSize = (width, ratio) => {
  const height = Math.round(width / ratio);
  return {
    width,
    height,
  };
};

export const videoPreviewSize = size => {
  const MAX_WIDTH = 320;
  if (size.width > MAX_WIDTH) {
    return resizeSize(MAX_WIDTH, size.width / size.height);
  } else {
    return {
      width: size.width,
      height: size.height,
    };
  }
};

export const bytesToSize = bytes => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(
    Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)),
    10,
  );
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};
