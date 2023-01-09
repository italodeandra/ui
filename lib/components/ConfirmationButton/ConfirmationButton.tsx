import Menu, { MenuProps } from "../Menu/Menu";
import { ReactNode } from "react";
import Button from "../Button/Button";

export type ConfirmationButtonProps = {
  confirmation: string;
  label: ReactNode;
  onConfirm: () => void;
  loading?: boolean;
  className?: string;
  cancel?: string;
  position?: MenuProps["position"];
};

export default function ConfirmationButton({
  label,
  confirmation,
  onConfirm,
  loading,
  className,
  cancel = "Cancel",
  position,
}: ConfirmationButtonProps) {
  return (
    <Menu
      position={position}
      button={
        <Button color="error" loading={loading} className={className}>
          {label}
        </Button>
      }
    >
      <Menu.Label>{confirmation}</Menu.Label>
      <Menu.Item className="!text-red-500" onClick={onConfirm}>
        {label}
      </Menu.Item>
      <Menu.Item>{cancel}</Menu.Item>
    </Menu>
  );
}
