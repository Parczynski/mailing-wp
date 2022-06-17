export function html2node( code: string ): HTMLElement {
    const template = document.createElement( 'template' )
    template.innerHTML = code.trim()
    return template.content.firstChild as HTMLElement
}