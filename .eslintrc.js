// eslint-disable-next-line @typescript-eslint/no-var-requires
const eslintRc = require("@italodeandra/dev/.eslintrc");

const defaultNoRestrictedImportsRule = eslintRc.rules["no-restricted-imports"];

module.exports = {
  ...eslintRc,
  rules: {
    ...eslintRc.rules,
    "no-restricted-imports": [
      defaultNoRestrictedImportsRule[0],
      {
        ...defaultNoRestrictedImportsRule[1],
        paths: [
          defaultNoRestrictedImportsRule[1].paths[0],
          {
            name: "@mui/material",
            message: "Please import from the second level.",
          },
          {
            name: "react-use",
            message: 'Please import from the first level on "react-use/lib".',
          },
        ],
      },
    ],
  },
};
