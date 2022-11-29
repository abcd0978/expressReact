import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useState } from 'react'
import { Input } from 'antd';
import {Button} from 'antd';
import { Dopost } from '../../api/post';
import './PostPage.css'


function PostPage() {
  

  const [values, setContent] = useState({
    title: '' ,
    description: '',
  })
    
  const getValue = e => { // 입력물 확인
    const { name, value} = e.target;
    setContent({
      ...values,
      [name]: value
    })
  };
  
  const onSubmit=()=>{
    Dopost(values).
    then(res=>{
      if(res.data.success){
        alert('작성 되었습니다.')
        window.location.replace('/postings')
      }
    });
  }

  return (
    <div className='PostPage'>

    <div className='titleInput'>
      <h1>제목</h1>
      <Input name = 'title' onChange={getValue} placeholder="제목을 입력해주세요"/>
    </div>

      <h1>내용작성</h1>
      <CKEditor  //CKEditor 내용작성
          className='editor'
            editor={ClassicEditor}
            data = {'<p></p>'}
            onReady={editor => {
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent({
                ...values,
                description: data
              })
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
          <Button className='postButton' type="primary" onClick={onSubmit}>
            작성완료!
          </Button>
    </div>
  )
}

export default PostPage