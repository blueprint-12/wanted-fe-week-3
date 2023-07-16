import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { GithubProvider } from "../contexts/GitHubProvider";

const GeneralLayout = () => {
  return (
    <GithubProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </GithubProvider>
  );
};

export default GeneralLayout;
