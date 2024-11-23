import { knownKeys } from '../keycodes';

type KeyCombo = {
	upper: Label[][];
	lower: Label[][] | undefined;
};
type Label = TextLabel | IconLabel;
type TextLabel = {
	text: string;
	type: string;
};
type IconLabel = {
	icon: string;
	text?: string;
};

function key(raw: string): Label[][] {
	if (!(raw in knownKeys.keys)) {
		return [
			[
				{
					text: raw,
					type: 'raw'
				}
			]
		];
	}

	let key = knownKeys.keys[raw].fullKey ?? raw;
	if (key in icons.keys) {
		return [[{ icon: icons.keys[key] }]];
	}

	let text = knownKeys.keys[raw].label.replace(' (dead)', '');
	if (key in abbreviations) {
		text = abbreviations[key];
	}
	return [[{ text, type: 'text' }]];
}

function mod(raw: string): Label[][] | undefined {
	if (!(raw in knownKeys.modifiers)) {
		return undefined;
	}

	return [
		knownKeys.modifiers[raw].keys.map(({ key }) => ({
			icon: icons.modifiers[key]
		}))
	];
}

// Bluetooth
// RGB
// QMK (bootloader)
// Mouse
// lighting
// ctrl + insert, alt + lshift

function keyCombo(raw: string): KeyCombo {
	raw = raw.replaceAll(' ', '');
	let inner = raw;
	let outer = undefined;
	let outerParam = undefined;
	if (inner.includes('(')) {
		if (inner.includes(',')) {
			outer = inner.split(',')[0];
			inner = inner.slice(outer.length + 1, inner.length - 1);
			[outer, outerParam] = outer.split('(');
		} else {
			outer = inner.split('(')[0];
			inner = inner.slice(outer.length + 1, inner.length - 1);
		}
	}
	let upper = key(inner);
	let lower = undefined;

	if (outer !== undefined) {
		if (outer.endsWith('_T')) {
			lower = mod(outer) ?? key(outer);
		} else if (outer == 'MT' && outerParam !== undefined) {
			let mods = outerParam.split('|').map((p) => p.slice(4));
			if (mods.every((p) => p in knownKeys.modifiers)) {
				lower = mods.map((p) => mod(p)).flat();
			} else {
				lower = key(outer);
			}
		} else if (outer == 'LM' && outerParam !== undefined) {
			let mods = inner.split('|').map((p) => p.slice(4));
			if (mods.every((p) => p in knownKeys.modifiers)) {
				upper = mods.map((p) => mod(p)).flat();
			} else {
				upper = key(outer + ' ' + outerParam);
			}
			upper = [...upper, [{ icon: 'LUCIDE_LAYERS_2_OPEN', text: outerParam }]];
			// lower = [[{ text: 'LM', type: 'raw' }]];
		} else if (outer == 'LT') {
			lower = [[{ icon: 'LUCIDE_LAYERS_2' }], [{ text: outerParam, type: 'text' }]];
		} else if (['MO', 'TG', 'TO', 'TT', 'DF', 'OSL'].includes(outer)) {
			upper = [[{ icon: 'LUCIDE_LAYERS_2' }], [{ text: inner, type: 'text' }]];
			lower = [[{ text: outer, type: 'raw' }]];
		} else if (outer == 'OSM') {
			upper = mod(inner.slice(4)) ?? key(inner);
			lower = [[{ text: outer, type: 'raw' }]];
		} else if (outer in knownKeys.modifiers) {
			upper = [...mod(outer), ...upper];
		} else {
			lower = [[{ text: outer, type: 'raw' }]];
		}
	}
	return { upper, lower };
}

function splitLabel(label: string): string[] {
	return label
		.replace('(', '(<word-break>')
		.replace(')', ')<word-break>')
		.replace('_', '_<word-break>')
		.replace('+', '+<word-break>')
		.split('<word-break>')
		.map((str) => {
			let chunks = [];
			while (str.length > 0) {
				if (str.length < 7) {
					chunks.push(str);
					break;
				} else {
					chunks.push(str.substring(0, 7));
					str = str.substring(7);
				}
			}
			return chunks;
		})
		.flat();
}

const abbreviations = {
	KC_NO: ' ',
	KC_DELETE: 'Del',
	KC_PAGE_UP: 'PgUp',
	KC_PAGE_DOWN: 'PgDn',
	KC_LEFT_GUI: 'L GUI',
	KC_RIGHT_GUI: 'R GUI',
	KC_LEFT_SHIFT: 'L Shift',
	KC_RIGHT_SHIFT: 'R Shift',
	KC_RIGHT_ALT: 'R Alt',
	KC_LEFT_ALT: 'L Alt',
	KC_LEFT_CTRL: 'L Ctrl',
	KC_RIGHT_CTRL: 'R Ctrl',
	KC_PRINT_SCREEN: 'PrtScr',
	KC_SCROLL_LOCK: 'ScrLk'
};

const icons = {
	keys: {
		KC_LEFT: 'LUCIDE_ARROW_LEFT',
		KC_RIGHT: 'LUCIDE_ARROW_RIGHT',
		KC_UP: 'LUCIDE_ARROW_UP',
		KC_DOWN: 'LUCIDE_ARROW_DOWN',
		KC_BACKSPACE: 'LUCIDE_DELETE',
		KC_ENTER: 'LUCIDE_CORNER_DOWN_LEFT',
		KC_SPACE: 'LUCIDE_SPACE',
		KC_CAPS_LOCK: 'LUCIDE_ARROW_BIG_UP_DASH',
		KC_TAB: 'LUCIDE_ARROW_LEFT_RIGHT_TO_LINE',
		KC_BRIGHTNESS_UP: 'LUCIDE_SUN',
		KC_BRIGHTNESS_DOWN: 'LUCIDE_SUN_DIM',
		KC_AUDIO_VOL_UP: 'LUCIDE_VOLUME_2',
		KC_KB_VOLUME_UP: 'LUCIDE_VOLUME_2',
		KC_AUDIO_VOL_DOWN: 'LUCIDE_VOLUME_1',
		KC_KB_VOLUME_DOWN: 'LUCIDE_VOLUME_1',
		KC_AUDIO_MUTE: 'LUCIDE_VOLUME_OFF',
		KC_SYSTEM_POWER: 'LUCIDE_POWER_OFF',
		KC_MEDIA_PREV_TRACK: 'LUCIDE_SKIP_BACK',
		KC_MEDIA_NEXT_TRACK: 'LUCIDE_SKIP_FORWARD',
		KC_MEDIA_REWIND: 'LUCIDE_REWIND',
		KC_MEDIA_FAST_FORWARD: 'LUCIDE_FAST_FORWARD',
		KC_APPLICATION: 'LUCIDE_SQUARE_MENU'
	},
	modifiers: {
		KC_LEFT_GUI: 'LUCIDE_DIAMOND',
		KC_RIGHT_GUI: 'LUCIDE_DIAMOND',
		KC_LEFT_SHIFT: 'LUCIDE_ARROW_BIG_UP',
		KC_RIGHT_SHIFT: 'LUCIDE_ARROW_BIG_UP',
		KC_RIGHT_ALT: 'LUCIDE_ALT',
		KC_LEFT_ALT: 'LUCIDE_ALT',
		KC_LEFT_CTRL: 'LUCIDE_CHEVRON_UP',
		KC_RIGHT_CTRL: 'LUCIDE_CHEVRON_UP'
	}
};

export { keyCombo as displayLabel, splitLabel };
export type { KeyCombo, Label };
