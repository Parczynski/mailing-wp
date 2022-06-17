import { MailingError } from "../errors"

export interface AjaxFail {
    ok: false,
    message: string
}

export interface AjaxSuccess {
    ok: true,
    [ key: string ]: any
}

declare const ajaxurl: string

export async function callBackend( action: string, data: FormData ): Promise<AjaxSuccess> {
    data.append( 'action', action )

    const response = await fetch( ajaxurl, {
        method:'POST',
        cache: 'no-cache',
        redirect: 'follow',
        body: data
    } )

    if( response.ok === false ) throw new MailingError( response.statusText )

    const responseData = await response.json() as AjaxFail | AjaxSuccess
    
    if( responseData.ok === false ) throw new MailingError( responseData.message )

    return responseData


}