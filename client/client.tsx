/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const element = document.getElementById('app')
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

if (process.env.NODE_ENV === 'production') {
  ReactDOM.hydrate(app, element)
} else {
  ReactDOM.render(app, element)
}

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept()
}
