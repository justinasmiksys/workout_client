import vars from './vars'

export async function updateTokenRequest(authTokens) {
    return await fetch(`${vars.host}api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'refresh': authTokens?.refresh
        })
    })
}

export async function loginRequest(username, password) {
    return await fetch(`${vars.host}api/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'username': username, 
            'password': password
        })
    })
}

export async function signupRequest(username, email, password) {
    return await fetch(`${vars.host}api/signup/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'username': username,
            'email': email,
            'password': password
        })
    })
}

export async function getExercisesRequest(authTokens) {
    return await fetch(`${vars.host}api/exercises/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
}

export async function getExerciseRequest(authTokens, id) {
    return await fetch(`${vars.host}api/exercises/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
}

export async function postWorkoutRequest(authTokens, title, hex, exercises) {
    return await fetch(`${vars.host}api/postworkout/`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            hex,
            exercises
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
}

export async function putWorkoutRequest(authTokens, oldTitle, newTitle, hex, exercises) {
    return await fetch(`${vars.host}api/putworkout/`, {
        method: 'PUT',
        body: JSON.stringify({
            oldTitle:oldTitle,
            newTitle:newTitle,
            hex,
            exercises
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
}

export async function getWorkoutsRequest(authTokens) {
    return await fetch(`${vars.host}api/workouts/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
}

export async function getWorkoutRequest(authTokens, id) {
    return fetch(`${vars.host}api/workouts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
}

export async function deleteWorkoutRequest(authTokens, id) {
    return await fetch(`${vars.host}api/deleteworkout/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
}

export async function getMusclesRequest(authTokens) {
    return await fetch(`${vars.host}api/muscles/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
}

export async function getEventsRequest(authTokens) {
    return await fetch(`${vars.host}api/events/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
}

export async function postEventRequest(authTokens, eventDate, workoutId) {
    return await fetch(`${vars.host}api/postevent/`, {
        method: 'POST',
        body: JSON.stringify({
            eventDate,
            workoutId
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
}

export async function deleteEvent(authTokens, id) {
    return await fetch(`${vars.host}api/deleteevent/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }
    })
}