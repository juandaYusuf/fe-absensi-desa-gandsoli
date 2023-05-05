import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import RouterPageTransitions from './RouterPageTransitions';

const PageRouter = () => {

  return (
    <Router>
      <RouterPageTransitions />
    </Router>
  )
}

export default PageRouter