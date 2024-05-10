import './App.css'
import AddItem from './components/AddItem'
// import Input from './components/Input'
// import PersonsList from './components/PersonsList'
import SignIn from './components/SignIn'
import { HashRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';


const App: React.FC = () => {

  return (
    <>
     {/* <Input />
     <PersonsList /> */}
     {/* <SignIn />
     <AddItem /> */}

    <Router>
      <div>
        <Header />
        <Route path="/">
          <Main />
        </Route>
      </div>
    </Router>

    </>
  )
}

export default App