<!-- src/routes/cart/+page.svelte -->
<script>
  import { cart } from '$lib/stores/cart';
  import OrderForm from '$lib/components/OrderForm.svelte';
  import { goto } from '$app/navigation';

  let items;
  cart.subscribe(value => items = value);

  function handleSubmit(e) {
    alert(`Thank you, ${e.detail.name}! Your order is submitted.`);
    cart.set([]);
    goto('/');
  }
</script>

<h1 class="text-xl font-bold mb-4">Your Cart</h1>

{#if items.length === 0}
  <p>Cart is empty.</p>
{:else}
  <ul>
    {#each items as item}
      <li>{item.name} x {item.qty} — ${item.price * item.qty}</li>
    {/each}
  </ul>
  <p class="mt-2 font-bold">
    Total: ${items.reduce((sum, item) => sum + item.price * item.qty, 0)}
  </p>

  <h2 class="text-lg font-bold mt-4">Order Form</h2>
  <OrderForm on:submit={handleSubmit} />
{/if}