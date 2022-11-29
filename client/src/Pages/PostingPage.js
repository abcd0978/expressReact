import React, { useState } from 'react'
import { useEffect } from 'react';
import { Table } from 'antd'
import {Button} from 'antd';
import { FormOutlined } from '@ant-design/icons';
import {getPosts} from '../api/post'

function PostingPage() {

  const [rowdata, setRowdata] = useState([{author:"dsa", title:"Deawd", createdAt:"da"}]);

  useEffect(()=>{
    getPosts()
    .then(res=>{
      //console.log(res)
      const data = res.data.temp;
      setRowdata(data);
    })
  })

  const PostingPageStyle = {
    width: '75%',
    minWidth:"500px",
    margin: '3rem auto'
  }
  
  const columns = [
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '작성자',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '작성일',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];


  return (
    <div style={PostingPageStyle}>
        <Button>
          <FormOutlined/>
          <a href='/post'>
            <span>글쓰기</span>
          </a>
        </Button>

        <Table dataSource={rowdata} columns={columns}/>
    </div>
  )
}

export default PostingPage