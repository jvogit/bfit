import React from 'react';
import ReactDOM from 'react-dom';
import App from "components/App";
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { LightTheme, BaseProvider } from 'baseui';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { TOKEN_VALIDATE } from "utils/store_constants";
import { ACCESS_TOKEN } from "utils/constants";
import rootReducer from "store/rootReducer";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import rootSaga from "sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
const engine = new Styletron();
const history = createBrowserHistory();
sagaMiddleware.run(rootSaga, { history });

if (localStorage.getItem(ACCESS_TOKEN)) {
  store.dispatch({ type: TOKEN_VALIDATE });
}

ReactDOM.render(
  <Provider store={store}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <App history={history}/>
      </BaseProvider>
    </StyletronProvider>
  </Provider>,
  document.getElementById('root')
);
