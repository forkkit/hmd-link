import { h, createContext } from 'preact'
import { useDummyUser } from 'util/hooks-dummy'
import { useContext, useState } from 'preact/hooks';

// Provide Firebase user
const UserContext = createContext(null);
export const UserProvider = ({children}) => {
	const user = useDummyUser(1000);
	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	)
}
export const useUserContext = () => useContext(UserContext)

// Provide info on the current screen and available actions
const initialActivityState = {
	name: null,
	leftAction: null,
	rightAction: null
}
const ActivityContext = createContext({
	activity: initialActivityState,
	setActivity: () => {}
})
export const ActivityProvider = ({children}) => {
	const [activity, setActivity] = useState(initialActivityState)
	return (
		<ActivityContext.Provider value={{activity, setActivity}}>
			{children}
		</ActivityContext.Provider>
	)
}
export const useActivityContext = () => useContext(ActivityContext)


const DataContext = createContext({
	snapshot: null,
	upload: () => {},
	delete: () => {}
})