import express, { Router } from 'express'
import path from 'path'
import fs from 'fs'
import cheerio from 'cheerio'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { StaticRouterContext } from 'react-router'

import App from '../../../client/App'

const router = Router()

const clientPath = path.join(__dirname, '../../..', 'dist', 'client')

const templatePath = path.join(clientPath, 'index.html')
const HTML_TEMPLATE = fs.readFileSync(templatePath).toString()

router.use('/dist', express.static(path.join(clientPath)))

router.get('/*', (req, res) => {
  const context: StaticRouterContext = {}
  const router = <StaticRouter location={req.originalUrl} context={context}><App /></StaticRouter>
  const markup = ReactDOM.renderToString(router)

  if (context.url) {
    res.redirect(301, context.url)
  } else {
    const $template = cheerio.load(HTML_TEMPLATE)
    $template('#app').html(markup)
    const html = $template.html()
    res.send(html)
  }
})

export default router
