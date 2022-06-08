/* istanbul ignore file */

import * as React from "react";
import { forwardRef, ReactElement } from "react";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers";
import IconButton from "../IconButton";
import Icon from "../Icon";
import calendarIcon from "@iconify/icons-heroicons-outline/calendar";
import TextField from "../TextField";
import { TextFieldProps as MuiTextFieldPropsType } from "@mui/material/TextField";

export interface DatePickerProps<TInputDate, TDate>
  extends Omit<MuiDatePickerProps<TInputDate, TDate>, "renderInput"> {
  renderInput?: (props: MuiTextFieldPropsType) => ReactElement;
}

declare type DatePickerComponent = (<TInputDate, TDate = TInputDate>(
  props: DatePickerProps<TInputDate, TDate> &
    React.RefAttributes<HTMLDivElement>
) => JSX.Element) & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propTypes?: any;
};

const DatePicker: DatePickerComponent = forwardRef(
  ({ renderInput, ...props }, ref) => (
    <MuiDatePicker
      ref={ref}
      {...props}
      renderInput={(params) => {
        if (params.InputProps?.endAdornment) {
          const onClick = (params.InputProps.endAdornment as ReactElement).props
            .children.props.onClick;
          params.InputProps.endAdornment = (
            <IconButton onClick={onClick}>
              <Icon icon={calendarIcon} />
            </IconButton>
          );
        }
        if (renderInput) {
          return renderInput(params);
        }
        return <TextField {...params} fullWidth />;
      }}
    />
  )
);

export default DatePicker;
