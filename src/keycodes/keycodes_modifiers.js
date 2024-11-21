let keys = Object.fromEntries(
	Object.entries({
		KC_LEFT_GUI: {
			label: 'Left GUI'
		},
		KC_RIGHT_GUI: {
			label: 'Right GUI'
		},
		KC_LEFT_SHIFT: {
			label: 'Left Shift'
		},
		KC_RIGHT_SHIFT: {
			label: 'Right Shift'
		},
		KC_LEFT_ALT: {
			label: 'Left Alt'
		},
		KC_RIGHT_ALT: {
			label: 'Right Alt'
		},
		KC_LEFT_CTRL: {
			label: 'Left Control'
		},
		KC_RIGHT_CTRL: {
			label: 'Right Control'
		}
	}).map(([key, k]) => [key, { ...k, key }])
);

export default {
	LCTL: {
		keys: [keys.KC_LEFT_CTRL],
		aliases: ['C', 'CTL']
	},
	LSFT: {
		keys: [keys.KC_LEFT_SHIFT],
		aliases: ['S']
	},
	LALT: {
		keys: [keys.KC_LEFT_ALT],
		aliases: ['A', 'LOPT']
	},
	LGUI: {
		keys: [keys.KC_LEFT_GUI],
		aliases: ['G', 'LCMD', 'LWIN']
	},
	RCTL: {
		keys: [keys.KC_RIGHT_CTRL]
	},
	RSFT: {
		keys: [keys.KC_RIGHT_SHIFT]
	},
	RALT: {
		keys: [keys.KC_LEFT_ALT],
		aliases: ['ROPT', 'ALGR']
	},
	RGUI: {
		side: 'Right',
		keys: [keys.KC_RIGHT_GUI],
		aliases: ['RCMD', 'RWIN']
	},
	LSG: {
		keys: [keys.KC_LEFT_SHIFT, keys.KC_LEFT_GUI],
		aliases: ['SGUI', 'SCMD', 'SWIN']
	},
	LAG: {
		keys: [keys.KC_LEFT_ALT, keys.KC_LEFT_GUI]
	},
	RSG: {
		keys: [keys.KC_RIGHT_SHIFT, keys.KC_RIGHT_GUI]
	},
	RAG: {
		keys: [keys.KC_RIGHT_ALT, keys.KC_RIGHT_GUI]
	},
	LCA: {
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_ALT]
	},
	LSA: {
		keys: [keys.KC_LEFT_SHIFT, keys.KC_LEFT_ALT]
	},
	RSA: {
		keys: [keys.KC_RIGHT_SHIFT, keys.KC_RIGHT_ALT],
		aliases: ['SAGR']
	},
	RCS: {
		keys: [keys.KC_RIGHT_CTRL, keys.KC_RIGHT_SHIFT]
	},
	C_S: {
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_SHIFT]
	},
	LCAG: {
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_ALT, keys.KC_LEFT_GUI]
	},
	RCAG: {
		keys: [keys.KC_RIGHT_CTRL, keys.KC_RIGHT_ALT, keys.KC_RIGHT_GUI]
	},
	MEH: {
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_SHIFT, keys.KC_LEFT_ALT]
	},
	HYPR: {
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_SHIFT, keys.KC_LEFT_ALT, keys.KC_LEFT_GUI],
		aliases: ['ALL']
	}
};
