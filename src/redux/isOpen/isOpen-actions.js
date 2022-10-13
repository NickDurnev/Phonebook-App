import { createAction } from '@reduxjs/toolkit';

export const setModalOpen = createAction('isOpen/agreement');
export const setDropListOpen = createAction('isOpen/dropList');
export const setContactEditOpen = createAction('isOpen/contactEdit');
export const setContactFormOpen = createAction('isOpen/contactForm');
