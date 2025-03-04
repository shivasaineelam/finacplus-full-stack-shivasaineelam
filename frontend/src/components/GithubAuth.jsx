import React from 'react';
import axios from 'axios';
import { GithubLoginButton } from 'react-social-login-buttons';

const GitHubAuth = () => {
  const handleGitHubLogin = () => {
    const clientId = 'YOUR_GITHUB_CLIENT_ID';
    const redirectUri = 'http://localhost:3000/github-callback';  

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
  };

  return (
    <GithubLoginButton onClick={handleGitHubLogin} />
  );
};

export default GitHubAuth;
