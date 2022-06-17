import { AjaxSuccess, callBackend } from "../utils/api"




interface SuccessSubscribe extends AjaxSuccess {
    challenge: string
}


export class MailingForm {
    
    private container: Element
    private subscribeForm: HTMLFormElement
    private confirmForm: HTMLFormElement
    private otherEmail: HTMLAnchorElement
    private codeInput: HTMLInputElement
    private challenge: string
    private email: string

    constructor( e: Element ) {
        this.container = e
        this.subscribeForm = e.querySelector( '.mailingSubscribe' )
        this.subscribeForm.addEventListener( 'submit', e => {

            e.stopPropagation()
            e.preventDefault()
            this.subscribe() 
            
        } )

        this.confirmForm = e.querySelector( '.mailingSubscribeConfirm' )
        this.confirmForm && this.confirmForm.addEventListener( 'submit', e => {
            e.preventDefault()
            this.confirm()
        } )

        this.codeInput = e.querySelector( 'input[name="code"]' )
        this.codeInput && this.codeInput.addEventListener( 'input', _ => {
            if( this.codeInput.value.length === this.codeInput.maxLength )
                this.confirm()
        })

        this.otherEmail = e.querySelector( '.otherEmail' )
        this.otherEmail && this.otherEmail.addEventListener( 'click', e => {
            e.preventDefault()
            this.container.classList.remove( 'confirm', 'confirmed' )
        })
    }

    async subscribe( ) {

        try {
            const data = new FormData( this.subscribeForm )
            const { challenge } = await callBackend( 'subscribe_attempt', data ) as SuccessSubscribe
            this.email = data.get( 'email' ) as string
            this.challenge = challenge
            let caption = <HTMLElement>this.container.querySelector( '.mailingSubscribeConfirm .caption' )
            caption.innerText = caption.innerText .replace( '[useremail]', this.email )
            this.container.classList.add( 'confirm' )
        } catch( e ) {
            throw e
        }

    }

    async confirm() {

        try {
            const data = new FormData( this.confirmForm )
            data.append( 'challenge', this.challenge )
            data.append( 'email', this.email )
            this.container.classList.add( 'confirming' )
            await callBackend( 'confirm_attempt', data )
            this.container.classList.add( 'confirmed' )
        } catch( e ) {
            throw e
        } finally {
            this.container.classList.remove( 'confirming' )
        }
        
    }

    complete() {

    }

}