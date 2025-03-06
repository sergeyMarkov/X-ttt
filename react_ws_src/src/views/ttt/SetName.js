import React, {Component} from 'react'
import { connect } from 'react-redux'
import { SET_USER_NAME } from '../../redux'

class SetName extends Component {

	handleInputChange(e) {
        this.setState({ name: e.target.value });
    };

    saveName(e) {
        const { name } = this.state;
        const { onSetName } = this.props;
        onSetName(name.trim());
    };

	constructor (props) {
		super(props)
		this.state = {
			name: ''	
		}
	}

//	------------------------	------------------------	------------------------

	render () {
		return (
			<div id='SetName'>

				<h1>Enter Your Name</h1>

				<div ref='nameHolder' className='input_holder left'>
					<label>Name </label>
					<input type='text' className='input name' placeholder='Name' value={this.state.name} onChange={(e)=> this.handleInputChange(e)} />
				</div>


				<button type='submit' onClick={(e) => this.saveName(e)} className='button'>
					<span>Enter <span className='fa fa-caret-right'></span></span>
				</button>

			</div>
		)
	}


}

const mapDispatchToProps = (dispatch) => ({
	onSetName: (name) => dispatch({ type: SET_USER_NAME, payload: name })
  })
  

export default connect(null, mapDispatchToProps)(SetName)
