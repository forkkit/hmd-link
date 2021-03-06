import { h, render } from 'preact'
import { UserProvider, DataProvider } from 'util/context'

import 'mini.css/dist/mini-dark.min.css'
import 'style.css'
import styled from 'styled-components'

import Header from 'components/Header'
import Content from 'components/Content'
import StatusChip from 'components/StatusChip'

const Sections = styled.div`
	display: grid;
	grid-template-rows: auto 1fr auto;
	min-height: 100%;
`

const Scaffold = ({children}) => {
	return (
		<div className="container" style="height: inherit;">
			<div class="row" style="height: inherit;">
				<Sections className="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
					{children}
				</Sections>
			</div>
		</div>
	)
}

const App = () => {
	// The app has 3 main sections, labeled below
	return(
		<Scaffold>
			<Header />  {/* 1 */}
			<UserProvider>
				<DataProvider>
					<Content /> {/* 2 */}
				</DataProvider>
				<StatusChip /> {/* 3 */}
			</UserProvider>
		</Scaffold>
	)
}

render(<App />, document.body);
