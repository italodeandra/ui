import Box from "@mui/material/Box";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ReactNode, VFC } from "react";
import CircularLoading from "../CircularLoading/CircularLoading";

export interface IBreadcrumb {
  id?: string;
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbsProps {
  breadcrumbs: IBreadcrumb[];
  loading?: boolean;
}

const Breadcrumbs: VFC<BreadcrumbsProps> = ({ breadcrumbs, loading }) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: 31,
        alignItems: "center",
      }}
    >
      <MuiBreadcrumbs separator="›">
        {breadcrumbs.map((breadcrumb) =>
          breadcrumb.href ? (
            <Link
              key={
                typeof breadcrumb.label === "string"
                  ? breadcrumb.label
                  : breadcrumb.id
              }
              href={breadcrumb.href}
              passHref
            >
              <MuiLink color="inherit" underline="hover">
                {breadcrumb.label}
              </MuiLink>
            </Link>
          ) : (
            <Typography
              key={
                typeof breadcrumb.label === "string"
                  ? breadcrumb.label
                  : breadcrumb.id
              }
              color="text.primary"
            >
              {breadcrumb.label}
            </Typography>
          )
        )}
      </MuiBreadcrumbs>
      {loading && (
        <CircularLoading size={14} sx={{ ml: 2 }} color={"inherit"} />
      )}
    </Box>
  );
};

export default Breadcrumbs;
