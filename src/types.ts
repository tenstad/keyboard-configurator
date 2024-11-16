type Keyboard = {
	layouts: { [_: string]: Layout };
};

type Layout = {
	layout: LayoutKey[];
};

type LayoutKey = {
	matrix: [number, number];
	x: number;
	y: number;
};

type Keymap = {
	keyboard: string | undefined;
	keymap: string | undefined;
	layout: string | undefined;
	host_language: string | undefined;
	layers: KeyCode[][];
};

type KeyCode = string;
