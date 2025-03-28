import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Grid2X2CheckIcon } from "lucide-react";

// Template options
export const TemplateStyles = {
  DEFAULT: "default",
  CLASSIC: "classic",
  MODERN: "modern",
  ELEGANT: "elegant",
  FORMAL: "formal",
  SLEEK: "sleek",
  EXECUTIVE: "executive",
  SHARP: "sharp",
  PROFESSIONAL: "professional",
  REFINED: "refined",
  FANCY: "fancy",
};

interface TemplateButtonProps {
  templateStyle: string | undefined;
  onChange: (templateStyle: string) => void;
}

export default function TemplateButton({
  templateStyle,
  onChange,
}: TemplateButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          title="Resume Templates"
          variant="outline"
          onClick={() => {}}
        >
          <Grid2X2CheckIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="border-none shadow-lg bg-secondary" align="end">
        <h1 className="font-bold">Templates</h1>
        <p className="text-xs text-muted-foreground">
          A great resume isn’t just about looking good, it’s about getting you
          hired.
        </p>
        <div className="grid grid-cols-2 gap-2 p-2">
          {Object.entries(TemplateStyles).map(([key, style]) => (
            <Button
              key={key}
              variant={templateStyle === style ? "default" : "outline"}
              onClick={() => onChange(style)}
              className="text-sm"
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
