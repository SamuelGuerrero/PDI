import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import classNames from 'classnames';

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant: 'primary' | 'secondary';
};

export const Button = (props: ButtonProps) => {
  const { variant, children, ...rest } = props;

  const btnStyle = classNames(
    '',
    variant === 'primary'
      ? 'bg-rojo/80 hover:bg-rojo text-white font-bold py-2 px-4 rounded h-11 w-36 cursor-pointer'
      : null,
  );


  return (
    <button {...rest} className={btnStyle}>
      {children}
    </button>
  );
};
