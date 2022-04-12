import Tooltip from "@mui/material/Tooltip";
import { TypographyProps } from "@mui/material/Typography";
import { useEffect, useRef, useState, VFC } from "react";
import useMeasureDirty from "react-use/lib/useMeasureDirty";
import Typography from "../Typography";

export interface LineClampProps extends TypographyProps {
  lines: number;
  disableTooltip?: boolean;
}

const LineClamp: VFC<LineClampProps> = ({
  sx,
  lines,
  children,
  disableTooltip,
  ...props
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { height } = useMeasureDirty(ref);
  const [isClamped, setClamped] = useState(false);
  useEffect(() => {
    const el = ref.current!;
    setClamped(el.scrollHeight > el.clientHeight);
  }, [height]);
  return (
    <Tooltip
      title={isClamped && children && !disableTooltip ? children : ""}
      ref={ref}
      enterDelay={800}
    >
      <Typography
        variant={"inherit"}
        {...props}
        ref={ref}
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: lines,
          WebkitBoxOrient: "vertical",
          textOverflow: "ellipsis",
          overflow: "hidden",
          wordBreak: "break-all",
          ...sx,
        }}
      >
        {children}
      </Typography>
    </Tooltip>
  );
};

export default LineClamp;
