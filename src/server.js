import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes, renderRoutes } from 'react-router-config'
import express from 'express'
import { Provider } from 'react-redux'
import serialize from 'serialize-javascript'
import '@babel/polyfill'

import Routes from './Routes'
import { store } from './store'
import { assetsByChunkName } from '../dist/public/stats.json'

const app = express()
app.use(express.static('dist/public/'))

const sheet = new ServerStyleSheet()

const renderer = (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StyleSheetManager sheet={sheet.instance}>
        <StaticRouter location={req.path} context={context}>
          <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
      </StyleSheetManager>
    </Provider>
  )
  const styleTags = sheet.getStyleTags()
  sheet.seal()

  return `
    <!DOCTYPE html>
    <html lang="ru" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
      </head>
      <body>
          <div id="root">${content}</div>
          <script>
            window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
              /</g,
              '\\u003c'
            )}
          </script>
          <script src="/${assetsByChunkName.main}"></script>
      </body>
    </html>
  `
}

// TODO: законсолить посмотреть
app.get('*', (req, res) => {
  const params = req.params[0].split('/')
  const id = params[2]

  const routes = matchRoutes(Routes, req.path)

  const promises = routes
    .map(({ route }) => {
      return route.loadData ? route.loadData(store, id) : null
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve)
        })
      }
      return null
    })

  Promise.all(promises).then(() => {
    const context = {}
    const content = renderer(req, store, context)

    if (context.notFound) {
      res.status(404)
    }

    res.send(content)
  })
})

app.listen(3000, () => {
  console.log(`SSR runing at port 3000`)
})
