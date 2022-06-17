import { html2node } from './dom'


const nonInheritedProps = [ 'background-attachment','background-color','background-image','background-position','background-repeat','background','border-color','border-style','border-top','border-right','border-bottom','border-left','border-top-color','border-right-color','border-bottom-color','border-left-color','border-top-style','border-right-style','border-bottom-style','border-left-style','border-top-width','border-right-width','border-bottom-width','border-left-width','border-width','border','bottom','clear','clip','content','counter-increment','counter-reset','cue-after','cue-before','cue','display','float','height','left','margin-right','margin-left','margin-top','margin-bottom','margin','max-height','max-width','min-height','min-width','outline-color','outline-style','outline-width','outline','overflow','padding-top','padding-right','padding-bottom','padding-left','padding','page-break-after','page-break-before','page-break-inside','pause-after','pause-before','pause','play-during','position','right','table-layout','text-decoration','top','unicode-bidi','vertical-align','width','z-index', ]
const InheritedProps = [ 'azimuth','border-collapse','border-spacing','caption-side','color','cursor','direction','elevation','empty-cells','font-family','font-size','font-style','font-variant','font-weight','font','letter-spacing','line-height','list-style-image','list-style-position','list-style-type','list-style','orphans','pitch-range','pitch','quotes','richness','speak-header','speak-numeral','speak-punctuation','speak','speech-rate','stress','text-align','text-decoration','text-indent','text-transform','visibility','voice-family','volume','white-space','widows','word-spacing' ]

export function inlineCSS( html: string ): string {

    const template = html2node( `<div class="email-inliner editor-styles-wrapper" style="display:none"><div class="email-wrapper">${html}</div></div>` )
    document.body.append( template )


    loopChildren( template, ( node:HTMLElement, parentStyles: CSSStyleDeclaration | false ): CSSStyleDeclaration => {

        const styles = getComputedStyle( node );

        for (var i = styles.length; i--;) {
            const property = styles[i]

            if( ! ( InheritedProps.includes( property ) || nonInheritedProps.includes( property ) ) ) continue

            const value = styles.getPropertyValue( property )


            if( ( node.tagName !== 'A' || property !== 'color' ) && InheritedProps.includes( property ) && parentStyles && ( parentStyles.getPropertyValue( property ) === value ) ) continue

            node.style[ property ] = value
        }
        return styles
    
    })

    return template.innerHTML

    
}



function loopChildren( element: HTMLElement, cb: ( node:HTMLElement, parentStyles: CSSStyleDeclaration | false ) => CSSStyleDeclaration, root: boolean = true ) {
    const nodes = Array.from( element.children )

    const parentStyles = root 
        ? false
        : getComputedStyle( element )

    nodes.forEach( (node: HTMLElement) => {
        cb( node, parentStyles )
        loopChildren( node, cb, false )
    })
}