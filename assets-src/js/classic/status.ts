import { AjaxContent } from "../components/newsletter-prepare"
import { NewsletterStatus } from "../components/newsletter-status"
import { AjaxFail, AjaxSuccess, callBackend } from "../utils/api"
import { inlineCSS } from "../utils/css-inliner"
import { initSending } from "../utils/sending"

interface HTMLProgress extends HTMLElement {
    guage: HTMLElement,
    text: HTMLElement
}

export class StatusBlock {
    private block: HTMLElement
    private resume: HTMLButtonElement
    private progress: HTMLProgress
    private ID: number
    private audience: number
    private sent: number
    private views: number 


    constructor( block: HTMLElement ) {
        this.block = block
        this.ID = parseInt( block.dataset.id )
        this.progress = block.querySelector( '.mailingProgress' ) as HTMLProgress

        this.progress.guage = this.progress.querySelector( '.mailingProgress-inner' ) 
        this.progress.text = this.progress.querySelector( '.mailingProgress-text' ) 

        this.resume = block.querySelector( '.mailingResume' ) as HTMLButtonElement

        this.resume.addEventListener( 'click', ( e: Event ) => {
            e.preventDefault()
            this.setStatus( 'sending' )
        })

    }

    updateProgress() {
        this.progress.guage.style.width = `${Math.min( 100, this.sent / this.audience * 100 )}%`
        this.progress.text.innerText = `${this.sent} / ${this.audience}`
    }

    setStatus( status: NewsletterStatus ) {
        this.block.dataset.status = status
        this.init()
    }

    getStatus(): NewsletterStatus {
        return this.block.dataset.status as NewsletterStatus
    }

    init() {
        switch( this.getStatus() ) {
            case 'presending':
                this.presending();
                break;
            case 'sending':
                this.sending()
                break;
            default:
                break
        }
    }

    presending() {
        const data = new FormData()
        data.append( 'id', this.ID.toString() )

        callBackend( 'get_newsletter_content', data )
            .then( ( response: AjaxContent ) => {
                const html = inlineCSS( response.content )
                data.set( 'html', html )
                return callBackend( 'update_newsletter_body', data )
            })
            .then( ( response: AjaxSuccess ) => {
                this.setAudience( response.audience )
                this.setSent( response.sent )
                this.setViews( response.views )
                this.setStatus( 'sending' )
            } )
            .catch( ( err: AjaxFail ) => {
                console.log( err.message )
            })
    }

    sending() {
        initSending( this.ID, 1, ( response ): boolean => {

            this.setAudience( response.audience )
            this.setSent( response.sent )
            this.setViews( response.views )

            if( response.sent < response.audience )
                return true

            this.setStatus( 'sent' )

            return false
        })
    }

    setAudience( qnty: number ) {
        this.audience = qnty
        let node = this.block.querySelector( '.mailingMetrics-value.audience' ) as HTMLElement
        node.innerText = this.audience.toString()
        this.updateProgress()
    }

    setSent( qnty: number ) {
        this.sent = qnty
        let node = this.block.querySelector( '.mailingMetrics-value.sent' ) as HTMLElement
        node.innerText = this.sent.toString()
        this.updateProgress()
    }

    setViews( qnty: number ) {
        this.views = qnty
        // let node = this.block.querySelector( '.mailingMetrics-value.views' ) as HTMLElement
        // node.innerText = this.views.toString()
    }


}