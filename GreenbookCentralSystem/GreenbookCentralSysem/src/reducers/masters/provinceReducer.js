import { STORE_DATAAPI } from '../../actions/masters/provinceAction';
import { SET_CURRENT_SELECTED_PROVINCE } from '../../actions/masters/provinceAction';


const initialProvinceState = {
    lProvince: [],
    oCurrentProvince: {}
};

const ProvinceReducer = (state = initialProvinceState, action) => {
    switch (action.type) {
        case STORE_DATAAPI:
            return { ...state, lProvince: action.lProvince };
        case SET_CURRENT_SELECTED_PROVINCE:
            return { ...state, oCurrentProvince: action.oCurrentProvince };
        default:
            return state;
    }
}

export default ProvinceReducer;