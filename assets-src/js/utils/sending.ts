import { callBackend } from './api'

interface ajaxSent {
    ok: true,
    sent: number,
    audience: number,
    views: number
}

export function initSending( id: number, limit: number, cb: ( response: ajaxSent) => boolean ): void {
    const data = new FormData()
    data.append( 'id', id.toString() )
    data.append( 'limit', limit.toString() )
    callBackend( 'send_newsletter', data )
        .then( ( response: ajaxSent ) => {
            if( cb( response ) ) initSending( id, limit, cb )
        })
}