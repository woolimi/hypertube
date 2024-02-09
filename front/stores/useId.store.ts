export const useIdStore = defineStore("id", () => {
  const idGenerator = (function* () {
    let i = 1;
    while (true) {
      yield `ht-id-${i++}`;
    }
  })();

  const get = () => {
    return idGenerator.next().value;
  };

  return {
    get,
  };
});
