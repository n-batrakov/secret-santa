const { XMLHttpRequest } = require('xhr2')

const atob = (str: string) => Buffer.from(str, 'base64').toString()
const btoa = (str: string) => Buffer.from(str).toString('base64')

export function polyfill(global: any) {
    global.atob = atob
    global.btoa = btoa
    global.XMLHttpRequest = XMLHttpRequest
}