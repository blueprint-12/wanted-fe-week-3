import api from "../../utils/api/customAxios";
import { Dispatch } from "redux";
import { FAIL, SUCCESS, PostType, PostDispatchType } from "./postActionTypes";
import { RootReducerType } from "../configStore";

//ActionCreator
// export function loadPost(post_list: PostType[]) {
//   return { type: LOAD, payload: post_list };
// }

// export function loadDetail(detail_post:  PostType) {
//   return { type: DETAIL, payload: detail_post };
// }

export const loadPostAsync =
  (pageCount = 1) =>
  async (
    dispatch: Dispatch<PostDispatchType>,
    getState: () => RootReducerType
  ) => {
    const { post_list } = getState().posts;

    //이전 value랑 같으면 return
    if (pageCount === post_list.length / 10) {
      return;
    }

    try {
      const res = await api.get(
        `/facebook/react/issues?sort=comments&per_page=10&page=${pageCount}`
      );
      const data = res.data;

      const post_list: PostType[] = data?.map((post: any) => {
        //TODO: 기존 Date객체로 만든 format을 한국식으로 바꾸기
        const createdAt = new Date(post.created_at);
        const formattedCreatedAt = `${createdAt.getFullYear()}년 ${
          createdAt.getMonth() + 1
        }월 ${createdAt.getDate()}일`;

        return {
          id: post.id,
          url: post.url,
          repository_url: post.repository_url,
          number: post.number,
          title: post.title,
          user: {
            login: post.user.login,
            avatar_url: post.user.avatar_url
          },
          comments: post.comments,
          created_at: formattedCreatedAt,
          body: post.body
        };
      });

      dispatch({
        type: SUCCESS,
        payload: {
          post_list
        }
      });
    } catch (error) {
      console.log("API error", error);
      dispatch({
        type: FAIL
      });
    }
  };

//reducer

interface InitialState {
  isSuccess: boolean;
  post_list: PostType[];
}

const initialState: InitialState = {
  isSuccess: false,
  post_list: []
};

const postReducer = (
  state = initialState,
  action: PostDispatchType
): InitialState => {
  switch (action.type) {
    case SUCCESS: {
      const { post_list } = action.payload;
      return {
        isSuccess: true,
        post_list: [...state.post_list, ...post_list]
      };
    }
    case FAIL: {
      return {
        ...state,
        isSuccess: false
      };
    }

    default:
      return state;
  }
};

export default postReducer;
