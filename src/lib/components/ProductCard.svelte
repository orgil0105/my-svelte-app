<!-- src/lib/components/ProductCard.svelte -->
<script>
  export let product;
  export let onView;
  export let onAddToCart;
</script>

<div class="border p-4 rounded shadow hover:shadow-lg transition">
  <h2 class="font-bold text-lg">{product.name}</h2>
  <p>${product.price}</p>
  <button class="bg-blue-500 text-white px-3 py-1 rounded mt-2" on:click={() => onView(product)}>
    View
  </button>
  <button class="bg-green-500 text-white px-3 py-1 rounded ml-2" on:click={() => onAddToCart(product)}>
    Add to cart
  </button>
</div>