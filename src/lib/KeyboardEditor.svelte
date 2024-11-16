<script lang="ts">
	import { displayLabel, type KeyCombo } from './keys';
	import LabelGroup from './LabelGroup.svelte';

	let size = 60;

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
		...Array(100)
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
					class="rounded-lg border border-gray-200 bg-gray-100 p-2 text-xs font-semibold text-gray-800"
					onclick={() => (activeLayout = layout)}>{layout}</button
				>
			{/each}
		</div>
		<div>
			{#each Object.keys(keymap?.layers) as _, i}
				<button
					class="rounded-lg border border-gray-200 bg-gray-100 p-2 text-xs font-semibold text-gray-800"
					onclick={() => (activeLayer = i)}>{i}</button
				>
			{/each}
			<button
				class="rounded-lg border border-gray-200 bg-gray-100 p-2 text-xs font-semibold text-gray-800"
				onclick={() => keymap.layers.push(keyboard.layouts[activeLayout].layout.map(() => 'KC_NO'))}
				>+</button
			>
		</div>
	</div>

	<div class="relative">
		{#each keyboard.layouts[activeLayout].layout as key, i}
			<div
				class="{i === draggedOver ? `border-blue-200` : 'border-white'} {i === dragged
					? 'bg-gray-200'
					: ''} absolute border-2"
				role="cell"
				tabindex={i}
				ondragover={(e) => {
					e.preventDefault();
					handleDragOver(e, i);
				}}
				ondragexit={(e) => handleDragExit(e, i)}
				ondrop={(e) => handleDrop(e, i)}
				style:left={`${size * key.x}px`}
				style:top={`${size * key.y}px`}
				style:width={`${size}px`}
				style:height={`${size}px`}
				style:border-radius="10px"
			>
				<div style:opacity={i == dragged ? 0 : 1}>
					<div
						class="absolute flex h-full w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-center text-gray-800"
						draggable="true"
						role="button"
						tabindex={i}
						ondragstart={(e) => handleDragStart(e, i)}
						ondragend={(e) => handleDragEnd(e, i)}
					>
						{#each [[layer[i].upper, true, layer[i].lower != undefined], [layer[i].lower, false, layer[i].upper != undefined]] as [labelGroups, isUpper, otherExists]}
							{#if labelGroups !== undefined}
								<div class="flex flex-row items-center gap-1">
									{#each labelGroups as labelGroup}
										{#if labelGroup.length > 1}
											<div
												class="{!isUpper
													? ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'][
															labelGroup.length - 1
														]
													: labelGroup.length > 3
														? 'grid-cols-2'
														: 'grid-cols-1'} grid items-center justify-items-center"
											>
												<LabelGroup
													{labelGroup}
													{labelGroups}
													{isUpper}
													{otherExists}
												/>
											</div>
										{:else}
											<LabelGroup
												{labelGroup}
												{labelGroups}
												{isUpper}
												{otherExists}
											/>
										{/if}
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
