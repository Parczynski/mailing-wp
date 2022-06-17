import { Button } from '@wordpress/components'
import { PluginPostStatusInfo } from '@wordpress/edit-post'
import { __ }  from '@wordpress/i18n'
import { useState, useEffect } from 'react'
import { useDispatch } from '@wordpress/data'
import { callBackend } from '../utils/api'
import { NewsletterStatus } from './newsletter-status'

interface NewsletterMetricsProps {
    status: NewsletterStatus,
    newsletter: number
}

interface ajaxMetrics {
    ok: true,
    sent: number,
    audience: number,
    views: number
}

export const NewsletterMetrics = ( props: NewsletterMetricsProps ) => {
    
    const [ sent, setSent ] = useState( 0 )
    const [ total, setTotal ] = useState( 0 )
    const [ views, setViews ] = useState( 0 )

    const {editPost} = useDispatch( 'core/editor' )

    useEffect( () => {
        
        const data = new FormData()
        data.append( 'id', props.newsletter.toString() )

        callBackend( 'metrics_newsletter', data )
            .then( ( response: ajaxMetrics ) => {
                setSent( response.sent )
                setTotal( response.audience )
                setViews( response.views )
            })

    }, [])

    const Resume = ( ) => {
        return ( props.status === 'pause' )
            ? ( <PluginPostStatusInfo><Button variant="secondary" onClick={() => editPost({ meta: {_status:'sending'} })}>{ __( 'Resume sending', 'mailing_plugin' ) }</Button></PluginPostStatusInfo> )
            : null
    }
    

    return (
        <>
            <PluginPostStatusInfo> 
                { 
                    ( props.status === 'pause' ) 
                        ? __( 'Newsletter is paused', 'mailing_plugin' )
                        : __( 'Newsletter is finished', 'mailing_plugin' ) 
                }
            </PluginPostStatusInfo>
            <PluginPostStatusInfo> 
                <div className="mailingMetrics">
                    <div>
                        <div className="mailingMetrics-value">{ total }</div>
                        <div className="mailingMetrics-caption">{ __( 'Targets', 'mailing_plugin' ) }</div>
                    </div>
                    <div>
                        <div className="mailingMetrics-value">{ sent }</div>
                        <div className="mailingMetrics-caption">{ __( 'Sent', 'mailing_plugin' ) }</div>
                    </div>
                </div>
            </PluginPostStatusInfo>
            <Resume />
        </>
    )
}