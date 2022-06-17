import { MailingForm } from "./form/form"



document.addEventListener( 'submit', async ( e: Event ) => {

    if( ! ( e.target instanceof Element ) ) return

    if( ! e.target.matches( '.mailingSubscribe' ) ) return

    e.preventDefault()

    const form = new MailingForm( e.target.closest( '.mailing-subscribe-form' ) )

    form.subscribe()
    
})