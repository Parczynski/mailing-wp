import { html2node } from "./utils/dom"

export class MailingError extends Error {
    constructor( message: string ) {
        super( message )
        

        const stack = ErrorStack.getInstance()
        stack.error( message )
        
        
    }
}


class ErrorStack {
    private static instance: ErrorStack
    private node: HTMLElement
    private errors: HTMLElement[]

    private constructor() {
        this.node = html2node( `<div id="mailingMessageStack"></div>` )
        this.errors = []
        document.body.append( this.node )
    }

    public error( message: string ) {
        const error = html2node( `<div class="mailingMessage error">${message}<div class="close">close</div></div>` )

        error.addEventListener( 'click', () => {
            error.classList.remove( 'active' )
            setTimeout( () => error.remove(), 300 )
            
        })

        this.errors.push( error )

        this.node.append( error )
        setTimeout(()=>error.classList.add( 'active' ), 0 )
        
    }

    static getInstance(): ErrorStack {
        if( !ErrorStack.instance )
            ErrorStack.instance = new ErrorStack()

        return ErrorStack.instance
    }
}