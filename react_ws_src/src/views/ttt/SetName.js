import React, {Component} from 'react'

export default class SetName extends Component {

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

				<h1>Set Name</h1>

				<div ref='nameHolder' className='input_holder left'>
					<label>Name </label>
					<input type='text' className='input name' placeholder='Name' value={this.state.name} onChange={(e) => this.handleInputChange(e)} />
				</div>


				<button type='submit' onClick={(e) =>this.saveName(e)} className='button'><span>SAVE <span className='fa fa-caret-right'></span></span></button>

			</div>
		)
	}


}
