import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import styled, { keyframes } from 'styled-components'
import { mdiPlus, mdiHelpCircleOutline  } from '@mdi/js'

import Logo from 'components/Logo'
import ActionBar from 'components/ActionBar'
import View from 'components/View'

const size = 75

const doRipple = keyframes`
	from {
		transform: scale(.1);
		opacity: .5;
	}
	to {
		transform: scale(2);
		opacity: 0;
	}
`

const Ripple = styled.div`
	border: 1px solid white;
	animation: ${doRipple} 4s ease-out infinite;
	border-radius: 50%;
	width: ${size}px;
	height: ${size}px;
	position: absolute;
	animation-delay: ${props => props.delay || 0};
`

const LogoContainer = styled.div`
	position: absolute;
	box-shadow: 0 0 5px black;
	display: grid;
	place-items: center;
	background-color: #333;
	border-radius: 50%;
	width: ${size}px;
	height: ${size}px;
	z-index: 2;
`

const RippleContainer = styled.div`
	display: grid;
	place-items: center;
	position: relative;
	height: ${size}px;
	width: ${size}px;
	margin: 20px;
`

const Centered = styled.div`
	display: grid;
	place-items: center;
	height: 100%;
`

const Rows = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

export default function Waiting ({addAction, helpAction, ...props}) {
	const actions = {
		left: {
			icon: mdiPlus,
			label: 'Add link',
			action: addAction,
			title: "Add a link to share"
		},
		right: {
			icon: mdiHelpCircleOutline,
			action: helpAction,
			title: "Info",
			size: 1.5
		}
	}
	return (
		<View className="fadeIn" key="waiting">
			<ActionBar actions={actions} />
			<Centered {...props}>
				<Rows>
					<RippleContainer>
						<LogoContainer>
							<Logo style="fill: white" />
						</LogoContainer>
						<Ripple />
						<Ripple delay="-1s" />
						<Ripple delay="-2s" />
						<Ripple delay="-3s" />
					</RippleContainer>
					<p>Waiting for a link...</p>
				</Rows>
			</Centered>
		</View>
	)
}