import React from 'react'
import app from 'ampersand-app'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory  } from 'react-router'
import { Provider } from 'react-redux'
import { createHistory, useBasename } from 'history'
import ga from 'react-ga'

import './sass/main.scss'

import Main from './views/Main'

import Ttt from './views/ttt/Ttt'

import { Txt_page, PopUp_page, Contact, ErrorPage } from './views/pages'

import prep_env from './models/prep_env'

import store from './redux'



let renderSite = function () {
	return render((
		<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={Main}>

				<IndexRoute components={{mainContent: Txt_page}} />

				<Route path='/pg/(:page)' components={{mainContent: Txt_page}} />

				<Route path='/ttt' components={{mainContent: Ttt}} />

				<Route path='/pupg/(:pu_page)' components={{popup: PopUp_page}} />

				<Route path='/contact-us' components={{popup: Contact}} />

				<Route path='/error/404' components={{mainContent: ErrorPage}} />
				<Route path="*" components={{mainContent: ErrorPage}} />
			</Route>
		</Router>
		</Provider>
	), document.getElementById('root'))
}

// ----------------------------------------------------------------------
// This section is used to configure the global app
// ----------------------------------------------------------------------

window.app = app

app.extend({

	settings: {
		is_mobile: false,
		mobile_type: null,
		can_app: false,

		ws_conf: null,

		curr_user: null,

		user_ready: false,
		user_types: [],
		basket_type: null,
		basket_total: 0,

	},


	init () {

		prep_env(this.start.bind(this))

	},

	start_ga () {
		ga.initialize(app.settings.ws_conf.conf.ga_acc.an, { debug: true });
		// ga.pageview(location.pathname)
		const loclisten = browserHistory.listen((location) => {
			// ga.send('send', location);
			ga.pageview(location.pathname)
		})
	},

	start () {
		const history = useBasename(createHistory)({
			// basename: document.getElementsByTagName('base')[0] ? document.getElementsByTagName('base')[0].getAttribute('href') : ''
			basename: base_dir
		})

		this.start_ga()

		renderSite()
	},

	show_page (u) {
		switch(u) {
			case 'home':
				browserHistory.push('/')
				break

			default:
				console.log('show_page event with:', u) 
				browserHistory.push(u)
				break
		}
	},

	events: {
		show_message: 'show_message',
		show_page: 'show_page'
	},
})

app.init()

app.on(app.events.show_page, app.show_page)
