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
      className="hover:bg-icon hover:text-black rounded-3xl disabled:bg-white disabled:text-black"
    >
      {icon}
    </Button>
  );

export default ToolButton