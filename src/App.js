import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import './App.css'
import Checkout from './JS/Checkout'
import { store } from './store'
import { getInfoProducts } from './store/info.thunk'
// import Checkout from './TS/Checkout';

function AppContent() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getInfoProducts())
    }, [dispatch])

    return (
        <div className="App">
            <Checkout />
        </div>
    )
}
const App = () => {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    )
}

export default App
