import React, { Component} from 'react'
import { connect } from 'react-redux'
import { SET_USER_NAME, LOGOUT, SET_GAME_TYPE, SET_GAME_STEP } from '../../redux'
import SetName from './SetName'
import SetGameType from './SetGameType'
import GameMain from './GameMain'
import AdminLogs from './AdminLogs'

const setUserName = (name) => ({ type: SET_USER_NAME, payload: name });
const logout = () => ({ type: LOGOUT });
const setGameType = (gameType) => ({ type: SET_GAME_TYPE, payload: gameType });
const setGameStep = (step) => ({ type: SET_GAME_STEP, payload: step });


class Ttt extends Component {

  render() {

    const { game_step, curr_user, game_type, setUserName, logout, setGameType, setGameStep } = this.props;

    return (
      <section id="TTT_game">
        <div id="page-container">

          {game_step === "set_name" && <SetName onSetName={setUserName} />}

          {game_step !== "set_name" && (
            <div>
				      Welcome, <strong>{curr_user.name}</strong>&nbsp;<button onClick={logout}>Logout</button><br />        
				      {(curr_user.losses || curr_user.wins || curr_user.draws) && (<div>
				      <table id="scores">
        			<thead><tr><th>Wins</th><th>Losses</th><th>Draws</th></tr></thead>
        		  <tbody><tr><td>{curr_user.wins || '0'}</td><td>{curr_user.losses || '0'}</td><td>{curr_user.draws || '0'}</td></tr></tbody>
			        </table>
			        </div>)}
            </div>
          )}

          {game_step === "set_game_type" && <SetGameType onSetType={setGameType} />}
          {game_step === "start_game" && <GameMain game_type={game_type} onEndGame={() => setGameStep("set_game_type")} />}

          {curr_user.name === "admin" && <AdminLogs/>}
        </div>
      </section>
    );
  }
}

// Map Redux state to component props
const mapStateToProps = (state) => ({
  game_step: state.game_step,
  game_type: state.game_type,
  curr_user: state.curr_user,
});

// Map dispatch actions to props
const mapDispatchToProps = {
  setUserName,
  logout,
  setGameType,
  setGameStep,
};

// Connect Redux to React Component
export default connect(mapStateToProps, mapDispatchToProps)(Ttt);