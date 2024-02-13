module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-html/vue",
    "stylelint-config-rational-order",
  ],
  plugins: ["stylelint-order", "stylelint-config-rational-order/plugin"],
  rules: {
    "selector-class-pattern": null,
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "include",
          "layer",
        ],
      },
    ],
  },
};
