import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardCmp from './Card';


/* To run a single file:
npm run test -- src/components/Card.spec.js */

describe('Card Component', () => {


    it('Should render Card component and its children', () => {
        // Given
        // When
        const container = shallow(
            <CardCmp title="Title" imageUrl="ImageUrl" />);


        // Then
        expect(container.find(Card).length).to.equal(1);
        expect(container.find(CardActionArea).length).to.equal(1);
        expect(container.find(CardContent).length).to.equal(1);
        expect(container.find(CardActions).length).to.equal(1);
        expect(container.find(CardMedia).length).to.equal(1);
        expect(container.find(CardMedia).props().image).to.equal("ImageUrl");
        expect(container.find(CardMedia).props().title).to.equal("Title");
        expect(container.find(CardMedia).props().alt).to.equal("Title");
        expect(container.find(Typography).text()).to.equal("Title");

        expect(container.find(Button).length).to.equal(2);
        expect(container.find(Button).at(0).props().startIcon.type.displayName).to.equal("EditIcon");
        expect(container.find(Button).at(1).props().startIcon.type.displayName).to.equal("DeleteIcon");
        /*
        Returns a string of the rendered HTML markup of the entire current render tree
         (not just the shallow-rendered part). It uses static rendering internally. 
        To see only the shallow-rendered part use .debug().*/

        console.log("Full Rendered Html ", container.html())
        console.log("Only the shallow Rendered ", container.debug())

    });



});
