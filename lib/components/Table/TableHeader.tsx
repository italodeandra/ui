import { ReactNode } from "react";
import Text from "../Text/Text";
import Stack from "../Stack/Stack";

export type TableHeaderProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
};

export default function TableHeader({
  title,
  subtitle,
  children,
}: TableHeaderProps) {
  return (
    <div className="px-4 md:px-0">
      <div className="sm:flex sm:items-center">
        {(title || subtitle) && (
          <Stack className="sm:flex-auto">
            {title && (
              <Text variant="label" size="lg">
                {title}
              </Text>
            )}
            {subtitle && <Text variant="secondary">{subtitle}</Text>}
          </Stack>
        )}
        {children && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">{children}</div>
        )}
      </div>
    </div>
  );
}
