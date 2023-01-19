import './HomeTitle.scss';
import React from 'react';
import { APP_NAME } from 'src/configs/constants';

export const HomeTitle: React.FC = ({ }) => {
  return (
    <div
      role="div"
      aria-label="home-title"
      className="home-title flex flex-col justify-center items-center">
      <p className="home-title__title--sub">welcome to</p>

      <h1 className="home-title__title--main">{APP_NAME.toUpperCase()}</h1>

      <p className="home-title__title--project-name">3D Acupuncture Healthcare Data Management And Treatment System</p>

      <p className="home-title__title--instruction">interact with the model to start</p>
    </div>
  );
};
