import { IncomingMessage, ServerResponse } from 'http'
import httpProxy from "http-proxy" 

// const target = "https://api.exchangeratesapi.io/"
const target = 'https://git.heroku.com/pjaozora-server.git:4000/'
const proxy = httpProxy.createProxyServer({ target, changeOrigin: true });

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    req.url = req.url!.replace(new RegExp("^/api/proxy"), "")

    return new Promise((resolve, reject) => {
        try {
            proxy.web(req, res, { proxyTimeout: 5000 }, (e) => {
                reject(e)
            })
            resolve
        } catch (e) {
            reject(e)
        }
    })
}