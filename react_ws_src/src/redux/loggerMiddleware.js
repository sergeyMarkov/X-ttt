export const loggerMiddleware = store => next => action => {

    const logEntry = JSON.stringify({
        timestamp: new Date().toISOString(),
        actionType: action.type,
        payload: action.payload
    });

    fetch('/log', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: logEntry
    }).catch(err => console.error('Logging failed:', err));

    return next(action);
};
