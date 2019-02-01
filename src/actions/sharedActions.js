import api from './api';

export function getSharedData(values) {
	return {
		type: 'GET_SHARED_DATA',
		payload: api.get(`/gsuite/_Shared`),
	};
}

export function sharedFolderData(values) {
	return {
		type: 'SHARED_FOLDER_DATA',
		payload: api.get(`/gsuite/folder/${values.folderId}`),
	}
}

export function downloadFile(values) {
	return {
		type: 'DOWNLOAD_SHARED_FILE',
		payload: api.get(`/gsuite/file/${values.fileId}`),
	}
}

export function updateFolderId(values){
	return {
		type: 'UPDATE_FOLDER_ID_SHARED',
		payload: values,
	}
}

export function pushToStack(values) {
	return {
		type: 'PUSH_TO_STACK_SHARED',
		payload: values,
	}
}

export function popFromStack(values) {
	return {
		type: 'POP_FROM_STACK_SHARED',
		payload: values,
	}
}

