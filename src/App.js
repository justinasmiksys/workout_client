import './_App.scss';
import { CssBaseline } from '@mui/material'
import PrivateRoute from './utils/PrivateRoute'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ButtonAppBar from './components/ButtonAppBar'
import { AuthProvider } from './context/AuthContext'
import CalendarPage from './pages/CalendarPage';
import CreateWorkoutPage from './pages/CreateWorkoutPage';

import Calendar from './components/Calendar'
import WorkoutDetails from './components/WorkoutDetails'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <AuthProvider>
          <ButtonAppBar />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<HomePage />} exact/>
              <Route path='/workouts' element={<CalendarPage />}>
                <Route path=':id' element={<WorkoutDetails />}/>
                <Route path='calendar' element={<Calendar />}/>
              </Route>
              <Route path='/newworkout' element={<CreateWorkoutPage />}/>
              <Route path='/editworkout' element={<CreateWorkoutPage />}/>
            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
