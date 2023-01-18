import './HomePage.scss'
import React from 'react';
import { AuthBar, QuickSearchBar } from 'src/components/common';
import { Canvas } from '@react-three/fiber'
import { Scene } from 'src/components/index';

export const HomePage: React.FC = () => {
  return (
    <div
      role="div"
      aria-label="home-page"
      className="home-page grid grid-cols-7">
      <div className="home-page__section home-page__section--model col-span-5">
        <Canvas shadows>
          <Scene />
        </Canvas>
      </div>

      <div className="home-page__section home-page__section--side-bar col-span-2">
        <AuthBar />
        <QuickSearchBar />
      </div>
    </div>
  );
};
