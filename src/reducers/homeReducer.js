const initialState = {
    homeData:{},
    supportTickets: [],
    issueEnv: [],
    unauthorized:false
}
export default function (state = initialState, action={}) {
	switch (action.type) {		
    case `GET_HOME_LOADING`:
        return {
            ...state,
            isLoading: true,
            success: false,
            error: false
        };

    case `GET_HOME_SUCCESS`:
        state.homeData = action.payload.data;
        return {
            ...state,
            isLoading: false,
            success: true,
            error: false
        };

    case `GET_HOME_ERROR`:
        if(action.payload.response.status == 401){
            // state.unauthorized = true;
            window.location = action.payload.response.data.data.logout_url
        }
        state.homeData = {};
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };
    case `GET_SUPPORT_TICKETS_LOADING`:
        state.supportTickets = [];
        return {
            ...state,
            isLoading: true,
            success: false,
            error: false
        };

    case `GET_SUPPORT_TICKETS_SUCCESS`:
        return {
            ...state,
            isLoading: false,
            supportTickets: action.payload.data,
            success: true,
            error: false
        };

    case `GET_SUPPORT_TICKETS_ERROR`:
        if(action.payload.response.status == 401){
            window.location = action.payload.response.data.data.logout_url
        }
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };
    case `CREATE_ISSUE_LOADING`:
        return {
            ...state,
            isLoading: true,
            success: false,
            error: false
        };

    case `CREATE_ISSUE_SUCCESS`:
        return {
            ...state,
            isLoading: false,
            success: true,
            error: false
        };

    case `CREATE_ISSUE_ERROR`:
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };
    case `ISSUE_ENV_LOADING`:
        return {
            ...state,
            isLoading: true,
            success: false,
            error: false
        };

        case `ISSUE_ENV_SUCCESS`:
        return {
            ...state,
            isLoading: false,
            issueEnv: action.payload.data,
            success: true,
            error: false
        };

    case `ISSUE_ENV_ERROR`:
            if(action.payload.response.status == 401){
                window.location = action.payload.response.data.data.logout_url
            }
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };
    case `CREATE_COMMENT_LOADING`:
        return {
            ...state,
            isLoading: true,
            success: false,
            error: false
        };

    case `CREATE_COMMENT_SUCCESS`:
        return {
            ...state,
            isLoading: false,
            success: true,
            error: false
        };

    case `CREATE_COMMENT_ERROR`:
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };
    case `RESET_HOME_UNAUTHORIZED`:
        state.unauthorized = false;    
        return {
            ...state,
        }
    default:
        return {
            ...state,
        };
	}
}