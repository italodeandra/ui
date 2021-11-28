module.exports = {
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "react/display-name": "off",
    "no-console": ["error", { allow: ["info", "error"] }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      { allowExpressions: true },
    ],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "lodash",
            message: "Please import from the first level.",
          },
        ],
        patterns: [
          {
            group: [
              "@mui/*/*/*",
              "!@mui/material/test-utils/*",
              "!@mui/material/styles/shadows",
            ],
            message: "Please import from the second level.",
          },
        ],
      },
    ],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      { "ts-ignore": "allow-with-description" },
    ],
  },
};
