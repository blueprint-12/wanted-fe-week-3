import React, { createContext, useState, useContext, ReactNode } from "react";
import { useMemo, useEffect } from "react";
import api from "../utils/api/customAxios";

interface GithubContextProps {
  organizationName: string;
  repositoryName: string;
  setOrganizationName: (name: string) => void;
  setRepositoryName: (name: string) => void;
}

const GithubContext = createContext<GithubContextProps | undefined>(undefined);

interface GithubProviderProps {
  children: ReactNode;
}

export const GithubProvider: React.FC<GithubProviderProps> = ({ children }) => {
  const [organizationName, setOrganizationName] = useState("organization");
  const [repositoryName, setRepositoryName] = useState("repository");
  const value = useMemo(
    () => ({
      organizationName,
      repositoryName,
      setOrganizationName,
      setRepositoryName,
    }),
    [organizationName, repositoryName, setOrganizationName, setRepositoryName]
  );

  const fetchData = async () => {
    try {
      const response = await api.get("facebook/react/issues");
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        const repositoryUrl = data[0].repository_url;
        const organization = repositoryUrl.split("/")[4];
        const repository = repositoryUrl.split("/")[5];

        setOrganizationName(organization);
        setRepositoryName(repository);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
  );
};

// github context hook
export const useGithubContext = (): GithubContextProps => {
  const context = useContext(GithubContext);
  if (!context) {
    throw new Error("useGithubContext must be used within a GithubProvider");
  }
  return context;
};
