import { CSSProperties } from "react";

declare module "@mui/material/Button/Button" {
  // noinspection JSUnusedGlobalSymbols
  interface ButtonPropsColorOverrides {
    coolGray: true;
    lightGray: true;
    gray: true;
  }
}

declare module "@mui/material/IconButton/IconButton" {
  // noinspection JSUnusedGlobalSymbols
  interface IconButtonPropsColorOverrides {
    coolGray: true;
    lightGray: true;
    gray: true;
  }
}

declare module "@mui/material/Typography/Typography" {
  // noinspection JSUnusedGlobalSymbols
  interface TypographyPropsVariantOverrides {
    codeBlock: true;
    code: true;
  }
}

declare module "@mui/material/styles" {
  // noinspection JSUnusedGlobalSymbols
  interface Palette {
    coolGray: Palette["primary"];
    lightGray: Palette["primary"];
    gray: Palette["primary"];
  }

  // noinspection JSUnusedGlobalSymbols
  interface PaletteOptions {
    coolGray?: PaletteOptions["primary"];
    lightGray?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
  }

  // noinspection JSUnusedGlobalSymbols
  interface TypographyVariants {
    codeBlock: CSSProperties;
  }

  // noinspection JSUnusedGlobalSymbols
  interface TypographyVariantsOptions {
    codeBlock?: CSSProperties;
  }
}
