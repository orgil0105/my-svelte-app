<!-- src/lib/components/ProductModal.svelte -->
<script>
  export let product;
  export let onClose;
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div class="bg-white p-6 rounded shadow max-w-md w-full">
    <h2 class="text-xl font-bold mb-2">{product.name}</h2>
    <p>${product.price}</p>
    <p class="mt-2">{product.description}</p>
    <button class="bg-red-500 text-white px-3 py-1 rounded mt-4" on:click={onClose}>
      Close
    </button>
  </div>
</div>
