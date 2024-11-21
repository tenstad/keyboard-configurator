<script lang="ts">
	import { Trash } from 'lucide-svelte';

	let { onclick, active, ondragover, ondelete } = $props<{
		onclick: any;
		ondragover: any;
		ondelete: any;
		active: boolean;
	}>();

	let deleteVisible = $state(false);
	let deleteHover = $state(false);
</script>

<button
	class={(active ? 'bg-amber-300 dark:bg-amber-600' : 'bg-white dark:bg-neutral-700') +
		(!deleteHover ? ' hover:bg-amber-300 dark:hover:bg-amber-600' : '') +
		' relative my-1 rounded py-1 pl-4 text-left dark:text-white'}
	onclick={() => {
		if (!deleteHover) {
			onclick();
		}
	}}
	{ondragover}
	onmouseenter={() => (deleteVisible = true)}
	onmouseleave={() => (deleteVisible = false)}
>
	<slot />
	<div
		class="{!deleteVisible ? 'hidden' : ''} absolute -right-8 top-0 h-full p-2"
		onclick={ondelete}
		onmouseenter={() => (deleteHover = true)}
		onmouseleave={() => (deleteHover = false)}
		role="button"
		tabindex={0}
	>
		<Trash size={18} />
	</div>
</button>
