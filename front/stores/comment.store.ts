export const useCommentStore = defineStore("comment", () => {
  const maxCommentLength = 150;

  return {
    maxCommentLength,
  };
});
