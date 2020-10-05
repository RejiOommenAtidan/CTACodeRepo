import { STORE_DATAAPI } from '../../actions/masters/relationAction';
import { SET_CURRENT_SELECTED_RELATION } from '../../actions/masters/relationAction';


const initialRelationState = {
    lRelation: [],
    oCurrentRelation: {}
};

const RelationReducer = (state = initialRelationState, action) => {
    switch (action.type) {
        case STORE_DATAAPI:
            return { ...state, lRelation: action.lRelation };
        case SET_CURRENT_SELECTED_RELATION:
            return { ...state, oCurrentRelation: action.oCurrentRelation };
        default:
            return state;
    }
}

export default RelationReducer;