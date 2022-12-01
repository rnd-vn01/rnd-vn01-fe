import './HomePage.scss'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export const HomePage: React.FC = () => {
  return (
    <div
      role="div"
      aria-label="homepage"
      className="homepage">
      R&D - VN01
    </div >
  );
};
