/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { SelectControl, PanelBody, TextControl, ToolbarGroup } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState } from 'react'



const stepOptions = [
	{ 
		label: __( 'Sign up step', 'mailing_plugin' ),
		value: ''
	},
	{ 
		label: __( 'Confirmation step', 'mailing_plugin' ),
		value: 'confirm'
	},
	{ 
		label: __( 'Thank you step', 'mailing_plugin' ),
		value: 'confirm confirmed'
	},
]
const skins = [
	{ 
		label: __( 'Clean', 'mailing_plugin' ),
		value: ''
	},
	{ 
		label: __( 'Dark Blue', 'mailing_plugin' ),
		value: 'darkBlue'
	},
]

const Edit = ( props ) => {

	const [ step, setStep ] = useState( '' )
	const {
		attributes: { 
			title = __( 'Join the List', 'mailing-plugin'  ), 
			caption = __( 'You will never miss our latest news. Our newsletter is once a week, every Wednesdat.', 'mailing-plugin'  ), 
			confirmation = __( 'We sent a confirmation code to the email [useremail]. Please use it to confirm your email.', 'mailing-plugin' ),
			group = 0, 
			confirmationFooter = __( 'Did not receive the email? Check your spam filter, or <a href="#" class="otherEmail">try another email address</a>', 'mailing-plugin' ),
			subscribedText = __( '<h2>Thank you for subscribing!</h2>', 'mailing-plugin' ),
			emailPlaceholder = __( 'Type your email address', 'mailing-plugin' ),
			confirmationPlaceholder = __( 'Confirmation code', 'mailing-plugin' ),
			submitText = __( 'Subscribe', 'mailing-plugin' ),
			footer = __( 'By submitting above, you agree to our <a href="#" target="_blank">privacy policy</a>.', 'mailing-plugin' ),
			skin = ''
		},
		setAttributes,
	} = props;


	const blockProps = useBlockProps({
		className: 'mailing-subscribe-form ' + step
	});

	const groups = useSelect( select => select( 'core' ).getEntityRecords('postType', 'mailing_group')) || []

	const groupOptions = groups.map( group => ({ label: group.title.raw,value:group.id}) )
	groupOptions.push( { label: __( 'No group', 'mailing_plugin' ), 'value': 0 } )
	
	return (
		<div { ...blockProps } data-skin={skin}>
				<BlockControls>
					<ToolbarGroup>
					
						<SelectControl
							label={ __( 'Step', 'mailing_plugin' ) }
							hideLabelFromVision={true}
							value={step}
							options={ stepOptions }
							onChange={ ( value ) => setStep( value ) }
						/>
					</ToolbarGroup>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( 'Form Settings', 'mailing_plugin' ) } initialOpen={false}>
						<SelectControl
							label={ __( 'Group', 'mailing_plugin' ) }
							value={group}
							options={ groupOptions }
							onChange={ ( group ) => setAttributes( { group } ) }
						/>
						<TextControl
							label={ __( 'Email placeholder', 'mailing_plugin' ) }
							value={ emailPlaceholder }
							onChange={ ( emailPlaceholder ) => setAttributes( { emailPlaceholder } ) }
						/>
						<TextControl
							label={ __( 'Confirmation code placeholder', 'mailing_plugin' ) }
							value={ confirmationPlaceholder }
							onChange={ ( confirmationPlaceholder ) => setAttributes( { confirmationPlaceholder } ) }
						/>
						<TextControl
							label={ __( 'Submit button text', 'mailing_plugin' ) }
							value={ submitText }
							onChange={ ( submitText ) => setAttributes( { submitText } ) }
						/>
						<SelectControl
							label={ __( 'Skin', 'mailing_plugin' ) }
							value={skin}
							options={ skins }
							onChange={ ( skin ) => setAttributes( { skin } ) }
						/>
                    </PanelBody>
                </InspectorControls>
				<div className="inner">
					<form className="mailingSubscribe step">
						<RichText
							tagName="h2"
							placeholder={ __(
								'Subscribe title…',
								'mailing-plugin'
							) }
							value={ title }
							onChange={ ( title ) => setAttributes( { title } ) }
						/>
						<RichText
							tagName="div"
							placeholder={ __(
								'Call to action…',
								'mailing-plugin'
							) }
							className="caption"
							value={ caption }
							onChange={ ( caption ) => setAttributes( { caption } ) }
						/>
						<input type="email" name="email" placeholder={ emailPlaceholder } />
						<input type="submit" value={ submitText } />
						<RichText
							tagName="div"
							placeholder={ __(
								'Footer text...',
								'mailing-plugin'
							) }
							className="footer"
							value={ footer }
							onChange={ ( footer ) => setAttributes( { footer } ) }
						/>
					</form>
					<form className="mailingSubscribeConfirm step">
						<RichText
							tagName="div"
							placeholder={ __(
								'Sent confirmation text...',
								'mailing-plugin'
							) }
							className="caption"
							value={ confirmation }
							onChange={ ( confirmation ) => setAttributes( { confirmation } ) }
						/>
						<input type="text" name="code" maxLength={6} placeholder={ confirmationPlaceholder }></input>
						<input type="hidden" name="group" value={ group } />
						<RichText
							tagName="div"
							placeholder={ __(
								'Other email text...',
								'mailing-plugin'
							) }
							className="footer"
							value={ confirmationFooter }
							onChange={ ( confirmationFooter ) => setAttributes( { confirmationFooter } ) }
						/>
					</form>
					<RichText
						tagName="div"
						placeholder={ __(
							'Subscribed text...',
							'mailing-plugin'
						) }
						className="mailingSubscribed step"
						value={ subscribedText }
						onChange={ ( subscribedText ) => setAttributes( { subscribedText } ) }
					/>
				</div>
		</div>
	);
};

export default Edit;
