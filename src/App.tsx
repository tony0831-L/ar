import { store } from './libs/store';
import { Provider } from 'react-redux';
import Example from "./views/example"

export default function App() {
  return (
    <Provider store={store}>
      <Example url={'http://localhost:5000/test/find'} />
    </Provider>
  )
}
