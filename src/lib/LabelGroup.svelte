<script lang="ts">
	import Icon from './Icon.svelte';
	import { splitLabel, type Label } from './keys';

	let { labelGroups, index, isLower, otherExists } = $props<{
		labelGroups: Label[][];
		index: number;
		isLower: boolean;
		otherExists: boolean;
	}>();
	let labelGroup = $derived(
		labelGroups[index].every((label: Label) => 'icon' in label) && !isLower
			? labelGroups[index].length > 3
				? [
						labelGroups[index][2],
						labelGroups[index][3],
						labelGroups[index][0],
						labelGroups[index][1],
						...labelGroups[index].slice(4)
					]
				: labelGroups[index].reverse()
			: labelGroups[index]
	);

	let textLength = labelGroups
		.flat()
		.map((label: Label) => ('text' in label && !('icon' in label) ? label.text.length : 0))
		.reduce((acc: number, x: number) => acc + x, 0);
</script>

<div
	class={(isLower || (otherExists && labelGroup.length < 4)
		? 'grid-flow-col'
		: labelGroup.length > 3
			? 'grid-cols-2'
			: 'grid-cols-1') + ' relative grid items-center justify-items-center'}
>
	{#each labelGroup as label}
		{#if 'icon' in label}
			<Icon
				label={label.icon}
				size={isLower
					? [18, 18, 14, 13][labelGroup.length - 1] // lower
					: otherExists
						? [24, 22, 17, 17][labelGroup.length - 1] - (labelGroup.length - 1) * 1 // upper when lower
						: labelGroups.length == 1 // upper only
							? [28, 24, 18, 18][labelGroup.length - 1] // icon only
							: textLength > 1 // icon group next to text
								? 13 // < multiple letters / v single letter
								: [24, 18, 14, 13][labelGroup.length - 1]}
			/>
			{#if 'text' in label}
				<span
					class="{label.text.length > 1
						? '-ml-[0.25rem] text-sm -tracking-[0.175em]'
						: 'text-md'} absolute -mt-3"
				>
					{label.text}
				</span>
			{/if}
		{:else if 'text' in label}
			<span
				class="{{
					text: '',
					raw: 'font-mono'
				}[label.type]} {isLower
					? label.text.length == 1 // lower
						? '' // layer number
						: 'text-sm'
					: otherExists
						? 'text-xl' // upper when lower
						: label.text.length == 1 // only upper
							? 'text-2xl'
							: 'text-lg'}"
			>
				{#each splitLabel(label.text) as part}
					{part}<wbr />
				{/each}
			</span>
		{/if}
	{/each}
</div>
