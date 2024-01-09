import Menu, { MenuProps } from "../Menu/Menu";
import { ReactNode } from "react";
import Button, { ButtonProps } from "../Button";

export type ConfirmationButtonProps = {
  confirmation: string;
  label: ReactNode;
  confirm?: string;
  onConfirm: () => void;
  loading?: boolean;
  className?: string;
  cancel?: string;
  position?: MenuProps["position"];
  buttonClassName?: string;
  buttonProps?: Partial<ButtonProps>;
  menuProps?: Partial<MenuProps>;
};

export default function ConfirmationButton({
  label,
  confirm,
  confirmation,
  onConfirm,
  loading,
  className,
  cancel = "Cancel",
  position,
  buttonClassName,
  buttonProps,
  menuProps,
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
      {...menuProps}
    >
      <Menu.Label>{confirmation}</Menu.Label>
      <Menu.Item className="!text-red-500" onClick={onConfirm}>
        {confirm || label}
      </Menu.Item>
      <Menu.Item>{cancel}</Menu.Item>
    </Menu>
  );
}
