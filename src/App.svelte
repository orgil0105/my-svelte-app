<script>
	import { products } from "./lib/stores/products";

	let showModal = false;

	// Login state
	let isLoggedIn = false;
	let username = '';
	let password = '';
	function login() {
		if (username && password) {
			isLoggedIn = true;
		}
	}

	// Form талбарууд
	let productName = '';
	let productPrice = '';
	let productImage = '';
	let productDescription = '';


	let editingProduct = null;

	function addProduct() {
		showModal = true;
		editingProduct = null;
	}

	function closeModal() {
		showModal = false;
		// Form цэвэрлэх
		productName = '';
		productPrice = '';
		productImage = '';
		productDescription = '';
		editingProduct = null;
	}

	function editProduct(product) {
		productName = product.name;
		productPrice = product.price;
		productImage = product.image;
		productDescription = product.description;
		editingProduct = product;
		showModal = true;
	}

	function deleteProduct(id) {
		products.update(items => items.filter(item => item.id !== id));
	}

	function submitProduct() {
		if (editingProduct) {
			products.update(items =>
				items.map(item => {
					if (item.id === editingProduct.id) {
						return {
							...item,
							name: productName,
							price: productPrice,
							image: productImage,
							description: productDescription
						};
					}
					return item;
				})
			);
		} else {
			const newProduct = {
				id: Date.now(),
				name: productName,
				price: productPrice,
				image: productImage,
				description: productDescription
			};
			products.update(items => [newProduct, ...items]);
		}

		closeModal();
		editingProduct = null;
	}
</script>

<style>
	:global(body) {
		background-image: url('/src/home.jpg.webp');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		color: white;
		font-family: Arial, sans-serif;
		margin: 0;
		padding: 0;
	}

	.header-buttons {
		position: absolute;
		top: 20px;
		right: 20px;
		display: flex;
		gap: 10px;
	}

	button {
		background-color: rgba(0, 0, 0, 0.6);
		color: white;
		border: none;
		padding: 10px 15px;
		border-radius: 5px;
		cursor: pointer;
		font-weight: bold;
		transition: background-color 0.3s;
	}

	button:hover {
		background-color: rgba(0, 0, 0, 0.8);
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		background: white;
		color: black;
		padding: 30px;
		border-radius: 10px;
		min-width: 400px;
		max-width: 500px;
		width: 90%;
	}

	.modal-content h2 {
		margin-top: 0;
	}

	.modal-content input, .modal-content textarea {
		width: 100%;
		padding: 8px;
		margin: 6px 0 12px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.modal-content button {
		margin-top: 10px;
	}

	.product-list {
		margin: 80px auto 20px;
		max-width: 800px;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 20px;
		border-radius: 8px;
	}

	.product-item {
		background: white;
		color: black;
		padding: 15px;
		border-radius: 6px;
		margin-bottom: 15px;
		display: flex;
		gap: 15px;
		align-items: center;
	}

	.product-item img {
		width: 80px;
		height: 80px;
		object-fit: cover;
		border-radius: 4px;
	}
</style>

<h1 style="width: 100%; text-align: center; margin: 20px 0 10px; padding: 10px; background: rgba(0,0,0,0.5);">    
    Добро пожаловать, {username}!
</h1>
{#if !isLoggedIn}
	<div class="modal-overlay">
		<div class="modal-content" on:click|stopPropagation>
			<h2>Вход</h2>
			<input type="text" placeholder="Имя пользователя" bind:value={username} />
			<input type="password" placeholder="Пароль" bind:value={password} />
			<button on:click={login}>Войти</button>
		</div>
	</div>
{:else}
	<div class="header-buttons">
		<button on:click={addProduct}>Добавить товар</button>
	</div>



	<div class="product-list">
		<h2>Все товары</h2>
		{#each $products as product (product.id)}
			<div class="product-item">
				{#if product.image}
					<img src={product.image} alt={product.name} />
				{/if}
				<div>
					<h3>{product.name}</h3>
					<p>Цена: {product.price} ₮</p>
					<p>{product.description}</p>
					<div style="margin-top:8px;">
						<button on:click={() => editProduct(product)}>Редактировать</button>
						<button on:click={() => deleteProduct(product.id)}>Удалить</button>
					</div>
				</div>
			</div>
		{:else}
			<p>Пока нет товаров.</p>
		{/each}
	</div>
{/if}

{#if showModal}
	<div class="modal-overlay" on:click={closeModal}>
		<div class="modal-content" on:click|stopPropagation>
			<h2>{editingProduct ? 'Редактировать товар' : 'Добавить товар'}</h2>
			<input type="text" placeholder="Название товара" bind:value={productName} />
			<input type="number" placeholder="Цена" bind:value={productPrice} />
			<input type="text" placeholder="URL товара" bind:value={productImage} />
			<textarea rows="3" placeholder="Описание товара" bind:value={productDescription}></textarea>
			<button on:click={submitProduct}>{editingProduct ? 'Сохранить' : 'Добавить'}</button>
			<button on:click={closeModal}>Закрыть</button>
		</div>
	</div>
{/if}