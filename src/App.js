import './App.css';
import Auth from './pages/auth';
import {Switch, Route } from 'react-router-dom'
import Admin from './pages/admin';
import {useDispatch,useSelector} from 'react-redux'
import Modal from 'react-modal';
import Dashboard from './pages/dashboard';
Modal.setAppElement('#root')
function App() {
  const dispatch = useDispatch()
  const showmessage = useSelector(state => state.messageReducer.showmessage)
  const message= useSelector(state => state.messageReducer.message)
  const isadminLoggedin = useSelector(state => state.admin.isadminLoggedin)
  const isuserLoggedin = useSelector(state => state.user.isuserLoggedin)
  return (
    <div className="App">
        <Switch>
          <Route path='/' exact>
            <Auth />
          </Route> 
          {isadminLoggedin && 
          <Route path='/admin'>
            <Admin />
          </Route>
           }
          {isuserLoggedin && 
            <Route path='/user'>
              <Dashboard />
            </Route>
          }
        </Switch>
        <Modal isOpen={showmessage} 
             style={
                 {
                     overlay: {
                         background: 'rgba(0,0,0,0.5)',
                        },
                    content: {
                        color: 'lightsteelblue',
                        padding: '0px',
                        top: '40%',
                        left: '35%',
                        right: '35%',
                        bottom: '40%',
                        textAlign:'center'
                    }
                 }
             }
            >
                <div className='sucessfulmodal'>
                    <span>{message}</span>
                    <button className='sucessfulmodal_button' onClick={()=> dispatch({type:'messages',payload:''})}>Done</button>
                </div>
            </Modal>
    </div>
  );
}

export default App;
