import React from 'react';
import cn from 'classnames';
import weatherImage from '../images/404.png';

type Props = {
  error: string,
};

export const ErrorMessage:React.FC<Props> = ({ error }) => (
  <div className={cn('not-found', {
    'fadeIn': error
  })}>
      <img src={weatherImage} alt='error'/>
      <p>Oops! Invalid location :/</p>
  </div>
)
