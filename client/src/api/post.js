import api from './index'

//post 게시글쓰기
export async function Dopost(data){
    const res = await api.post('/post/post',data)
    return res;
}
export async function getPosts(){
    const res = await api.get('/post/getpost');
    return res;
}
//게시물들 가져오기

//조회수 업데이트

//댓글 입력

//댓글 가져오기

//댓글 삭제

//댓글 수정

//최근 게시물 불러오기(랜딩페이지)

//게시물삭제

//게시물수정

//댓글 삭제
