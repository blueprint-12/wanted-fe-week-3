/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { useGithubContext } from "../contexts/GitHubProvider";

export default function Navbar() {
  const { organizationName, repositoryName } = useGithubContext();
  return (
    <>
      <nav css={navbarStyle}>
        <div className="title">
          <span className="organization-name">{organizationName}</span>
          <span className="repository-name">{repositoryName}</span>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

const navbarStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
  border-bottom: 2px solid black;

  .title {
    font-size: 2rem;
    font-weight: 600;
    display: flex;
    gap: 20px;

    & > span {
      color: #2c3e50;
    }
  }
`;
