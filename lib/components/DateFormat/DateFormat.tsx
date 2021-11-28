import Box, { BoxProps } from "@mui/material/Box";
import { Fragment, memo, VFC } from "react";
import { default as formatDate } from "date-fns/format";

export interface DateFormatProps extends BoxProps {
  /**
   * The date to be formatted.bambo
   */
  date: string | number | Date | undefined;
  /**
   * The format to be formatted.
   * Pp = 03/22/1997, 7:50 PM
   * Reference: https://date-fns.org/v2.21.1/docs/format
   * @default Pp
   */
  format?: string;
  /**
   * Date Locale.
   */
  locale?: Locale;
}

/**
 * Format the date.
 *
 * [Demo](https://pijama.majapi.com/?path=/docs/components-dateformat--date-format)
 *
 * @example
 * <DateFormat date="2021-05-10T14:47:10.954Z" />
 */
const DateFormat: VFC<DateFormatProps> = memo(
  ({ date, format = "Pp", locale, ...props }) => {
    const Component = props.component ? Box : Fragment;
    if (!props.component) {
      props = {};
    }
    if (typeof date === "string") {
      date = new Date(date);
    }
    if (!date) {
      return null;
    }
    const isInvalid = isNaN(new Date(date).getTime());
    return (
      <Component {...props}>
        {isInvalid ? "Invalid date" : formatDate(date, format, { locale })}
      </Component>
    );
  }
);

export default DateFormat;
