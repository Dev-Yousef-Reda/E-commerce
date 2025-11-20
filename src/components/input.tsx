import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import TextareaAutosize from "react-textarea-autosize";

import { cn } from "_/lib/utils"; // Your path to the 'cn' utility

// --- Component Variants for the gradient border ---
const promptInputVariants = cva(
  "relative w-full overflow-hidden rounded-2xl p-px",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-green-300/80 via-cyan-300/80 to-indigo-400/80",
        magic: "bg-gradient-to-r from-rose-400/80 via-fuchsia-500/80 to-indigo-500/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// --- Prop Interface for type-safety and documentation ---
export interface PromptInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  VariantProps<typeof promptInputVariants> {
  onSubmit: () => void;
  /** A boolean to indicate if the component is in a loading state. */
  isLoading?: boolean;
}

/**
 * A comprehensive, theme-adaptive chat  input component with a dismissible
 * credit banner, a customizable action toolbar, and engaging animations.
 */
const PromptInput = React.forwardRef<HTMLTextAreaElement, PromptInputProps>(
  ({ className, variant, style, ...props }, ref) => {


    return (
      <div className={cn(promptInputVariants({ variant }), className)}>
        <div className="relative flex h-full w-scree flex-col rounded-[15px] bg-background">
          {/* Credits Banner with enter/exit animation */}
          <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
                >
              </motion.div>
          </AnimatePresence>

          {/* Main Input Area */}
          <div className="flex flex-col p-2 sm:p-4" style={style}>
            <TextareaAutosize
              ref={ref}
              className="w-full resize-none bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed"
              minRows={1}
              maxRows={80}
              {...props}
            />

          </div>
        </div>
      </div>
    );
  }
);
PromptInput.displayName = "PromptInput";

export { PromptInput };