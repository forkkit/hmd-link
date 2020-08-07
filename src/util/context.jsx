import { h, createContext } from 'preact'
import { useUser, useData } from 'util/hooks'
import { useDummyUser } from 'util/hooks-dummy'
import { useContext, useState } from 'preact/hooks';

// Provide Firebase user
const UserContext = createContext(null);
export const UserProvider = ({children}) => {
	const user = useUser()
	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	)
}
export const useUserContext = () => useContext(UserContext)

// Provide info on the current screen and available actions
const initialActions = {
	leftAction: null,
	rightAction: null
}
const ActivityContext = createContext({
	actions: initialActions,
	setActions: () => {},
	setIntent: () => {},
})
export const ActivityProvider = ({children}) => {
	const [actions, setActions] = useState(initialActions)
	const [intent, setIntent] = useState('wait')
	return (
		<ActivityContext.Provider value={{actions, setActions, intent, setIntent}}>
			{children}
		</ActivityContext.Provider>
	)
}
export const useActivityContext = () => useContext(ActivityContext)


const DataContext = createContext({
	snapshot: null,
	upload: () => {},
	clear: () => {}
})
export const DataProvider = ({children}) => {
	const user = useUserContext();
	const [snapshot, upload, clear] = useData(user);
	return (
		<DataContext.Provider value={{snapshot, upload, clear}}>
			{children}
		</DataContext.Provider>
	)
}
export const useDataContext = () => useContext(DataContext)