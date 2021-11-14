/* istanbul ignore file */

import { Icon as Iconify, InlineIcon } from "@iconify/react";
import { SvgIcon } from "@mui/material";
import { ComponentProps, forwardRef, VFC } from "react";

export interface IconProps
  extends Omit<ComponentProps<typeof SvgIcon>, "children"> {
  /**
   * The icon from Iconify.
   */
  icon: object;
  /**
   * If the icon should be inline.
   */
  inline?: boolean;
}

/**
 * React wrapper for custom SVG icons.
 *
 * [Demo](https://pijama.majapi.com/?path=/docs/components-icon--icon)
 *
 * **Material UI**
 *
 * Demos:
 *
 * - [Icons](https://material-ui.com/components/icons/)
 * - [Material Icons](https://material-ui.com/components/material-icons/)
 *
 * API:
 *
 * - [SvgIcon API](https://material-ui.com/api/svg-icon/)
 */
const Icon: VFC<IconProps> = forwardRef(({ icon, inline, ...props }, ref) => (
  <SvgIcon
    ref={ref}
    component={(!inline ? Iconify : InlineIcon) as any}
    icon={icon}
    {...props}
  />
));

export default Icon;
