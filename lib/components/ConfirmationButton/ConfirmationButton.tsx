import Menu, { MenuProps } from "../Menu/Menu";
import { ReactNode } from "react";
import Button, { ButtonProps } from "../Button/Button";

export type ConfirmationButtonProps = {
  confirmation: string;
  label: ReactNode;
  onConfirm: () => void;
  loading?: boolean;
  className?: string;
  cancel?: string;
  position?: MenuProps["position"];
  buttonClassName?: string;
  buttonProps?: ButtonProps<undefined>;
};

export default function ConfirmationButton({
  label,
  confirmation,
  onConfirm,
  loading,
  className,
  cancel = "Cancel",
  position,
  buttonClassName,
  buttonProps,
}: ConfirmationButtonProps) {
  return (
    <Menu
      position={position}
      button={
        <Button
          color="error"
          loading={loading}
          className={buttonClassName}
          {...buttonProps}
        >
          {label}
        </Button>
      }
      className={className}
    >
      <Menu.Label>{confirmation}</Menu.Label>
      <Menu.Item className="!text-red-500" onClick={onConfirm}>
        {label}
      </Menu.Item>
      <Menu.Item>{cancel}</Menu.Item>
    </Menu>
  );
}
