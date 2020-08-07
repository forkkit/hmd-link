import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import axios from 'redaxios'

import styled from 'styled-components'
import Icon from '@mdi/react'
import { mdiOpenInNew } from '@mdi/js'

import { usePreview } from 'util/hooks'
import { useDataContext } from '../util/context'
import Spinner from './Spinner'

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


const Thumbnail = styled('img')`
	display: block;
	background-color: white;
  	object-fit: cover;
	height: 100%;
	width: 100%;
	max-height: 200px;
`

const Card = styled('div')`
	color: white;
	background: rgb(50, 50, 50);
	background-color: none;
  	transition: transform .2s, box-shadow .2s; 
	&:hover {
		transform: scale(1.05);
		box-shadow: 0 0 10px black;
	}
`

const DivLink = styled('a')`
	&:hover {
		text-decoration: none;
	}
`

// Restricts number of vertical lines
const Description = styled('p')`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 3em;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`

const RightContainer = styled('div')`
	height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
	padding: 0;
`


const BottomRow = styled('div')`
	display: grid;
	grid-template-columns: 1fr auto;
`


const UrlText = styled('p')`
	margin-top: auto;
	margin-bottom: 0;
`
UrlText.defaultProps = {className: 'truncate-width'}

const UrlContainer = styled('div')`
	min-width: 0;
	display: flex;
`

const Centered = styled.div`
	display: grid;
	align-items: center;
`

export const Preview = () => {
	const {snapshot} = useDataContext()
	const [data, setTargetValidate] = usePreview()
	const [thumbnailReady, setThumbnailReady] = useState(false);

	useEffect(async () => {
		if (snapshot && snapshot.exists()) {
			const { url } = snapshot.val()
			setTargetValidate(url)
		}
	}, [snapshot])
	const preview = data && (
		<DivLink href={data.url} target="_blank" hidden={!thumbnailReady}>
			<Card className="row card-container shadowed">
				<div class="col-sm-12 col-md-4" style="padding: 0; height: auto;">
					<Thumbnail onLoad={() => setThumbnailReady(true)} src={data.thumbnail} alt="site-preview"></Thumbnail>
				</div>
				<div class="col-sm-12 col-md-8" style="padding: 10px">
					<RightContainer>
						<h2 class="truncate-width">{data.title}</h2>
						<Description>{data.description}</Description>
						<BottomRow>
							<UrlContainer>
								<UrlText>{data.url}</UrlText>
							</UrlContainer>
							<Centered>
								<Icon path={mdiOpenInNew} size={1} />
							</Centered>
						</BottomRow>
					</RightContainer>
				</div>
			</Card>
		</DivLink>
	)
	return (
		<>
		{preview} 
		{(!data || !thumbnailReady) && <Spinner />}
		</>
	)
}