interface ProgressProps {
    total: number,
    value: number
}

export const Progress = ( props: ProgressProps ) => {

    
    const progress = Math.min( 100, props.value / props.total * 100 )
    console.log( )

    let className = `mailingProgress `
    className += (progress === 100) 
        ? 'complete'
        : ''

    return (
        <div className={className}>
            <div className="mailingProgress-inner" style={ { width: `${progress}%`}}>
                
            </div>
            <div className="mailingProgress-text">{ `${props.value} / ${props.total}` }</div>
        </div>
    )

}