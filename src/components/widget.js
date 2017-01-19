// theirs
import { h, Component } from 'preact';

// ours
import SigninWidget from './signin';

export default class Widget extends Component {
  render() {
    console.log(this.props)
    let hideFacebook = this.props.hideFacebook || false
    return (
			<div id="signin-widget">

        <SigninWidget />
			</div>
    );
  }
}
