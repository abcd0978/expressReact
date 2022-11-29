import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
  <Menu mode={props.mode}>

    <Menu.Item>
      <a href="/postings">게시글</a>
    </Menu.Item>


  </Menu>
  )
}

export default LeftMenu