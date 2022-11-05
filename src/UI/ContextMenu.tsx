import React from "react";
import s from "../css/ContextMenu.module.scss";
interface ContextMenuProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  [x: string]: any;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  title,
  ...rest
}) => {
  return (
    <div {...rest} className={s.menuWrapper}>
      {title ? <h5 className={s.menuWrapper_title}>{title} </h5> : null}
      {children}
    </div>
  );
};

export default ContextMenu;
