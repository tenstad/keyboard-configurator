<script lang="ts">
	let { data = $bindable() } = $props<{
		data: object | undefined;
	}>();

	let value: string = $state('');
	let error: any = $state(undefined);

	$effect(() => {
		try {
			data = JSON.parse(value);
			error = undefined;
		} catch (e: any) {
			data = undefined;
			error = e;
		}
	});
</script>

<div>
	<textarea bind:value rows="10"></textarea>
	<p>{error}</p>
</div>
