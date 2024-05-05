import { Toaster } from 'react-hot-toast'
import Application from './Application'
import Loader from './components/common/Loader/Loader'
import { useAppSelector } from './app/hooks'

function App() {
	const { loading } = useAppSelector(state => state.loading);
	return (
		<>
			<Toaster />
			{loading && <Loader />}
			<Application />
		</>
	)
}

export default App
