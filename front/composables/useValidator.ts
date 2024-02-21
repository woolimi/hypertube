export const useValidator = () => {
  const validator = (
    dirty: ComputedRef<boolean>,
    value: ComputedRef<any>,
    rules: Array<(value: any) => string | undefined>,
  ) => {
    return {
      error: computed(() => {
        if (!dirty.value) return;
        for (const rule of rules) {
          const result = rule(value.value);
          if (result) return result;
        }
        return;
      }),
    };
  };

  return {
    validator,
  };
};
