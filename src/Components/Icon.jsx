import React from "react";

export default function Icon({
  visible = true,
  className,
  onClick,
  color,
  ...otherprops
}) {
  return (
    visible && <i className={className} onClick={onClick} style={{ color }} />
  );
}
