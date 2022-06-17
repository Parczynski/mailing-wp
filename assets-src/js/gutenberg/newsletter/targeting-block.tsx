import { registerPlugin } from "@wordpress/plugins";
import { PluginDocumentSettingPanel } from '@wordpress/edit-post'
import { __ }  from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components'
import { useSelect, useDispatch } from '@wordpress/data'




registerPlugin( 'mailing-targeting', {
    render: () => {

		const target = useSelect( select => select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ '_target' ] ) || 0
		const groups = useSelect( select => select( 'core' ).getEntityRecords('postType', 'mailing_group')) || []
		const groupOptions = groups.map( group => ({ label: group.title.raw,value:group.id}) )
		groupOptions.push( { label: __( 'All groups', 'mailing_plugin' ), 'value': -1 } )
		groupOptions.push( { label: __( 'No group', 'mailing_plugin' ), 'value': 0 } )

		const {editPost} = useDispatch( 'core/editor' )

		return (
			<PluginDocumentSettingPanel name="targeting-block" title="Targeting">
				<SelectControl
					label="Subscription Group"
					value={target}
					options={ groupOptions }
					onChange={ (value) => editPost({ meta: {_target:parseInt(value)} })}
				/>
			</PluginDocumentSettingPanel>
			
		)
	}
})