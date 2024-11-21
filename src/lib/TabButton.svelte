<script lang="ts">
	let { onclick, active } = $props<{
		onclick: any;
		active: boolean;
	}>();
</script>

<button
	class={(active ? 'bg-amber-300 dark:bg-amber-600' : 'bg-white dark:bg-neutral-700') +
		' my-1 rounded py-1 pl-4 text-left hover:bg-amber-300 dark:text-white dark:hover:bg-amber-600'}
	{onclick}><slot /></button
>
