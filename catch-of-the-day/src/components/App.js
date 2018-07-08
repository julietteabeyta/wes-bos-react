import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component{

    state = {
        fishes: {},
        order: {},
    };

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        //Lets pass in what we need to save
        //the state we want to our database
        const params = this.props.match.params;

        //First reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeId);

        if(localStorageRef){
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this, 
            state: 'fishes'
        });
    }
    
    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order) );
    }

    componentWillUnmount() {
        //Lets make sure we remove the ref
        //to our database once the component
        //is no longer there/holding state
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        // So now that we have made it here
        // we need to set the fish to state.
        // This will be a three-step process:
        // 1. Take a copy of the existing state
        //  ==> state is immutable
        const fishes = {...this.state.fishes};
        // 2. Add our new fish to the copy
        // that we just made of state
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set that new object to state 
        this.setState({ fishes });
    };

    loadSampleFishes = () =>{
        this.setState({fishes: sampleFishes});
    };

    addToOrder = key =>{
        // this.setState({order: somethingsomething});
        // 1. Take a copy of the existing state
        //  ==> state is immutable
        const order = { ...this.state.order };

        // 2. Add that fish to our order or
        // increment the number of that fish
        //in the copy that we just made of state
        order[key] = order[key] + 1 || 1;

        // 3. Set that new object to state 
        this.setState({ order });
    };

    updateFish = (key, updatedFish) => {
        //First!!!!! Take a copy of current
        //state
        const fishes = { ...this.state.fishes };
        //Then update the fist that has been
        //edited
        fishes[key] = updatedFish;
        //Set that to state
        this.setState({ fishes });
    };

    deleteFish = key => {
        //TAKE A COPY OF STATE
        const fishes = {...this.state.fishes}
        //Update the fish you want to delete
        //by setting it to null to delete
        fishes[key] = null;
        //Update state!
        this.setState({ fishes });
    };

    removeFromOrder = (key) => {
        //TAKE A COPY OF STATE
        const order = { ...this.state.order }
        //Update the order by deleting
        //the fish from it
        delete order[key];
        //Update state!
        this.setState({ order });
    }

    render(){
        return(
          <div className="catch-of-the-day">
              <div className="Menu">
                <Header tagline="Fresh Seafood Marked"/>
                <ul className="fishes">
                { Object.keys(this.state.fishes).map((fish) => {
                    let fishData = this.state.fishes[fish];
                    return (
                        <Fish
                          key={ fish }
                          index={ fish }
                          details={ fishData }
                          addToOrder={ this.addToOrder }
                        />
                    );
                })}
                </ul>
              </div>
              <Order 
                fishes={ this.state.fishes }
                order={ this.state.order }
                removeFromOrder={this.removeFromOrder }
              />
              <Inventory
                addFish={ this.addFish }
                loadSampleFishes={ this.loadSampleFishes }
                fishes={ this.state.fishes }
                updateFish={ this.updateFish }
                deleteFish={ this.deleteFish }
                storeId={ this.props.match.params.storeId }
              />
          </div>
        )
    }
}

export default App;