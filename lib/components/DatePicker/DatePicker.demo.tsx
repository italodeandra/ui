import Grid from "@mui/material/Grid";
import { useState, VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ptBRLocale from "date-fns/locale/pt-BR";
import DatePicker from "./DatePicker";

const DatePickerDemo: VFC = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <DemoTemplate title header={"Date picker"}>
      <Grid container spacing={1} direction={"row"}>
        <Grid item>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBRLocale}
          >
            <DatePicker
              label="Mês"
              value={value}
              onChange={(value) => setValue(value)}
              views={["year", "month"]}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </DemoTemplate>
  );
};

export default DatePickerDemo;
