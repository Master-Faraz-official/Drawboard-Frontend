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
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="bg-icon hover:bg-slate-300 rounded-3xl"
    >
      {icon}
    </Button>
  );

export default ToolButton