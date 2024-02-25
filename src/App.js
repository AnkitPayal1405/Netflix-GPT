import { Provider } from 'react-redux';

import appStore from './utils/appStore';
import Body from './Components/Body';

function App() {
  return (
 
    <div className="App">
      <Provider store={appStore}>
      <Body/>
      </Provider>
    </div>
  );
}

export default App;
