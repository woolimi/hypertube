export const useValidator = () => {
  const DEFAULT_MAX = 20;
  const DEFAULT_MIN = 2;

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

  const emailRule = (errorMessage: string) => {
    const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return (value: string) => (!regex.test(value) ? errorMessage : undefined);
  };

  const passwordRule = (errorMessage: string) => {
    const regex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}/;
    return (value: string) => (!regex.test(value) ? errorMessage : undefined);
  };

  const maxLengthRule = (errorMessage: string, maxLength?: number) => {
    return (value: string) =>
      value.length > (maxLength ?? DEFAULT_MAX) ? errorMessage : undefined;
  };

  const minLengthRule = (errorMessage: string, minLength?: number) => {
    return (value: string) =>
      value.length < (minLength ?? DEFAULT_MIN) ? errorMessage : undefined;
  };

  const requiredRule = (errorMessages: string) => {
    return (value: string) => (!value.length ? errorMessages : undefined);
  };

  return {
    validator,
    passwordRule,
    emailRule,
    maxLengthRule,
    minLengthRule,
    requiredRule,
    DEFAULT_MAX,
    DEFAULT_MIN,
  };
};
