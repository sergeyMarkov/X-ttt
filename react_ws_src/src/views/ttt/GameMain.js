import React, {Component} from 'react'
import { connect } from 'react-redux'
import { SET_CELL_VALUE, SET_GAME_STAT, SET_GAME_TYPE, SET_WIN, SET_FAIL } from '../../redux'
import io from 'socket.io-client'

import TweenMax from 'gsap'

import rand_arr_elem from '../../helpers/rand_arr_elem'
import rand_to_fro from '../../helpers/rand_to_fro'

import { winSets } from '../../constants/winSets'
import { CONNECTING, GAME_STAT, OPPONENT_TURN, WAITING_OPPONENT, YOUR_TURN } from '../../constants/en'

class SetName extends Component {

	constructor(props) {
		super(props);	

		const isLive = this.props.game_type && this.props.game_type === 'live';
		
		this.state = {
		  cell_vals: {},
		  next_turn_ply: true,
		  game_play: !isLive,
		  game_stat: isLive ? WAITING_OPPONENT : GAME_STAT.START_GAME
		};

	  }

//	------------------------	------------------------	------------------------

	componentDidMount () {
		this.setupSocket();
		// animate game elements
    	TweenMax.from('#game_stat', 1, {display: 'none', opacity: 0, scaleX:0, scaleY:0, ease: Power4.easeIn})
    	TweenMax.from('#game_board', 1, {display: 'none', opacity: 0, x:-200, y:-200, scaleX:0, scaleY:0, ease: Power4.easeIn})
		this.props.setGameStat(this.state.game_stat);
	}

//	------------------------	------------------------	------------------------

	setupSocket () {

		const { curr_user } = this.props;

		if (this.props.game_type !== 'live') return;

		this.socket = io(app.settings.ws_conf.loc.SOCKET__io.u);

		this.socket.on('connect', () => { 
			// console.log('connect with new player', curr_user);
			this.socket.emit('new player', { name: curr_user.name });
		})

		this.socket.on('pair_players', (data) => { 
			// console.log('pair_players', data)
			this.setState({
				next_turn_ply: data.mode=='m',
				game_play: true,
				game_stat: 'Playing with ' + data.opp.name
			})

		})

		this.socket.on('opp_turn', this.turn_opp_live.bind(this));

	}

//	------------------------	------------------------	------------------------
//	------------------------	------------------------	------------------------

	componentWillUnmount () {
		if (this.socket) {
			this.socket.disconnect();
		}
	}

//	------------------------	------------------------	------------------------

	cell_cont (c) {
		const { cell_vals } = this.state

		return (<div>
		        	{cell_vals && cell_vals[c]=='x' && <i className="fa fa-times fa-5x"></i>}
					{cell_vals && cell_vals[c]=='o' && <i className="fa fa-circle-o fa-5x"></i>}
				</div>)
	}

//	------------------------	------------------------	------------------------

	setCellClassName (i, j) {
		const cellId = i * 3 + j + 1;
		let css = ''
    	if (cellId === 2 || cellId === 5 || cellId === 8) { css += 'vbrd' } 
		if (cellId === 4 || cellId === 5 || cellId === 6) { css += ' hbrd' }
    	return css;
  	}


//	------------------------	------------------------	------------------------

	render () {
		const { game_stat, game_play, next_turn_ply } = this.state

		return (
			<div id="GameMain">
				<h1>Play {this.props.game_type}</h1>

				<div id="game_stat">
					<div id="game_stat_msg">{game_stat}</div>
					{game_play && <div id="game_turn_msg">{next_turn_ply ? YOUR_TURN : OPPONENT_TURN}</div>}
				</div>

				<div id="game_board">
					<table className={(game_stat === WAITING_OPPONENT || !next_turn_ply || game_stat === CONNECTING) ? 'disabled' : '' }>
					<tbody>
						{Array.from({ length: 3 }, (_, i) => (
                			<tr key={i}>
                  				{Array.from({ length: 3 }, (_, j) => {
                    				const cellId = `c${i * 3 + j + 1}`;
                    				return (
                      					<td
                        					key={cellId}
                        					id={`game_board-${cellId}`}
                        					ref={cellId}
                        					onClick={(e) => this.click_cell(e)}
                        					className={this.setCellClassName(i, j)}
                      					>{this.cell_cont(cellId)}</td>
                    				)
                  				})}
                			</tr>
              			))}
					</tbody>
					</table>
				</div>

				<button type='submit' onClick={this.end_game.bind(this)} className='button'>
					<span>End Game <span className='fa fa-caret-right'></span></span>
				</button>

			</div>
		)
	}

//	------------------------	------------------------	------------------------
//	------------------------	------------------------	------------------------

	click_cell (e) {
		if (!this.state.next_turn_ply || !this.state.game_play) return

		const cell_id = e.currentTarget.id.replace("game_board-", "")
		
		if (this.state.cell_vals[cell_id]) return

		if (this.props.game_type != 'live')
			this.turn_ply_comp(cell_id)
		else
			this.turn_ply_live(cell_id)
	}

//	------------------------	------------------------	------------------------
//	------------------------	------------------------	------------------------

	turn_ply_comp (cell_id) {

		let { cell_vals } = this.state

		cell_vals[cell_id] = 'x'

		TweenMax.from(this.refs[cell_id], 0.7, {opacity: 0, scaleX:0, scaleY:0, ease: Power4.easeOut})

		this.props.setCellValue(cell_vals);

		this.state.cell_vals = cell_vals

		this.check_turn()
	}

//	------------------------	------------------------	------------------------

	turn_comp () {

		let { cell_vals } = this.state
		let empty_cells_arr = []

		for (let i=1; i<=9; i++)  {
			!cell_vals['c'+i] && empty_cells_arr.push('c'+i)
		}

		const c = rand_arr_elem(empty_cells_arr)
		cell_vals[c] = 'o'

		TweenMax.from(this.refs[c], 0.7, {opacity: 0, scaleX:0, scaleY:0, ease: Power4.easeOut})

		this.props.setCellValue(cell_vals);

		this.state.cell_vals = cell_vals

		this.check_turn()
	}


//	------------------------	------------------------	------------------------
//	------------------------	------------------------	------------------------

	turn_ply_live (cell_id) {

		let { cell_vals } = this.state

		cell_vals[cell_id] = 'x'

		TweenMax.from(this.refs[cell_id], 0.7, {opacity: 0, scaleX:0, scaleY:0, ease: Power4.easeOut})

		this.socket.emit('ply_turn', { cell_id: cell_id });

		this.props.setCellValue(cell_vals);

		this.state.cell_vals = cell_vals

		this.check_turn()
	}

//	------------------------	------------------------	------------------------

	turn_opp_live (data) {

		let { cell_vals } = this.state

		const c = data.cell_id
		cell_vals[c] = 'o'

		TweenMax.from(this.refs[c], 0.7, {opacity: 0, scaleX:0, scaleY:0, ease: Power4.easeOut})

		this.state.cell_vals = cell_vals

		this.check_turn()
	}

//	------------------------	------------------------	------------------------
//	------------------------	------------------------	------------------------
//	------------------------	------------------------	------------------------

	check_turn () {

		const { cell_vals } = this.state

		let win = false
		let set
		let fin = true

		if (this.props.game_type!='live')
			this.state.game_stat = 'Play'


		for (let i=0; !win && i < winSets.length; i++) {
			set = winSets[i]
			if (cell_vals[set[0]] && cell_vals[set[0]] == cell_vals[set[1]] && cell_vals[set[0]] == cell_vals[set[2]])
				win = true
		}

		for (let i=1; i<=9; i++) {
			!cell_vals['c'+i] && (fin = false)
		}

		if (win) {
		
			this.refs[set[0]].classList.add('win')
			this.refs[set[1]].classList.add('win')
			this.refs[set[2]].classList.add('win')

			TweenMax.killAll(true)
			TweenMax.from('td.win', 1, {opacity: 0, ease: Linear.easeIn})

			if (cell_vals[set[0]] == 'x') {
				this.props.setGameStat(GAME_STAT.YOU_WIN)
				this.props.setWin()
			} else {
				this.props.setGameStat(GAME_STAT.OPPONENT_WIN)
				this.props.setFail()
			}

			this.setState({
				game_stat: cell_vals[set[0]] == 'x' ? GAME_STAT.YOU_WIN : GAME_STAT.OPPONENT_WIN,
				game_play: false
			})

			this.socket && this.socket.disconnect();

		} else if (fin) {
		
			this.setState({
				game_stat: GAME_STAT.DRAW,
				game_play: false
			})

			this.props.setGameStat(GAME_STAT.DRAW)

			this.socket && this.socket.disconnect();

		} else {
			this.props.game_type!='live' && this.state.next_turn_ply && setTimeout(this.turn_comp.bind(this), rand_to_fro(500, 1000));

			this.setState({
				next_turn_ply: !this.state.next_turn_ply
			})
		}
		
	}

//	------------------------	------------------------	------------------------

	end_game () {
		if (this.socket) {
			this.socket.disconnect();
		}
		this.props.onEndGame()
		this.props.setGameType('')
	}

}

const mapStateToProps = (state) => ({
	game_step: state.game_step,
	game_type: state.game_type,
	curr_user: state.curr_user,
});


const mapDispatchToProps = dispatch => ({
	setCellValue: (cell_vals) => dispatch({ type: SET_CELL_VALUE, payload: cell_vals }),
	setGameStat: (gameStat) => dispatch({ type: SET_GAME_STAT, payload: gameStat }),
	setGameType: (gameType) => dispatch({ type: SET_GAME_TYPE, payload: gameType }),
	setWin: () => dispatch({ type: SET_WIN }),
	setFail: () => dispatch({ type: SET_FAIL })
});


export default connect(mapStateToProps, mapDispatchToProps)(SetName);
