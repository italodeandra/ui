/* istanbul ignore file */

import * as React from "react";
import { forwardRef, ReactElement } from "react";
import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from "@mui/x-date-pickers";
import IconButton from "../IconButton";
import Icon from "../Icon";
import calendarIcon from "@iconify/icons-heroicons-outline/calendar";
import TextField from "../TextField";
import { TextFieldProps as MuiTextFieldPropsType } from "@mui/material/TextField";

export interface DateTimePickerProps<TInputDate, TDate>
  extends Omit<MuiDateTimePickerProps<TInputDate, TDate>, "renderInput"> {
  renderInput?: (props: MuiTextFieldPropsType) => ReactElement;
}

declare type DatePickerComponent = (<TInputDate, TDate = TInputDate>(
  props: DateTimePickerProps<TInputDate, TDate> &
    React.RefAttributes<HTMLDivElement>
) => JSX.Element) & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propTypes?: any;
};

const DateTimePicker: DatePickerComponent = forwardRef(
  ({ renderInput, ...props }, ref) => (
    <MuiDateTimePicker
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

export default DateTimePicker;
