const initialState = {
    companyData:[],
    isLoading:false,
    breadcrumbStack:[],
    folderId:''
}
export default function (state = initialState, action={}) {
	switch (action.type) {		
    case `GET_COMPANY_DATA_LOADING`:
        return {
            ...state,
            isLoading: true,
            success: false,
            error: false
        };

    case `GET_COMPANY_DATA_SUCCESS`:
        state.companyData = action.payload.data.data;
        return {
            ...state,
            isLoading: false,
            success: true,
            error: false
        };

    case `GET_COMPANY_DATA_ERROR`:
        state.companyData = [];
        if(action.payload.response.status == 401){
            window.location = action.payload.response.data.data.logout_url
        }
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };
    case `GET_COMPANY_FOLDER_DATA_LOADING`:
        return {
            ...state,
            isLoading: true,
            success: false,
            error: false
        };

    case `GET_COMPANY_FOLDER_DATA_SUCCESS`:
        state.companyData = action.payload.data.data;
        return {
            ...state,
            isLoading: false,
            success: true,
            error: false
        };

    case `GET_COMPANY_FOLDER_DATA_ERROR`:
        state.companyData = [];
        if(action.payload.response.status == 401){
            window.location = action.payload.response.data.data.logout_url
        }
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };

    case `PUSH_TO_STACK`:
        let tempArray = [];
        state.breadcrumbStack.map((item, index) => {
            tempArray.push(item)
        })
        tempArray.push(action.payload);
        state.breadcrumbStack = tempArray;
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };

    case `POP_FROM_STACK`:
        if(action.payload.index == -1){
            state.breadcrumbStack = [];
        }else{
            let temporaryArray = [...state.breadcrumbStack];
            temporaryArray.splice(action.payload.index + 1, temporaryArray.length)
            state.breadcrumbStack = temporaryArray;
        }
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };

    case `UPDATE_COMPANY_FOLDER_ID`:
        if(action.payload.id){
            state.folderId = action.payload.id;
        }else{
            state.folderId = action.payload.folderId;
        }
        return {
            ...state,
            isLoading: false,
            success: false,
            error: true
        };
    default:
        return {
            ...state,
        };
	}
}