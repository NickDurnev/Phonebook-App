import { createReducer} from "@reduxjs/toolkit";
import { light} from '../../themes';
import changeTheme from "./theme-actions";

const themeReducer = createReducer(light, {
    [changeTheme]: (_, { payload }) => payload,
});

export default themeReducer;