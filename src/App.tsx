import React from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';

import {About} from './About';
import {NFTCollection} from './NFTCollection';
import {NFTCollections} from './NFTCollections';

export function App(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <>
      <Menu>
        <Menu.Item header onClick={() => navigate('/')}>
          Barnyard
        </Menu.Item>
        <Menu.Item onClick={() => navigate('/about')}>About</Menu.Item>
      </Menu>
      <Routes>
        <Route element={<NFTCollections />} path="/" />
        <Route element={<NFTCollection />} path="/collection/:name" />
        <Route element={<About />} path="/about" />
      </Routes>
    </>
  );
}
