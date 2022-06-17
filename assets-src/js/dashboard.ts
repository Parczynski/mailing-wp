import { StatusBlock } from "./classic/status"

console.log( 'dashboard init')



window.addEventListener( 'load', async () => {
    const statusBlock = document.querySelector( '#mailingClassicNewsletterStatus' ) as HTMLElement
    if( !statusBlock ) return

    const status = new StatusBlock( statusBlock )

    status.init()

} )