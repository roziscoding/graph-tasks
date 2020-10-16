import * as app from './app'

app.start().catch((err) => {
  console.error(err)
  process.exit(1)
})
