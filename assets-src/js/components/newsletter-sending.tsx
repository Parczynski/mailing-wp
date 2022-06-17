import { PluginPostStatusInfo } from '@wordpress/edit-post'
import { Progress } from "./progress"
import { Spinner } from '@wordpress/components'
import { useState, useEffect } from 'react'
import { useDispatch } from '@wordpress/data'
import { __ }  from '@wordpress/i18n'
import { initSending } from '../utils/sending'

interface NewsletterSendingProps {
    newsletter: number
}


export const NewsletterSending = ( props: NewsletterSendingProps ) => {

    const [ progress, setProgress ] = useState( 0 )
    const [ total, setTotal ] = useState( 0 )
    const { editPost } = useDispatch( 'core/editor' )

    useEffect( () => {
        initSending( props.newsletter, 1, ( response ): boolean => {
            setProgress( response.sent )
            setTotal( response.audience )

            if( response.sent < response.audience )
                return true
            
            editPost({ meta: {_status:'sent'} })

            return false
        })

    }, [])

    return (
        <>
            <PluginPostStatusInfo> 
                { __( 'Sending email', 'mailing_plugin' ) }
                <Spinner />
            </PluginPostStatusInfo>
            <PluginPostStatusInfo> 
                <Progress total={ total } value={ progress } />
            </PluginPostStatusInfo>
        </>
    )
}

