import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

/*
const App = () => {

    return (
        <div className="">Latitude: </div>
    );
}
*/

// We are creating a class of App with one method(render)
// we are borrowing the functionality from React.Component by extending and subclassing it
class App extends React.Component {
    // This is equivalent to the constructor function
    state = { lat: null, errorMessage: '' };

    // The componentDidMount method is where you should use calls to APIs
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            // This is the success callback, position contains the latitude
            // this is how we update our state object
            // we called set state
            (position) => this.setState({ lat: position.coords.latitude }),
            // This is the failure callback
            (err) => this.setState({ errorMessage: err.message })
        );
    }

    // This is a helper function
    renderContent() {
        // If we have an error message and we do not have latitude then return error message
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }
        // If we do not have an error message and have a latitude then return latitude
        if (!this.state.errorMessage && this.state.lat) {
            // we are taking a property from state and passing as a prop
            // down to the SeasonDisplay
            // SeasonDisplay will be rerendered since it is a child of App
            return <SeasonDisplay lat={this.state.lat} />
        }
    
        // return loading
        return <Spinner message="Please accept location request" />;
    }

    // React says we have to define render!!!
    // conditional rendering
    // we usually do not want conditionals in the render
    // we want to put them into a helper method
    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }

    /*
    // Instantly called before anything else
    // A good way to initialize state
    // This overrides the constructor inside React.Component
    constructor(props) {
        // Ceremonial process
        // Reference to the parents constructor function
        // Have to do this when we define constructor function inside class based component
        // If not we get an error
        super(props);

        // Initializes our "state" object
        // Important data goes inside the object (in this case latitude or lat)
        // we don't know the latitude yet so default to null
        // THIS IS THE ONLY TIME we do direct assiggment to this.state
        this.state = { lat: null, errorMessage: '' };
    */
    
    //These are types of lifecycle methods
    /*
    componentDidMount() {
        console.log('My component was rendered to the screen');
    }

    componentDidUpdate() {
        console.log('My component was just updated - it rendered!');
    }
    */
}

ReactDOM.render(
    <App />,
    document.querySelector('#root'));