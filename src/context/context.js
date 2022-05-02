import React, { useState, useEffect } from "react"
import mockUser from "./mockData.js/mockUser"
import mockRepos from "./mockData.js/mockRepos"
import mockFollowers from "./mockData.js/mockFollowers"
import axios from "axios"

const rootUrl = "https://api.github.com"

const GithubContext = React.createContext()

//we have access to Provider and Consumer

const GitHubProvider = ({ children }) => {
  const [gitHubUser, setGitHubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  const [requests, setRequests] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  //error
  const [error, setError] = useState({ show: false, msg: "" })

  const serachGitHubUsers = async (user) => {
    setIsLoading(true)
    toggleError(false, "")

    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    )

    if (response) {
      setGitHubUser(response.data)
    } else {
      toggleError(true, "sorry, cant find a user. ")
    }

    checkRequests()
    setIsLoading(false)
  }

  //check rate
  const checkRequests = (params) => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let { remaining } = data.rate

        setRequests(remaining)

        if (remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly limit. ")
        }
      })
      .catch((error) => console.log(error))
  }

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg })
  }

  useEffect(checkRequests, [])

  return (
    <GithubContext.Provider
      value={{
        gitHubUser,
        repos,
        followers,
        requests,
        error,
        serachGitHubUsers,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export { GitHubProvider, GithubContext }
