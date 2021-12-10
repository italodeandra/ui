import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { ChangeEvent, useState, VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import FormLabel from "../FormLabel";
import Switch from "./Switch";

const SwitchDemo: VFC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <DemoTemplate title header={"Switch"}>
      <FormControl component="fieldset" variant="standard">
        <FormLabel>Is it checked?</FormLabel>
        <FormControlLabel
          control={<Switch />}
          label={checked ? "Yes" : "No"}
          checked={checked}
          name={"archived"}
          value={checked}
          onChange={({ target: { checked } }: ChangeEvent<HTMLInputElement>) =>
            setChecked(checked)
          }
        />
        {checked && <FormHelperText>Now it is checked</FormHelperText>}
      </FormControl>
    </DemoTemplate>
  );
};

export default SwitchDemo;
