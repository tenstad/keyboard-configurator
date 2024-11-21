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
};

function key(raw: string): Label[][] {
	if (!(raw in knownKeys)) {
		return [
			[
				{
					text: raw,
					type: 'raw'
				}
			]
		];
	}

	let key = knownKeys[raw].fullKey ?? raw;
	if (key in icons) {
		return [[{ icon: icons[key] }]];
	}

	let text = knownKeys[raw].label.replace(' (dead)', '');
	if (key in abbreviations) {
		text = abbreviations[key];
	}
	return [[{ text, type: 'text' }]];
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
			outer = outer.slice(0, outer.length - 2);
			if (outer in modifiers) {
				let mods = modifiers[outer].labels;
				lower = [
					mods.length > 3 ? [mods[2], mods[3], mods[0], mods[1], ...mods.slice(4)] : mods.reverse()
				];
			} else {
				lower = key(outer + '_T');
			}
		} else if (outer == 'MT' && outerParam !== undefined) {
			let outerParams = outerParam.split('|').map((p) => p.slice(4));
			if (outerParams.every((p) => p in modifiers)) {
				let mods = outerParams.map((p) => modifiers[p].labels).flat();
				lower = [mods];
			} else {
				lower = key(outer);
			}
		} else if (outer == 'LT') {
			lower = [[{ icon: 'LUCIDE_LAYERS_2' }], [{ text: outerParam, type: 'text' }]];
		} else if (['MO', 'TG', 'TO', 'TT', 'DF', 'OSL'].includes(outer)) {
			upper = [[{ icon: 'LUCIDE_LAYERS_2' }], [{ text: inner, type: 'text' }]];
			lower = [[{ text: outer, type: 'raw' }]];
		} else if (outer == 'OSM') {
			if (inner.slice(4) in modifiers) {
				let mods = modifiers[inner.slice(4)].labels;
				upper = [
					mods.length > 3 ? [mods[2], mods[3], mods[0], mods[1], ...mods.slice(4)] : mods.reverse()
				];
			} else {
				upper = key(inner);
			}
			lower = [[{ text: outer, type: 'raw' }]];
		} else if (outer in modifiers) {
			let mods = modifiers[outer].labels;
			upper = [
				mods.length > 3 ? [mods[2], mods[3], mods[0], mods[1], ...mods.slice(4)] : mods.reverse(),
				...upper
			];
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

const CONTROL = {
	name: 'Control',
	icon: 'LUCIDE_CHEVRON_UP'
};
const SHIFT = {
	full: 'Shift',
	icon: 'LUCIDE_ARROW_BIG_UP'
};
const ALT = {
	full: 'Alt',
	icon: 'LUCIDE_ALT'
};
const GUI = {
	full: 'GUI',
	icon: 'LUCIDE_DIAMOND'
};

const modifiers = Object.fromEntries(
	Object.entries({
		LCTL: {
			side: 'Left',
			keys: [CONTROL],
			aliases: ['C', 'CTL']
		},
		LSFT: {
			side: 'Left',
			keys: [SHIFT],
			aliases: ['S']
		},
		LALT: {
			side: 'Left',
			keys: [ALT],
			aliases: ['A', 'LOPT']
		},
		LGUI: {
			side: 'Left',
			keys: [GUI],
			aliases: ['G', 'LCMD', 'LWIN']
		},
		RCTL: {
			side: 'Right',
			keys: [CONTROL]
		},
		RSFT: {
			side: 'Right',
			keys: [SHIFT]
		},
		RALT: {
			side: 'Left',
			keys: [ALT],
			aliases: ['ROPT', 'ALGR']
		},
		RGUI: {
			side: 'Right',
			keys: [GUI],
			aliases: ['RCMD', 'RWIN']
		},
		LSG: {
			side: 'Left',
			keys: [SHIFT, GUI],
			aliases: ['SGUI', 'SCMD', 'SWIN']
		},
		LAG: {
			side: 'Left',
			keys: [ALT, GUI]
		},
		RSG: {
			side: 'Right',
			keys: [SHIFT, GUI]
		},
		RAG: {
			side: 'Right',
			keys: [ALT, GUI]
		},
		LCA: {
			side: 'Left',
			keys: [CONTROL, ALT]
		},
		LSA: {
			side: 'Left',
			keys: [SHIFT, ALT]
		},
		RSA: {
			side: 'Right',
			keys: [SHIFT, ALT],
			aliases: ['SAGR']
		},
		RCS: {
			side: 'Right',
			keys: [CONTROL, SHIFT]
		},
		C_S: {
			side: 'Left',
			keys: [CONTROL, SHIFT]
		},
		LCAG: {
			side: 'Left',
			keys: [CONTROL, ALT, GUI]
		},
		RCAG: {
			side: 'Right',
			keys: [CONTROL, ALT, GUI]
		},
		MEH: {
			side: 'Left',
			keys: [CONTROL, SHIFT, ALT]
		},
		HYPR: {
			side: 'Left',
			keys: [CONTROL, SHIFT, ALT, GUI],
			aliases: ['ALL']
		}
	})
		.map(([code, { side, keys, aliases }]) =>
			[...(aliases ?? []), code].map((code) => [
				code,
				{
					side,
					keys,
					description: `Hold ${keys.map((key) => side + ' ' + key.name).join(', ')} and press`,
					labels: keys.map(({ icon }) => ({ icon }))
				}
			])
		)
		.flat()
);

const icons = {
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
};

export { keyCombo as displayLabel, splitLabel };
export type { KeyCombo, Label };
