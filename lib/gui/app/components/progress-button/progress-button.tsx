/*
 * Copyright 2016 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';
import { ProgressBar } from 'rendition';
import { default as styled } from 'styled-components';
import { Color } from 'sys-class-rgb-led';

import { StepButton } from '../../styled-components';

const FlashProgressBar = styled(ProgressBar)`
	> div {
		width: 200px;
		height: 48px;
		color: white !important;
		text-shadow: none !important;
		transition-duration: 0s;
		> div {
			transition-duration: 0s;
		}
	}

	width: 200px;
	height: 48px;
	font-size: 16px;
	line-height: 48px;

	background: #2f3033;
`;

interface ProgressButtonProps {
	type: 'decompressing' | 'flashing' | 'verifying';
	active: boolean;
	percentage: number;
	label: string;
	disabled: boolean;
	callback: () => void;
}

export const decompressingColor: Color = [0, 0.682, 0.937];
export const flashingColor: Color = [0.855, 0.376, 1];
export const verifyingColor: Color = [0.102, 0.757, 0.212];

function colorToHex(color: Color) {
	return '#' + color.map((v) => Math.round(v * 255).toString(16)).join('');
}

const colors = {
	decompressing: colorToHex(decompressingColor),
	flashing: colorToHex(flashingColor),
	verifying: colorToHex(verifyingColor),
} as const;

export class ProgressButton extends React.Component<ProgressButtonProps> {
	public render() {
		if (this.props.active) {
			return (
				<FlashProgressBar
					background={colors[this.props.type]}
					value={this.props.percentage}
				>
					{this.props.label}
				</FlashProgressBar>
			);
		}
		return (
			<StepButton
				primary
				onClick={this.props.callback}
				disabled={this.props.disabled}
			>
				{this.props.label}
			</StepButton>
		);
	}
}
