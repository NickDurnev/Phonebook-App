import { createReducer, combineReducers} from "@reduxjs/toolkit";
import { setModalOpen, setDropListOpen, setContactInfoOpen } from "./isOpen-actions";

const agreement = createReducer(false, {
    [setModalOpen]: (_, { payload }) => payload,
});

const dropList = createReducer(false, {
    [setDropListOpen]: (_, { payload }) => payload,
})

const contactInfo = createReducer(false, {
    [setContactInfoOpen]: (_, { payload }) => payload,
})

export default combineReducers({
    agreement,
    dropList,
    contactInfo,
});