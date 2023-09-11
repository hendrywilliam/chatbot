import * as React from "react";

interface ChatAnchorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ChatAnchor = React.forwardRef<HTMLDivElement, ChatAnchorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={className} {...props} ref={ref}>
        {children}
      </div>
    );
  }
);

ChatAnchor.displayName = "ChatAnchor";
