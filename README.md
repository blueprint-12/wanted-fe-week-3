# 원티드 FE 인턴십 3주차 개인과제

특정 Github repository의 이슈 목록과 상세 내용을 확인하는 웹 사이트

> 팀원 개인이 각각 구현 후, best practice를 선정하여 하나의 프로젝트를 제출하는 그룹과제입니다.

[3주차 팀 프로젝트 repo ](https://github.com/blueprint-12/pre-onboarding-11th-3-8)

## 실행 방법

> ⚠ .env.example을 참고하여 최상위 폴더에 환경변수를 설정해주세요.

종속성 설치 및 dev모드 실행

```bash
yarn && yarn start
```

## 구현 기능

- `github REST api를 활용`하여 facebook repo의 이슈를 코멘트가 많은 순으로 정렬
  - 이슈들을 보여줄 때, 5번째마다 wanted 광고를 넣기
- `intersectionObserver` web API를 활용하여 무한스크롤 구현
- `Markdown 라이브러리`를 활용하여 issue의 상세페이지 보여주기
- `리덕스`와 `context API`를 활용한 전역 값 상태관리

## 공통 라이브러리

- 전역 상태 관리: `redux`
- CSS: `emotion`
- api client: `axios`
- 환경설정: `Typescript`, `CRA`

### 커밋 메시지 양식

- 작성 방법

```
[액션] 커밋 내용
```

- 액션

```
feat: 기능 추가, 삭제, 변경 (코드 수정)
fix: 버그 수정
type: 코드 형식 변경
design: UI 변경
refactor: 코드 리팩토링
docs: 코드 외 문서의 추가, 삭제, 변경
test: 테스트 코드 추가, 삭제, 변경
chore: 빌드 업무 수정, 패키지 매니저 수정
```
