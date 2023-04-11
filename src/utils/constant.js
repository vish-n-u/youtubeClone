export const getYoutubeData =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxWidth=40&regionCode=US&maxResults=50&key=AIzaSyCJZ67zUfAuhY4qDe8ZM_NpwoffdM8w8vs ";

export const comments =
  "https://youtube.googleapis.com/youtube/v3/comments?part=snippet&parentId=UgzDE2tasfmrYLyNkGt4AaABAg&key=AIzaSyCJZ67zUfAuhY4qDe8ZM_NpwoffdM8w8vs";

export function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
