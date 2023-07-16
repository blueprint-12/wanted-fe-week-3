import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPostAsync } from "../../redux/slices/postSlice";
import { RootReducerType } from "../../redux/configStore";
import WantedAd from "../WantedAd";
import ReactMarkdown from "react-markdown";

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => void;

const MainPostList = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const pageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null, //뷰포트를 기준으로 교차 상태를 감지할 요소의 가시성
      rootMargin: "0px", //교차 상태를 감지할 요소 주위 마진
      threshold: 1 //얼마나 교차되어야 이벤트 발생
    };

    //인터섹션 옵저버 콜백 함수: 교차 상태가 변경될 때마다 실행, 교차 상태를 확인하고 동작 수행
    const handleObserver: IntersectionObserverCallback = entities => {
      const target = entities[0];
      if (target.isIntersecting) {
        setPage(prevPageCount => prevPageCount + 1); // 페이지 번호 증가
      }
    };

    //객체생성, 마지막요소 observe
    const observer = new IntersectionObserver(handleObserver, options);
    if (pageEndRef.current) {
      observer.observe(pageEndRef.current);
    }

    //컴포넌트가 언마운트될 때 옵저버 해제
    return () => {
      observer.disconnect();
    };
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      await dispatch(loadPostAsync(page) as any);
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [dispatch, page]);

  const { post_list } = useSelector((state: RootReducerType) => state.posts);

  return (
    <div>
      {isLoading ? (
        <div>Loading Posts </div>
      ) : (
        post_list.map((post, index) => {
          return (
            <div key={post.id}>
              <p>#{post.number}</p>
              <ReactMarkdown>{post.title}</ReactMarkdown>
              <p>작성자: {post.user.login}</p>
              <p>작성일: {post.created_at}</p>
              <p>코멘트 수: {post.comments}</p>
              {(index + 1) % 5 === 0 && <WantedAd />}
            </div>
          );
        })
      )}

      <div ref={pageEndRef} />
    </div>
  );
};

export default MainPostList;
