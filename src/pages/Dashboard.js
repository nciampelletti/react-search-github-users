import React from "react"
import { Info, Repos, User, Search, Navbar } from "../components"
import loadingImage from "../images/preloader.gif"
import { GithubContext } from "../context/context"

const Dashboard = () => {
  const { isLoading } = React.useContext(GithubContext)

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className='loading-img' />
      </main>
    )
  } else {
    return (
      <main>
        <Navbar />
        <Search />

        {/* repo4s  */}
        <Info />

        {/* card */}
        <User />

        {/* charts */}
        <Repos />
      </main>
    )
  }
}

export default Dashboard
