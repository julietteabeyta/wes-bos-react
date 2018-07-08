import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';
import firebase from 'firebase';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        addFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
        storeId: PropTypes.string
    };
    
    state = {
        uid: null,
        owner: null,
    };

    componentDidMount() {
        //When we load the inventory, we want to see
        //whether the user is already authenticated
        //so we will check here and if we already have
        //a uesr, and then pass that in to the authHandler 
        //which will do all of our checks
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.authHandler({ user });
            }
        });
    }
    //Sometimes when you only need state in one
    //component, you can set it in that component
    authHandler = async(authData) => {
        //First we need to look up the current
        //store in the Firebase database
        const store = await base.fetch(this.props.storeId, {context: this});

        //Then we want to claim the store if 
        //there is no owner
        if(!store.owner){
            //save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }

        //Set state of the inventory component
        //to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid,
        });
    };

    authenticate = provider =>{
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }

    render(){
        const logout = <button onClick={this.logout}>Log Out!</button>
        //First we want to check if the
        //user is already logged in
        if(!this.state.uid){
            return <Login authenticate={ this.authenticate }/>
        }

        //Then we will check if they are
        //the owner of the store
        if(this.state.uid !== this.state.owner){
            return(
                <div>
                  <p>Sorry! You are not the owner of this store.</p>
                  { logout }
                </div>
            )
        }

        //If we have made it here, then they must
        //be the owner of the store so lets show
        //them their inventory!
        return(
            <div className="inventory">
              <h2>Inventory</h2>
              { logout }
              {Object.keys(this.props.fishes).map(key => 
                <EditFishForm
                key={ key }
                index={ key }
                fish={ this.props.fishes[key] }
                updateFish={ this.props.updateFish }
                deleteFish={ this.props.deleteFish }
                />
              )}
              <AddFishForm addFish={ this.props.addFish } />
              <button onClick={ this.props.loadSampleFishes }>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;