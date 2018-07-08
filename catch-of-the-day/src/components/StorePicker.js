import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    myInput = React.createRef();
    static propTypes = {
        history: PropTypes.object,
    }

    goToStore = e => {
        //Stop the form from submitting-- 
        //without this a refresh will
        //be triggered which is not what
        //we want
        e.preventDefault();

        //Get the text from the input
        const storeName = this.myInput.value.value;

        //Change the page to /store/storeName
        //since react router is the top
        //level parent here, we have
        //access to it
        this.props.history.push(`/store/${storeName}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input
                  type="text"
                  ref={this.myInput}
                  required placeholder="Store Name"
                  defaultValue={getFunName()}
                />
                <button type="submit">Visit Store-></button>
            </form>
        )
    }
}

export default StorePicker;