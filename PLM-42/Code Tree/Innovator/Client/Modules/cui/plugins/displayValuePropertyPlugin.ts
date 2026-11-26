// eslint-disable-next-line
// @ts-nocheck
const displayValuePropertyPlugin = {
	listCache: {},

	getList(item) {
		const type = item.item_characteristic_value_type;

		if (type != 'List') {
			return [];
		}

		const itemCharacteristicId = item.item_characteristic_id;
		var itemCharacteristicListValue = aras.newIOMItem();
		itemCharacteristicListValue.LoadAML(`<Item type='Item Characteristic List Value' action='get' select='value,label'><source_id>${itemCharacteristicId}</source_id></Item>`);
		var listValuesItems = itemCharacteristicListValue.apply();

		var list = [];

		if (listValuesItems.isError() || listValuesItems.getItemCount() < 1) {
			aras.AlertError(`Allowed Values for '${item['item_characteristic_id@aras.keyed_name']}' not found.`);
		} else {
			for (var i = 0, count = listValuesItems.getItemCount(); i < count; i++) {
				// Flexur 30-Sep-2024: Ticket PLM-18 (Characteristic values are not being properly exported to Excel)
				// In original code label was missing and value was initialized with label
				// Now added label to the list and updated value to initialize with value
				let lvItem = listValuesItems.getItemByIndex(i);
				let value = lvItem.getProperty('value', '');
				let label = lvItem.getProperty('label', value); // default to value if label is not set in List
				list.push({
					//value: listValuesItems.getItemByIndex(i).getProperty('label', '') // Original code
					value: value,
					label: label
				});
			}
		}

		return list;
	},

	// 5/4/2022 to fix IR-098610 [WATLOW UPGRADE] Value field displaying as a drop down
	//getCellType(result, headId) {
	getCellType(result, headId, itemId, value, type, rowId) {
		if (headId === 'display_value_D') {
			// 2/28/2022 to fix IR-098610 [WATLOW UPGRADE] Value field displaying as a drop down 
			//return 'list';
			const item = this.grid.rows.get(rowId);
			return item && item.item_characteristic_value_type == 'List' ? 'list' : 'string';
		}

		return result;
	},

	getCellMetadata(result, headId, itemId) {
		// 6/16/2022 to fix IR-098928 [WATLOW UPGRADE] List values disappear after Save or Close 
		if (headId === 'display_value_D') {
			if (!this.listCache[itemId]) {
				const item = this.grid.rows.get(itemId);
				this.listCache[itemId] = this.getList(item);
			}
			result.list = this.listCache[itemId];
		}

		return result;
	},

	/*checkEditAvailability(result, headId, rowId) {
		if (headId === 'display_value_D') {
			const item = this.grid.rows.get(rowId);
			this.listCache[item.id] = this.getList(item);
		}

		return result;
	}*/
};

export default displayValuePropertyPlugin;
