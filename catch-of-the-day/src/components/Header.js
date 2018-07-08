import React from 'react';
import PropTypes from 'prop-types';

// In this stateless functional
// component, we have used a 
// fat arrow function for which
// we pass in props (straight
// from the props passed from
// the component instance) to use

const Header = (props) => (
    <header className="top">
      <h1>Catch
              <span className="ofThe">
          <span className="of">Of</span>
          <span className="the">The</span>
        </span>
        Day</h1>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </header>
);

// Okay so for elements like this that 
// dont necessarily need to be dynamic
// or dont need data passed to it, we
// dont have to create this big ol'
// component for it, we can create a 
// stateless functional component (above)
// class Header extends React.Component {
//     render() {
//         return (
//           <header className="top">
//             <h1>Catch
//               <span className="ofThe">
//                 <span className="of">Of</span>
//                 <span className="the">The</span>
//               </span>
//             Day</h1>
//             <h3 className="tagline">
//                <span>{this.props.tagline}</span>
//             </h3>
//           </header>
//         );
//     }
// }

Header.propTypes = {
  tagline: PropTypes.string.isRequired
}

export default Header;