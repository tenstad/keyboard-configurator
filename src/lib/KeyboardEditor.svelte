<script lang="ts">
	import { displayLabel, type KeyCombo } from './keys';
	import LabelGroup from './LabelGroup.svelte';

	let size = 60;
	let gap = 2;

	let { keyboard = $bindable(), keymap = $bindable() } = $props<{
		keyboard: Keyboard;
		keymap: Keymap;
	}>();

	let activeLayer: number = $state(0);
	let activeLayout: string = $state(
		Object.keys(keyboard.layouts).includes(keymap.layout)
			? keymap.layout
			: Object.keys(keyboard.layouts)[0]
	);
	let layer: KeyCombo[] = $derived([
		...keymap.layers[activeLayer].map(displayLabel),
		...Array(1000)
			.keys()
			.map(() => ({ upper: [[{ text: 'N/A', type: 'raw' }]] }))
	]);

	let dragged: number | undefined = $state(undefined);
	let draggedOver: number | undefined = $state(undefined);

	function handleDragStart(e: any, i: number) {
		dragged = i;
	}
	function handleDragEnd(e: any, i: number) {
		dragged = undefined;
	}
	function handleDragOver(e: any, i: number) {
		draggedOver = i;
	}
	function handleDragExit(e: any, i: number) {
		draggedOver = undefined;
	}
	function handleDrop(e: any, i: number) {
		if (dragged !== undefined) {
			let key = keymap.layers[activeLayer][dragged];
			keymap.layers[activeLayer][dragged] = keymap.layers[activeLayer][i];
			keymap.layers[activeLayer][i] = key;
		}
		draggedOver = undefined;
	}
</script>

<div>
	<div>
		<div>
			{#each Object.keys(keyboard?.layouts) as layout}
				<button
					class="rounded-md border border-gray-200 bg-gray-100 p-2 text-xs font-semibold text-gray-800"
					onclick={() => (activeLayout = layout)}>{layout}</button
				>
			{/each}
		</div>
		<div>
			{#each Object.keys(keymap?.layers) as _, i}
				<button
					class="rounded-md border border-gray-200 bg-gray-100 p-2 text-xs font-semibold text-gray-800"
					onclick={() => (activeLayer = i)}>{i}</button
				>
			{/each}
			<button
				class="rounded-md border border-gray-200 bg-gray-100 p-2 text-xs font-semibold text-gray-800"
				onclick={() => keymap.layers.push(keyboard.layouts[activeLayout].layout.map(() => 'KC_NO'))}
				>+</button
			>
		</div>
	</div>

	<div class="relative">
		{#each keyboard.layouts[activeLayout].layout as key, i}
			<div
				class="absolute"
				role="cell"
				tabindex={i}
				ondragover={(e) => {
					e.preventDefault();
					handleDragOver(e, i);
				}}
				ondragexit={(e) => handleDragExit(e, i)}
				ondragleave={(e) => handleDragExit(e, i)}
				ondrop={(e) => handleDrop(e, i)}
				style:left={`${(size + gap) * key.x}px`}
				style:top={`${(size + gap) * key.y}px`}
				style:width={`${size}px`}
				style:height={`${size}px`}
			>
				<div
					class={(i === draggedOver
						? 'bg-amber-300 dark:bg-amber-600'
						: 'bg-black opacity-5 dark:opacity-15') + ' absolute h-full w-full rounded-md'}
				></div>
				<div style:opacity={i == dragged ? 0 : 1}>
					<div
						class={(i === dragged || i === draggedOver
							? 'bg-amber-300 dark:bg-amber-600 dark:text-white '
							: 'bg-white text-neutral-800 hover:bg-amber-300 hover:text-black' +
								' dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-amber-600 dark:hover:text-white') +
							' absolute flex h-full w-full flex-col items-center justify-center rounded-md text-center'}
						draggable="true"
						role="button"
						tabindex={i}
						ondragstart={(e) => handleDragStart(e, i)}
						ondragend={(e) => handleDragEnd(e, i)}
					>
						{#each [[layer[i].upper, false, layer[i].lower != undefined], [layer[i].lower, true, layer[i].upper != undefined]] as [labelGroups, isLower, otherExists]}
							{#if labelGroups !== undefined}
								<div class="flex flex-row items-center gap-1">
									{#each labelGroups as labelGroup}
										<LabelGroup {labelGroup} {labelGroups} {isLower} {otherExists} />
									{/each}
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
