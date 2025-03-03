import React, {Component} from 'react'

export default class SetGameType extends Component {


	constructor(props) {
		super(props);
		this.selTypeLive = this.selTypeLive.bind(this);
		this.selTypeComp = this.selTypeComp.bind(this);
	}

	selTypeLive() {
		this.props.onSetType('live');
	};

	selTypeComp() {
		this.props.onSetType('comp');
	};

//	------------------------	------------------------	------------------------

	render () {
		return (
			<div id='SetGameType'>

				<h1>Choose game type</h1>

				<div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>

					<button type='submit' onClick={this.selTypeLive} className='button long'>
						<span>Live against another player <span className='fa fa-caret-right'></span></span>
					</button>
					
					<button type='submit' onClick={this.selTypeComp} className='button long'>
						<span>Against a computer <span className='fa fa-caret-right'></span></span>
					</button>

				</div>

			</div>
		)
	}


}
