/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ( props ) => {
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
	} = props;

	return (
		<div className="mailing-subscribe-form" data-skin={skin}>
			<div className="inner">
				<form className="mailingSubscribe step">
					
					<RichText.Content 
						tagName="h2" 
						value={ title } 
					/>
					
					<RichText.Content 
						tagName="div" 
						className="caption"
						value={ caption } 
					/>
					
					
					<input type="email" name="email" placeholder={ emailPlaceholder } />
					<input type="submit" value={ submitText } />
					<input type="hidden" name="group" value={ group } />

					<RichText.Content 
						tagName="div" 
						className="footer"
						value={ footer } 
					/>
				</form>
				<form className="mailingSubscribeConfirm step">
					<RichText.Content 
						tagName="div" 
						className="caption"
						value={ confirmation } 
					/>
					<input type="text" name="code" maxLength={6} placeholder={ confirmationPlaceholder }></input>
					<input type="hidden" name="group" value={ group } />
					
					<RichText.Content 
						tagName="div" 
						className="footer"
						value={ confirmationFooter } 
					/>
				</form>
				<RichText.Content 
					tagName="div" 
					className="mailingSubscribed step"
					value={ subscribedText } 
				/>
			</div>
		</div>
	);
};

export default Save;
