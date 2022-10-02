import { createAction } from '@reduxjs/toolkit';

export const setModalOpen = createAction('isOpen/agreement');
export const setDropListOpen = createAction('isOpen/dropList');
export const setContactInfoOpen = createAction('isOpen/contactInfo');
export const setContactFormOpen = createAction('isOpen/contactForm');
