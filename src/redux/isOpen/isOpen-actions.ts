import { createAction } from '@reduxjs/toolkit';

export const setModalOpen = createAction<boolean, 'isOpen/agreement'>('isOpen/agreement');
export const setDropListOpen = createAction<boolean, 'isOpen/dropList'>('isOpen/dropList');
export const setContactEditOpen = createAction<boolean, 'isOpen/contactEdit'>('isOpen/contactEdit');
export const setContactFormOpen = createAction<boolean, 'isOpen/contactForm'>('isOpen/contactForm');