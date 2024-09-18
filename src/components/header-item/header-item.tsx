import headerItemStyles from './header-item.module.css'
import React from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
}

function HeaderItem(props: Props) {
  const classes = `p-2 ${headerItemStyles.headerItem}`
  return (
    <div className={classes}>
      {props.children}
      <p className="ml-2">{props.title}</p>
    </div>
  )
}

export default HeaderItem
