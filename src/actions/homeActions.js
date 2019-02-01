import api from './api';

export function getHomeData() {
	return {
		type: 'GET_HOME',
		payload: api.get(`/user_profile/`),
	};
}

export function resetHomeUnauthorized() {
	return {
		type: 'RESET_HOME_UNAUTHORIZED',
	};
}

export function getSupportTickets() {
	return {
		type: 'GET_SUPPORT_TICKETS',
		payload: api.get(`/youtrack/issues`),
	}
}

export function createIssue(data) {
	return {
		type: 'CREATE_ISSUE',
		payload: api.post(`/youtrack/create_issue/`, data) 
	}
}

export function getIssueEnv() {
	return {
		type: 'ISSUE_ENV',
		payload: api.get(`/youtrack/create_issue/`),
	}
}

export function createComment(data) {
	return {
		type: 'CREATE_COMMENT',
		payload: api.post(`/youtrack/issue/comment/`, data),
	}
}