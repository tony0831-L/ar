import { store } from './libs/utils/store';
import { Provider } from 'react-redux';
import Example from "./views/example"
import Editor from './views/editor';
import AR from './views/Ar';

export default function App() {
  return (
    <Provider store={store}>
      {/* <Example url={'http://ininder.peiyu.me:3306/test/find'} /> */}
      {/* <Editor url={'https://dev.ethci.org/test/find?id=63d8c1a35a1251d714880b87'}/> */}
      <AR url={'https://dev.ethci.org/test/find?id=63d8c1a35a1251d714880b87'}/>
    </Provider>
  )
}
