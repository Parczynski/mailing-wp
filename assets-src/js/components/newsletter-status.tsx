import { useSelect, useDispatch } from '@wordpress/data'
import { NewsletterMetrics } from './newsletter-metrics'
import { NewsletterPrepare } from './newsletter-prepare'
import { NewsletterSending } from './newsletter-sending'
import { __ }  from '@wordpress/i18n'
import { useEffect } from 'react'

export type NewsletterStatus = 'sending' | 'pause' | 'sent' | 'draft' | 'presending'


export const NewsletterStatus = () => {
    
    const { postStatus, post_id, newsletterStatus } = useSelect( select => {
        const { getEditedPostAttribute, getCurrentPostId } = select( 'core/editor' )
        


        return {
            postStatus:getEditedPostAttribute( 'status' ),
            post_id: getCurrentPostId(),
            newsletterStatus:getEditedPostAttribute( 'meta' )[ '_status' ] ?? 'draft'
        }
    } )


    const { editPost } = useDispatch( 'core/editor' )

    useEffect( () => {
        
        if( postStatus === 'publish' && newsletterStatus === 'draft' )
            editPost({ meta: {_status:'presending'} })

        if( ( postStatus === 'draft' || postStatus === 'auto-draft' ) && newsletterStatus !== 'draft' )
            editPost({ meta: {_status:'draft'} })
    }, [ postStatus, newsletterStatus ])


    console.log( 'newsletterStatus', newsletterStatus )
    console.log( 'postStatus', postStatus )
    switch( newsletterStatus ) {
        case 'presending':
            return <NewsletterPrepare newsletter={post_id} />
        case 'sending':
            return <NewsletterSending newsletter={post_id} />
        case 'pause':
        case 'sent':
            return <NewsletterMetrics newsletter={post_id} status={newsletterStatus} />
        default:
            return null;
    }
}