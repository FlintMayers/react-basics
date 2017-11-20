import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './Movie';
import {debounce} from 'throttle-debounce';


// function sum(a, b) {
//     return a +b;
// };
//
// const sumEs = (a, b) => a + b;
//
// const user = {
//     email: 'John Doe',
//     age: 25
// }
//
// const {email, age} = user;
//
// class HelloWorld extends React.Component {
//     state = {
//       counter: 0
//     };
//
//     onCounterChange = (isDecrement) => {
//         let {counter} = this.state;
//         if(isDecrement) {
//             counter--;
//         } else {
//             counter++;
//         }
//
//         this.setState({counter})
//         // console.log(this);
//         // console.log(e.target);
//         // this.setState({counter: this.state.counter + 1});
//     }
//
//     onCounterChangeDecrement = () => {
//         // console.log(this);
//         this.setState({counter: this.state.counter - 1});
//     }
//
//     render() {
//         return (
//             <div className="wrapper">
//                 <h1>Hello {this.props.user} and I'm {this.props.age} from {this.props.location}.</h1>
//                 <hr/>
//                 <br/>
//                 <h2>{this.state.counter}</h2>
//                 <button onClick={this.onCounterChange.bind(this, false)}>Increment</button>
//                 <button onClick={this.onCounterChange.bind(this, true)}>Decrement</button>
//             </div>
//         )
//     }
// }
//
// ReactDOM.render(<HelloWorld user="John Doe" age={25} location="Vilnius"/>, document.getElementById('root') );

// Promise.resolve(1)
//     .then((vienas) => vienas+1)
//     .then((du) => du+1)
//     .then((trys) => trys+1)
// ;

class MovieSeach extends React.Component {

    constructor() {
        super();
        this.onRequest = debounce(150, this.onRequest);
    }

    state = {
        input: '',
        movie: {},
        isLoaded: true,
    }

    componentWillMount() {
        this.onRequest();
    }

    onUserSearch = (e) => {
        e.target.value = e.target.value.replace(/[^A-Z  a-z0-9\s]/g, "");
        this.onRequest(e.target.value);
    };


    onRequest = (value = 'fast') => {
        this.setState({isLoaded: false});
        fetch(`http://www.omdbapi.com/?t=${value}&apikey=467d0dcc`)
            .then(response => response.json())
            .then(json => this.setState({movie: json, isLoaded: true}))
    };

    render() {
        if (!this.state.isLoaded) {
            var loading = <h4>Loading...</h4>
        }
        if (this.state.isLoaded) {
            var loading = '';
        }
        return (
            <div>
                <h1>Movies</h1>
                <Movie {...this.state.movie}/>
                {loading}
                <input type="text" onChange={this.onUserSearch}/>
            </div>
        )
    }
}

ReactDOM.render(<MovieSeach/>, document.getElementById('root') );