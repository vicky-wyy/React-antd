/* 引入createStore，专门用于创建redux中最为核心的store对象 */
import { createStore, applyMiddleware} from 'redux'
// 引入redux开发工具
import { composeWithDevTools } from 'redux-devtools-extension'
// 引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
// 引入为组件服务的reducer
import reducer from './reducer'

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

