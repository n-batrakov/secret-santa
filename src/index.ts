import commander from 'commander'
import { createServer } from '@marblejs/core'
import { createHttpListener } from './bootstrap'
import { polyfill } from './pollyfills'
import { AppConfig } from './config'
import fs from 'fs'

polyfill(global)
if (!fs.existsSync('./data')) fs.mkdirSync('./data')

const cli = new commander.Command()

cli
.name('santa')
.version('0.1.0')

cli
.command('run')
.option('-p|--port [port]', 'TCP Port to listen to (BOT_PORT)', process.env.BOT_PORT)
.option('-b|--bot <bot>', 'Mattermost bot URL (BOT_URL)', process.env.BOT_URL)
.action((cmd) => {
    if (cmd.bot === undefined) {
        console.error('--bot parameter is required')
        process.exit(1)
    }

    const port = cmd.port || 8080
    const config: AppConfig = {
        mattermostBotUrl: cmd.bot,
    }

    const server = createServer({
        port,
        httpListener: createHttpListener(config),
    })

    server.run()

    console.log(`Server is running on http://localhost:${port}`)
})


cli.parse(process.argv)
