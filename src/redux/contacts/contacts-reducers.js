import { createReducer} from "@reduxjs/toolkit";
import { changeFilter} from './contacts-actions';

const filterReducer = createReducer('', {
    [changeFilter]: (_, {payload}) => payload,
});

export default filterReducer;


