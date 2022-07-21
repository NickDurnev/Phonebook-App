const getFilter = rootReducer => rootReducer.filter;

const getFilteredContacts = (contacts, rootState) => {
    const filter = getFilter(rootState);
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
    );
};

export default getFilteredContacts;