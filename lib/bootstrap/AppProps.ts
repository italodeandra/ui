import { AppProps as NAppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next/dist/shared/lib/utils";
import { ReactNode } from "react";

type AppProps = Omit<NAppProps, "Component"> & {
  Component: NextComponentType<NextPageContext, any, any> & {
    getLayout: (children: ReactNode) => ReactNode;
  };
};

export default AppProps;
