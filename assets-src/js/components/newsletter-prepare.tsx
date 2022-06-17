import { PluginPostStatusInfo } from '@wordpress/edit-post'
import { Spinner } from '@wordpress/components'
import { useDispatch, useSelect } from '@wordpress/data'
import { __ }  from '@wordpress/i18n'
import { useEffect } from 'react'
import { inlineCSS } from '../utils/css-inliner'
import { AjaxFail, AjaxSuccess, callBackend } from '../utils/api'

interface NewsletterPrepareProps {
    newsletter: number
}

export interface AjaxContent {
    ok: true,
    content: string
}

export const NewsletterPrepare = ( props: NewsletterPrepareProps ) => {

    const {editPost} = useDispatch( 'core/editor' )

    const content = useSelect( select => {
        return select( 'core/editor' ).getEditedPostContent()
    })
    


    useEffect( () => {
        const data = new FormData()
        data.append( 'id', props.newsletter.toString() )
        data.append( 'html', content )

        callBackend( 'get_newsletter_content', data )
            .then( ( response: AjaxContent ) => {
                const html = inlineCSS( response.content )
                data.set( 'html', html )
                return callBackend( 'update_newsletter_body', data )
            })
            .then( ( response: AjaxSuccess ) => {
                editPost( { meta: { _status: 'sending' } } )
            } )
            .catch( ( err: AjaxFail ) => {
                console.log( err.message )
            })

    }, [])

    return (
        <>
            <PluginPostStatusInfo> 
                { __( 'Preparing email body', 'mailing_plugin' ) }
                <Spinner />
            </PluginPostStatusInfo>
        </>
        
    )
}