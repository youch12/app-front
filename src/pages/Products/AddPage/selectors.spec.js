import { expect } from 'chai';
import * as selectors from './selectors';


describe('AddPage/selectors', () => {

    it('Should select values when all are provided', () => {
        // Given
        const state = {
            pages: {
                products: {
                    addPage:
                    {
                        creationLoading: true,
                        creationSucces: false,
                        creationError: false,
                    }
                }
            }
        };

        // When
        const creationLoading = selectors.isProcessingCreation(state);
        const creationSucces = selectors.isCreationSuccess(state);
        const creationError = selectors.hasErrorOcurred(state);

        // Then
        expect(creationLoading).to.be.true;
        expect(creationSucces).to.be.false;
        expect(creationError).to.be.false;



    });

});
