import { createReducer, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import {
  setModalOpen,
  setDropListOpen,
  setContactEditOpen,
  setContactFormOpen,
} from './isOpen-actions';


const agreement = createReducer(false, {
  [setModalOpen.type]: (_, { payload } : PayloadAction<boolean>) => payload,
});

const dropList = createReducer(false, {
  [setDropListOpen.type]: (_, { payload }: PayloadAction<boolean>) => payload,
});

const contactEdit = createReducer(false, {
  [setContactEditOpen.type]: (_, { payload }: PayloadAction<boolean>) => payload,
});

const contactForm = createReducer(false, {
  [setContactFormOpen.type]: (_, { payload }: PayloadAction<boolean>) => payload,
});

export default combineReducers({
  agreement,
  dropList,
  contactEdit,
  contactForm,
});
