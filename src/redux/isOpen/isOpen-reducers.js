import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  setModalOpen,
  setDropListOpen,
  setContactEditOpen,
  setContactFormOpen,
} from './isOpen-actions';

const agreement = createReducer(false, {
  [setModalOpen]: (_, { payload }) => payload,
});

const dropList = createReducer(false, {
  [setDropListOpen]: (_, { payload }) => payload,
});

const contactEdit = createReducer(false, {
  [setContactEditOpen]: (_, { payload }) => payload,
});

const contactForm = createReducer(false, {
  [setContactFormOpen]: (_, { payload }) => payload,
});

export default combineReducers({
  agreement,
  dropList,
  contactEdit,
  contactForm,
});
