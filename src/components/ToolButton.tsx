import { Button } from "./ui/button";

const ToolButton = ({
    icon,
    onClick,
    disabled,
    label,
  }: {
    icon: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    label: string;
  }) => (
    <Button
      size="icon"
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {icon}
    </Button>
  );

export default ToolButton