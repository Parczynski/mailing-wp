import { registerPlugin } from '@wordpress/plugins';
import { __ }  from '@wordpress/i18n';
import { NewsletterStatus } from '../../components/newsletter-status';


registerPlugin( 'mailing-status', { 
	render: () => (
        <NewsletterStatus />
    )
} );