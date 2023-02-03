import { createAction } from "@reduxjs/toolkit";

const changeTheme = createAction<{}, 'theme/change'>('theme/change');

export default changeTheme;