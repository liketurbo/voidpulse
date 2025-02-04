import React from "react";

interface FloatingMenuProps {
  style?: React.CSSProperties;
}

export const FloatingMenu: React.FC<
  React.PropsWithChildren<FloatingMenuProps>
> = ({ children, style }) => {
  return (
    <div
      className="p-2 ml-8 text-left bg-primary-800 border-primary-700 border rounded-lg shadow-xl "
      style={{ width: 200, ...style }}
    >
      {children}
    </div>
  );
};
