import { store } from './libs/store';
import { Provider } from 'react-redux';
import Example from "./views/example"
import Editor from './views/editor';

export default function App() {
  return (
    <Provider store={store}>
      {/* <Example url={'http://ininder.peiyu.me:3306/test/find'} /> */}
      <Editor url={'http://ininder.peiyu.me:3306/test/find'}/>
    </Provider>
  )
}
