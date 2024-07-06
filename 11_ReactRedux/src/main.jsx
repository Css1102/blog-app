import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { Store } from './app.Store'
ReactDOM.createRoot(document.getElementById('root')).render(
  // In order to make our redux work we need to wrap the code inside the provider given to us in
  // react redux and it's value will be set as the store.
  <Provider store={Store}>
    <App />
  </Provider>,
)
