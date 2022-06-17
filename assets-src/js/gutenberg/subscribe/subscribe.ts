/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import json from '../../../../includes/gutenberg-subscribe-block/block.json';
import edit from './edit';
import save from './save';
import '../../../css/subscribe-form.scss';

const { name } = json;


registerBlockType( name, {
	edit,
	save,
} );