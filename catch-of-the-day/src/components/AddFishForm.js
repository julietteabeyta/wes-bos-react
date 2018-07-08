import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {

    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    static propTypes = {
        addFish: PropTypes.func
    }

    createFish = (e) => {
        e.preventDefault();

        // Capure all of the inputs in 
        // our form and create a fish
        const fish = {
          name: this.nameRef.value.value,
          price: parseFloat(this.priceRef.value.value),
          status: this.statusRef.value.value,
          desc: this.descRef.value.value,
          image: this.imageRef.value.value,
        }

        // Then once we have passed down the
        // addFish function from App (which is
        // the parent here and will hold state)
        // we will call that here and add the 
        // fish to it!
        this.props.addFish(fish);

        // Refresh the form
        e.currentTarget.reset();
    }

    render(){
        return(
            <form className="fish-edit" onSubmit={this.createFish}>
              <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
              <input name="price" ref={this.priceRef} type="text" placeholder="Price" />
              <select name="status" ref={this.statusRef}>
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold Out!</option>
              </select>
              <textarea name="desc" ref={this.descRef} placeholder="Desc"></textarea>
              <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
              <button type="submit">+ Add Fish</button>
            </form>
        );
    }
}

export default AddFishForm;