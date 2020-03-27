export function isCreationSuccess(state) {
    return state.pages.products.addPage.creationSucces;
}

export function isProcessingCreation(state) {

    return state.pages.products.addPage.creationLoading;
}

export function hasErrorOcurred(state) {

    return state.pages.products.addPage.creationError;
}