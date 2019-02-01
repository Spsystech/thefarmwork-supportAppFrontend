import api from './api';

export function getCompanyData(values) {
	return {
		type: 'GET_COMPANY_DATA',
		payload: api.get(`/gsuite/${values.folderName}`),
	};
}

export function getCompanyFolderData(values) {
	return {
		type: 'GET_COMPANY_FOLDER_DATA',
		payload: api.get(`/gsuite/folder/${values.folderId}`),
	}
}

export function pushToStack(values) {
	return {
		type: 'PUSH_TO_STACK',
		payload: values,
	}
}

export function popFromStack(values) {
	return {
		type: 'POP_FROM_STACK',
		payload: values,
	}
}

export function updateFolderId(values){
	return {
		type: 'UPDATE_COMPANY_FOLDER_ID',
		payload: values,
	}
}