// 비동기_성공/실패 여부
export const SUCCESS = "post/success";
export const FAIL = "post/FAIL";

// export const LOAD = "post/LOAD";
// export const DETAIL = "post/DETAIL";

//url 주소로 api 넘기면 아마 해당 자료 나올 듯
//id: 고유값
//number: 이슈 넘버
//user.login 은 유저이름입니다.
//avatar_url: 유저 이미지
//commnets : 코멘트 수
//created_at 은 언제 생성됐는 지 시간
//body: 본문 내용 근데 md임

export type PostType = {
  id: number;
  url: string;
  repository_url: string;
  number: number;
  title: string;
  user: UserType;
  comments: number;
  created_at: string;
  body: string;
};

export type UserType = {
  login: string;
  avatar_url: string;
};
export interface PostSuccessDispatch {
  type: typeof SUCCESS;
  payload: {
    post_list: PostType[];
  };
}

export interface PostFailDispatch {
  type: typeof FAIL;
}

export type PostDispatchType = PostSuccessDispatch | PostFailDispatch;
