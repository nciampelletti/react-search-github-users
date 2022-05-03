import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { GitHubProvider } from "./context/context"
import { Auth0Provider } from "@auth0/auth0-react"
import { createRoot } from "react-dom/client"

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

root.render(
  <Auth0Provider
    domain='dev-tjnvojoc.us.auth0.com'
    clientId='hBpGY4Z8JjsHgZw9H5T8ch3BM2lvUcmV'
    cacheLocation='localstorage'
    redirectUri={window.location.origin}
  >
    <GitHubProvider>
      <App />
    </GitHubProvider>
  </Auth0Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
