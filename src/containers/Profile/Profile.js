import React, { useState, useEffect } from "react";
import Link from "../../components/Link/Link";
import List from "../../components/List/List";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  width: 50%;
  margin: 10px auto;
`;

const Avatar = styled.img`
  width: 150px;
`;
const Profile = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const profile = await fetch(
          "https://api.github.com/users/robertrutenge"
        );
        const profileJSON = await profile.json();

        if (profileJSON) {
          const repositories = await fetch(profileJSON.repos_url);
          const repositoriesJSON = await repositories.json();

          setData(profileJSON);
          setIsLoading(false);
          setRepositories(repositoriesJSON);
          console.log(repositoriesJSON);
        }
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    }
    getProfile();
  }, []);

  const items = [
    {
      label: "html_url",
      value: <Link url={data.html_url} title="Github URL" />
    },
    { label: "repos_url", value: data.repos_url },
    { label: "name", value: data.name },
    { label: "company", value: data.company },
    { label: "location", value: data.location },
    { label: "email", value: data.email },
    { label: "bio", value: data.bio }
  ];

  const projects = repositories.map(repository => ({
    label: repository.name,
    value: <Link url={repository.html_url} title="Github URL" />
  }));

  return (
    <div>
      {isLoading && <p>Loading....</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && data && (
        <div>
          <ProfileWrapper>
            <Avatar
              className="Profile-avatar"
              src={data.avatar_url}
              alt="avatar"
            />

            <List items={items} title="Profile" />
            <List items={projects} title="Projects" />
          </ProfileWrapper>
        </div>
      )}
    </div>
  );
};

export default Profile;
