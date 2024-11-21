<script lang="ts">
	import { keyDefinitions } from '../keycodes';
	import { displayLabel, type KeyCombo } from './keys';
	import LabelGroup from './LabelGroup.svelte';
	import TabButton from './TabButton.svelte';

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
	let layers: KeyCombo[][] = $derived([
		...keymap.layers.map((layer: KeyCode[]) =>
			keyboard.layouts[activeLayout].layout.map((_, i: number) =>
				i < layer.length ? displayLabel(layer[i]) : { upper: [[{ text: 'N/A', type: 'raw' }]] }
			)
		)
	]);
	let minX = Math.min(...keyboard.layouts[activeLayout].layout.map(({ x }: { x: number }) => x));
	let maxX = Math.max(...keyboard.layouts[activeLayout].layout.map(({ x }: { x: number }) => x));
	let minY = Math.min(...keyboard.layouts[activeLayout].layout.map(({ y }: { y: number }) => y));
	let maxY = Math.max(...keyboard.layouts[activeLayout].layout.map(({ y }: { y: number }) => y));

	type Dragged =
		| {
				layer: number;
				index: number;
		  }
		| undefined;
	let dragged = $state<Dragged>(undefined);
	let draggedOver = $state<Dragged>(undefined);

	function handleDragStart(layer: number, index: number) {
		dragged = { layer, index };
	}
	function handleDragEnd(layer: number, index: number) {
		dragged = undefined;
		if (draggedOver === undefined) {
			activeLayer = layer;
		}
		draggedOver = undefined;
	}
	function handleDragOver(layer: number, index: number) {
		draggedOver = { layer, index };
	}
	function handleDragExit(layer: number, index: number) {
		draggedOver = undefined;
	}
	function handleDrop(layer: number, index: number) {
		if (dragged !== undefined) {
			let draggedKey = keymap.layers[dragged.layer][dragged.index];
			keymap.layers[dragged.layer][dragged.index] = keymap.layers[layer][index];
			keymap.layers[layer][index] = draggedKey;
		}
		activeLayer = layer;
	}
</script>

<div class="flex flex-row justify-center justify-between">
	<div class="flex w-52 flex-col p-5">
		<p class="text-xl dark:text-white">Layouts</p>
		{#each Object.keys(keyboard.layouts) as layout}
			<TabButton
				onclick={() => (activeLayout = layout)}
				active={activeLayout == layout}
				ondelete={() => {
					delete keyboard.layouts[layout];
					if (activeLayout == layout) {
						activeLayout = Object.keys(keyboard.layouts)[0];
					}
				}}
			>
				{layout.replace('LAYOUT_', '')}</TabButton
			>
		{/each}
		<div class="mt-4 flex flex-row justify-between">
			<p class="text-xl dark:text-white">Layers</p>
			<button
				class="rounded px-2 text-xl hover:bg-amber-300 dark:text-white dark:hover:bg-amber-600"
				onclick={() => keymap.layers.push(keyboard.layouts[activeLayout].layout.map(() => 'KC_NO'))}
			>
				+
			</button>
		</div>
		{#each [...Array(keymap.layers.length).keys()].reverse() as i (keymap.layers[i])}
			<TabButton
				active={i == activeLayer}
				onclick={() => (activeLayer = i)}
				ondragover={() => {
					if (dragged !== undefined) {
						activeLayer = i;
					}
				}}
				ondelete={() => {
					if (activeLayer >= i) {
						activeLayer--;
					}
					keymap.layers = keymap.layers.slice(0, i).concat(keymap.layers.slice(i + 1));
				}}
				>Layer {i}
			</TabButton>
		{/each}
	</div>
	<div class="flex grow flex-row justify-center">
		{#each [...Array(layers.length).keys()].reverse() as layer}
			<div
				class="{layer != activeLayer ? 'hidden' : ''} relative"
				style:width="{(size + gap) * (maxX - minX + 1) - gap}px"
				style:height="{(size + gap) * (maxY - minY + 1) - gap}px"
			>
				{#each keyboard.layouts[activeLayout].layout as key, index}
					<div
						class="absolute"
						role="cell"
						tabindex={index}
						ondragover={(e) => {
							e.preventDefault();
							handleDragOver(layer, index);
						}}
						ondragexit={() => handleDragExit(layer, index)}
						ondragleave={() => handleDragExit(layer, index)}
						ondrop={() => handleDrop(layer, index)}
						style:left="{(size + gap) * (key.x - minX)}px"
						style:top="{(size + gap) * (key.y - minY)}px"
						style:width="{size}px"
						style:height="{size}px"
					>
						<div
							class={(layer === draggedOver?.layer && index === draggedOver?.index
								? 'bg-amber-300 dark:bg-amber-600'
								: 'bg-black opacity-5 dark:opacity-15') + ' absolute h-full w-full rounded-md'}
						></div>
						<div style:opacity={layer === dragged?.layer && index == dragged?.index ? 0 : 1}>
							<div
								class={((layer === dragged?.layer && index === dragged?.index) ||
								(layer === draggedOver?.layer && index === draggedOver?.index)
									? 'bg-amber-300 dark:bg-amber-600 dark:text-white '
									: 'bg-white text-neutral-800 hover:bg-amber-300 hover:text-black' +
										' dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-amber-600 dark:hover:text-white') +
									' absolute flex h-full w-full flex-col items-center justify-center rounded-md text-center'}
								draggable="true"
								role="button"
								tabindex={index}
								ondragstart={() => handleDragStart(layer, index)}
								ondragend={() => handleDragEnd(layer, index)}
							>
								{#each [[layers[layer][index].upper, false, layers[layer][index].lower != undefined], [layers[layer][index].lower, true, layers[layer][index].upper != undefined]] as [labelGroups, isLower, otherExists]}
									{#if labelGroups !== undefined}
										<div class="flex flex-row items-center gap-1">
											{#each labelGroups as labelGroup, i}
												<LabelGroup {labelGroups} index={i} {isLower} {otherExists} />
											{/each}
										</div>
									{/if}
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
{#each Object.entries(keyDefinitions.press) as [category, groups]}
	<!-- <h2 class="text-3xl text-neutral-800 dark:text-neutral-100">{category}</h2> -->
	{#each Object.entries(groups) as [group, keys]}
		<div class="flex-rows mx-1 my-5 flex">
			<div class="pt-1">
				<h2 class="w-48 px-4 text-right text-sm text-neutral-800 dark:text-neutral-100">
					{category}
				</h2>
				<h2 class="w-48 px-4 text-right text-2xl text-neutral-800 dark:text-neutral-100">
					{group}
				</h2>
			</div>
			<div class="grid w-full gap-1" style:grid-template-columns="repeat(auto-fit, {size}px)">
				{#each keys as { key }}
					<div
						class={(false
							? 'bg-amber-300 dark:bg-amber-600 dark:text-white '
							: 'bg-white text-neutral-800 hover:bg-amber-300 hover:text-black' +
								' dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-amber-600 dark:hover:text-white') +
							' flex h-full w-full flex-col items-center justify-center rounded-md text-center'}
						draggable="true"
						role="button"
						tabindex={0}
						ondragstart={() => {}}
						ondragend={() => {}}
						style:width="{size}px"
						style:height="{size}px"
						title={key}
					>
						<LabelGroup
							labelGroups={displayLabel(key).upper}
							index={0}
							isLower={false}
							otherExists={false}
						/>
					</div>
				{/each}
			</div>
		</div>
	{/each}
{/each}
