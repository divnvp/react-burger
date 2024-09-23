import headerItemStyles from './header-item.module.css';
import React from 'react';

type Props = {
  title: string;
  children?: React.ReactNode;
  isActive?: boolean;
};

function HeaderItem(props: Props) {
  const classes = `p-2 ${headerItemStyles.headerItem}`;
  return (
    <div className={classes}>
      {props.children}
      <p
        className={`ml-2 ${props.isActive ? '' : 'text text_type_main-default text_color_inactive'}`}
      >
        {props.title}
      </p>
    </div>
  );
}

export default HeaderItem;
