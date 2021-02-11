import express, { Router } from 'express'
import path from 'path'
import fs from 'fs'
import cheerio from 'cheerio'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { StaticRouterContext } from 'react-router'
import Helmet from 'react-helmet'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import App from '@client/App'

const router = Router()

const clientPath = path.join(__dirname, '../../..', process.env.NODE_ENV === 'production' ? '' : 'dist', 'client')

const templatePath = path.join(clientPath, 'index.html')
const HTML_TEMPLATE = fs.readFileSync(templatePath).toString()

router.use('/dist', express.static(path.join(clientPath)))

router.get('/*', (req, res) => {
  const context: StaticRouterContext = {}
  const sheet = new ServerStyleSheet()

  const router = (
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter location={req.originalUrl} context={context}>
        <App />
      </StaticRouter>
    </StyleSheetManager>
  )
  const markup = ReactDOM.renderToString(sheet.collectStyles(router))
  const styleTags = sheet.getStyleTags()

  if (context.url) {
    res.redirect(301, context.url)
  } else {
    sheet.seal()
    const $template = cheerio.load(HTML_TEMPLATE)
    const helmet = Helmet.renderStatic()
    $template('#app').html(markup)
    $template('body').attr(helmet.bodyAttributes.toString())
    $template('html').attr(helmet.htmlAttributes.toString())
    $template('head').append(
      helmet.title.toString(),
      helmet.meta.toString(),
      helmet.link.toString(),
      helmet.noscript.toString(),
      helmet.script.toString(),
      helmet.base.toString(),
      styleTags,
    )
    const html = $template.html()
    res.send(html)
  }
})

export default router
