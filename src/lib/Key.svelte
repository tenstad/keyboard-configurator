<script lang="ts">
	import type { KeyCombo } from './keys';
	import LabelGroup from './LabelGroup.svelte';

	let { key } = $props<{
		key: KeyCombo;
	}>();
</script>

{#each [[key.upper, false, key.lower != undefined], [key.lower, true, key.upper != undefined]] as [labelGroups, isLower, otherExists]}
	{#if labelGroups !== undefined}
		<div class="flex flex-row items-center gap-1">
			{#each labelGroups as _, i}
				<LabelGroup {labelGroups} index={i} {isLower} {otherExists} />
			{/each}
		</div>
	{/if}
{/each}
