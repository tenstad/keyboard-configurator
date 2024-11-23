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

let modifiers = Object.fromEntries(
	Object.entries({
		MOD_LCTL: {
			label: 'Left Control',
			keys: [keys.KC_LEFT_CTRL]
		},
		MOD_LSFT: {
			label: 'Left Shift',
			keys: [keys.KC_LEFT_SHIFT]
		},
		MOD_LALT: {
			label: 'Left Alt',
			keys: [keys.KC_LEFT_ALT]
		},
		MOD_LGUI: {
			label: 'Left GUI (Windows/Command/Meta key)',
			keys: [keys.KC_LEFT_GUI]
		},
		MOD_RCTL: {
			label: 'Right Control',
			keys: [keys.KC_RIGHT_CTRL]
		},
		MOD_RSFT: {
			label: 'Right Shift',
			keys: [keys.KC_RIGHT_SHIFT]
		},
		MOD_RALT: {
			label: 'Right Alt (AltGr)',
			keys: [keys.KC_RIGHT_ALT]
		},
		MOD_RGUI: {
			label: 'Right GUI (Windows/Command/Meta key)',
			keys: [keys.KC_RIGHT_GUI]
		},
		MOD_HYPR: {
			label: 'Hyper (Left Control, Shift, Alt and GUI)',
			keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_SHIFT, keys.KC_LEFT_ALT, keys.KC_LEFT_GUI]
		},
		MOD_MEH: {
			label: 'Meh (Left Control, Shift, and Alt)',
			keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_SHIFT, keys.KC_LEFT_ALT]
		}
	}).map(([mod, k]) => [mod, { ...k, mod }])
);

let keycodes_modifiers = {
	LCTL_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_CTRL],
		aliases: ['CTL_T']
	},
	LSFT_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_SHIFT],
		aliases: ['SFT_T']
	},
	LALT_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_ALT],
		aliases: ['LOPT_T', 'ALT_T', 'OPT_T']
	},
	LGUI_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_GUI],
		aliases: ['LCMD_T', 'LWIN_T', 'GUI_T', 'CMD_T', 'WIN_T']
	},
	RCTL_T: {
		group: 'mod-tap',
		keys: [keys.KC_RIGHT_CTRL]
	},
	RSFT_T: {
		group: 'mod-tap',
		keys: [keys.KC_RIGHT_SHIFT]
	},
	RALT_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_ALT],
		aliases: ['ROPT_T', 'ALGR_T']
	},
	RGUI_T: {
		side: 'Right',
		group: 'mod-tap',
		keys: [keys.KC_RIGHT_GUI],
		aliases: ['RCMD_T', 'RWIN_T']
	},
	LSG_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_SHIFT, keys.KC_LEFT_GUI],
		aliases: ['SGUI_T', 'SCMD_T', 'SWIN_T']
	},
	LAG_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_ALT, keys.KC_LEFT_GUI]
	},
	RSG_T: {
		group: 'mod-tap',
		keys: [keys.KC_RIGHT_SHIFT, keys.KC_RIGHT_GUI]
	},
	RAG_T: {
		group: 'mod-tap',
		keys: [keys.KC_RIGHT_ALT, keys.KC_RIGHT_GUI]
	},
	LCA_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_ALT]
	},
	LSA_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_SHIFT, keys.KC_LEFT_ALT]
	},
	RSA_T: {
		group: 'mod-tap',
		keys: [keys.KC_RIGHT_SHIFT, keys.KC_RIGHT_ALT],
		aliases: ['SAGR_T']
	},
	RCS_T: {
		group: 'mod-tap',
		keys: [keys.KC_RIGHT_CTRL, keys.KC_RIGHT_SHIFT]
	},
	LCAG_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_ALT, keys.KC_LEFT_GUI]
	},
	RCAG_T: {
		group: 'mod-tap',
		keys: [keys.KC_RIGHT_CTRL, keys.KC_RIGHT_ALT, keys.KC_RIGHT_GUI]
	},
	C_S_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_SHIFT]
	},
	MEH_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_SHIFT, keys.KC_LEFT_ALT]
	},
	HYPR_T: {
		group: 'mod-tap',
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_SHIFT, keys.KC_LEFT_ALT, keys.KC_LEFT_GUI],
		aliases: ['ALL_T']
	},
	LCTL: {
		group: 'mod',
		keys: [keys.KC_LEFT_CTRL],
		aliases: ['C']
	},
	LSFT: {
		group: 'mod',
		keys: [keys.KC_LEFT_SHIFT],
		aliases: ['S']
	},
	LALT: {
		group: 'mod',
		keys: [keys.KC_LEFT_ALT],
		aliases: ['A', 'LOPT']
	},
	LGUI: {
		group: 'mod',
		keys: [keys.KC_LEFT_GUI],
		aliases: ['G', 'LCMD', 'LWIN']
	},
	RCTL: {
		group: 'mod',
		keys: [keys.KC_RIGHT_CTRL]
	},
	RSFT: {
		group: 'mod',
		keys: [keys.KC_RIGHT_SHIFT]
	},
	RALT: {
		group: 'mod',
		keys: [keys.KC_LEFT_ALT],
		aliases: ['ROPT', 'ALGR']
	},
	RGUI: {
		side: 'Right',
		group: 'mod',
		keys: [keys.KC_RIGHT_GUI],
		aliases: ['RCMD', 'RWIN']
	},
	LSG: {
		group: 'mod',
		keys: [keys.KC_LEFT_SHIFT, keys.KC_LEFT_GUI],
		aliases: ['SGUI', 'SCMD', 'SWIN']
	},
	LAG: {
		group: 'mod',
		keys: [keys.KC_LEFT_ALT, keys.KC_LEFT_GUI]
	},
	RSG: {
		group: 'mod',
		keys: [keys.KC_RIGHT_SHIFT, keys.KC_RIGHT_GUI]
	},
	RAG: {
		group: 'mod',
		keys: [keys.KC_RIGHT_ALT, keys.KC_RIGHT_GUI]
	},
	LCA: {
		group: 'mod',
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_ALT]
	},
	LSA: {
		group: 'mod',
		keys: [keys.KC_LEFT_SHIFT, keys.KC_LEFT_ALT]
	},
	RSA: {
		group: 'mod',
		keys: [keys.KC_RIGHT_SHIFT, keys.KC_RIGHT_ALT],
		aliases: ['SAGR']
	},
	RCS: {
		group: 'mod',
		keys: [keys.KC_RIGHT_CTRL, keys.KC_RIGHT_SHIFT]
	},
	LCAG: {
		group: 'mod',
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_ALT, keys.KC_LEFT_GUI]
	},
	MEH: {
		group: 'mod',
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_SHIFT, keys.KC_LEFT_ALT]
	},
	HYPR: {
		group: 'mod',
		keys: [keys.KC_LEFT_CTRL, keys.KC_LEFT_SHIFT, keys.KC_LEFT_ALT, keys.KC_LEFT_GUI]
	},
	OSM: {
		group: 'osm',
		parameters: [
			{
				label: 'LSFT',
				mods: [modifiers.MOD_LSFT]
			},
			{
				label: 'LCTL',
				mods: [modifiers.MOD_LCTL]
			},
			{
				label: 'LALT',
				mods: [modifiers.MOD_LALT]
			},
			{
				label: 'LGUI',
				mods: [modifiers.MOD_LGUI]
			},
			{
				label: 'RSFT',
				mods: [modifiers.MOD_RSFT]
			},
			{
				label: 'RCTL',
				mods: [modifiers.MOD_RCTL]
			},
			{
				label: 'RALT',
				mods: [modifiers.MOD_RALT]
			},
			{
				label: 'RGUI',
				mods: [modifiers.MOD_RGUI]
			},
			{
				label: 'CS',
				mods: [modifiers.MOD_LCTL, modifiers.MOD_LSFT]
			},
			{
				label: 'CA',
				mods: [modifiers.MOD_LCTL, modifiers.MOD_LALT]
			},
			{
				label: 'CG',
				mods: [modifiers.MOD_LCTL, modifiers.MOD_LGUI]
			},
			{
				label: 'SA',
				mods: [modifiers.MOD_LSFT, modifiers.MOD_LALT]
			},
			{
				label: 'SG',
				mods: [modifiers.MOD_LSFT, modifiers.MOD_LGUI]
			},
			{
				label: 'AG',
				mods: [modifiers.MOD_LALT, modifiers.MOD_LGUI]
			},
			{
				label: 'RCS',
				mods: [modifiers.MOD_RCTL, modifiers.MOD_RSFT]
			},
			{
				label: 'RCA',
				mods: [modifiers.MOD_RCTL, modifiers.MOD_RALT]
			},
			{
				label: 'RCG',
				mods: [modifiers.MOD_RCTL, modifiers.MOD_RGUI]
			},
			{
				label: 'RSA',
				mods: [modifiers.MOD_RSFT, modifiers.MOD_RALT]
			},
			{
				label: 'RSG',
				mods: [modifiers.MOD_RSFT, modifiers.MOD_RGUI]
			},
			{
				label: 'RAG',
				mods: [modifiers.MOD_RALT, modifiers.MOD_RGUI]
			},
			{
				label: 'CSG',
				mods: [modifiers.MOD_LCTL, modifiers.MOD_LSFT, modifiers.MOD_LGUI]
			},
			{
				label: 'CAG',
				mods: [modifiers.MOD_LCTL, modifiers.MOD_LALT, modifiers.MOD_LGUI]
			},
			{
				label: 'SAG',
				mods: [modifiers.MOD_LSFT, modifiers.MOD_LALT, modifiers.MOD_LGUI]
			},
			{
				label: 'RCSG',
				mods: [modifiers.MOD_RCTL, modifiers.MOD_RSFT, modifiers.MOD_RGUI]
			},
			{
				label: 'RCAG',
				mods: [modifiers.MOD_RCTL, modifiers.MOD_RALT, modifiers.MOD_RGUI]
			},
			{
				label: 'RSAG',
				mods: [modifiers.MOD_RSFT, modifiers.MOD_RALT, modifiers.MOD_RGUI]
			},
			{
				label: 'Meh',
				mods: [modifiers.MOD_MEH]
			},
			{
				label: 'Hyper',
				mods: [modifiers.MOD_HYPR]
			}
		]
	}
};

export { keycodes_modifiers, modifiers };
