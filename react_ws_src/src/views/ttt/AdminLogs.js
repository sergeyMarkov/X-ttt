import React, { Component } from 'react';

export default class AdminLogs extends Component {
    constructor(props) {
        super(props);
        this.state = { logs: [] };
    }

    componentDidMount() {
        this.fetchLogs();
    }

    fetchLogs() {
		fetch('/logs.txt') // Adjust the path to your log file
			.then(response => {
				if (!response.ok) {
					throw new Error('Failed to fetch logs');
				}
				return response.text(); // Read response as text
			})
			.then(data => {
				this.setState({ logs: data.split('\n') }); // Split lines for better display
			})
			.catch(error => {
				console.error('Error fetching logs:', error);
				this.setState({ logs: ['Error loading logs.'] });
			});
	}
	

    render() {
        return (
            <div id="AdminLogs">
                <h2>Logs</h2>
                <pre style={{ background: '#222', color: '#fff', padding: '10px' }}>
                    {this.state.logs.join('\n')}
                </pre>
            </div>
        );
    }
}
