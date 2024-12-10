<select bind:value={selectedSponsor} on:change={updateDriverPoints}>
	<option value="" selected disabled>Select a sponsor</option>
	{#each sponsors as sponsor}
	  <option value={sponsor.sponsor_name}>{sponsor.sponsor_name}</option>
	{/each}
  </select>

  <script lang="ts">
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import { writable } from 'svelte/store';
  
	export let data: PageServerData;
  
	let address = ''; // Declaring the address variable
	let completeOrder = () => { // Function to complete the order
		if (address) {
			alert('Order Complete');
			selectedItems = [];
			total.set(0);
			address = '';
			closeCart();
		} else {
			alert('Please enter an address');
		}
	}
	let flattenedData = [];
	let selectedSponsor = '';
	let sponsors = [];
	let driverPoints = 0;
	let selectedItems = [];
	let total = writable(0);
	let filteredSongs = [];
	// Function to update driver points based on the selected sponsor
	function updateDriverPoints() {
		if (selectedSponsor) {
    const sponsorData = data.songList.flatMap(item => item.songResults) // Flatten the array structure
                          .find(song => song.sponsor_name === selectedSponsor); // Find the sponsor in the flattened array

    driverPoints = sponsorData ? sponsorData.points : 0;
    console.log('Driver Points:', driverPoints);
  } else {
    driverPoints = 0;
  }
}
  
	// Function to calculate points based on price
	function calculatePoints(price) {
	  const pointConversionFactor = 100;
  
	  if (typeof price !== 'number' || isNaN(price)) {
		console.warn('Invalid price:', price);
		return 0;
	  }
  
	  const points = price * pointConversionFactor;
	  return points;
	}
  
	// Function to handle adding items to the cart
	function addToCart(item) {
	  selectedItems = [...selectedItems, item];
	  calculateTotal();
	}
  
	// Function to handle viewing the cart
	function viewCart() {
	  const modal = document.getElementById('cartModal');
	  modal.style.display = 'block';
	}
  
	// Function to check if an item is in the cart
	function isItemInCart(item) {
	  return selectedItems.some(selectedItem => selectedItem.trackId === item.trackId);
	}
  
	// Function to remove an item from the cart
	const removeItemFromCart = (itemToRemove) => {
	  selectedItems = selectedItems.filter(item => item.trackId !== itemToRemove.trackId);
	  calculateTotal();
	}
  
	// Function to calculate the total points in the cart
	function calculateTotal() {
	  let newTotal = selectedItems.reduce((acc, item) => {
		return acc + calculatePoints(item.trackPrice);
	  }, 0);
  
	  total.set(newTotal);
	}
  
	onMount(() => {
	  if (data && Array.isArray(data.songList) && data.songList.length > 0) {
		flattenedData = data.songList.flatMap(result => result.songResults || []);
  
		const allSponsors = flattenedData.map(song => song.sponsor_name);
		sponsors = Array.from(new Set(allSponsors)).map(sponsor_name => ({ sponsor_name }));
	  } else {
		console.error('Data or songList is undefined, null, or empty');
	  }
  
	  driverPoints = data.points || 0;
	});
  
	$: {
	  updateDriverPoints();
	  filteredSongs = selectedSponsor
		? flattenedData.filter(song => song.sponsor_name === selectedSponsor)
		: [];
	}
  
	function closeCart() {
	  const modal = document.getElementById('cartModal');
	  modal.style.display = 'none';
	}

</script>

<svelte:head>
	<title>Test Driver Store</title>
</svelte:head>

<section>
	<div id="store">
		<h1>Store</h1>
		<div class="catalog-grid">
			{#each filteredSongs as item (item.trackName)}
        <div class="catalog-item">
          <img src={item.artworkUrl60} alt={item.trackName} />
          <div class="item-details">
            <p>Track Name: {item.trackName}</p>
            <p>Artist Name: {item.artistName}</p>
            <p>Genre: {item.primaryGenreName}</p>
            <p>Album: {item.collectionName}</p>
           <p>Price: {calculatePoints(item.trackPrice)} Points</p>
		   

          </div>
		  {#if !selectedItems.find(selectedItem => selectedItem.trackId === item.trackId)}
      <button on:click={() => addToCart(item)}>Add to Cart</button>
		{/if}
        </div>
      {/each}
    </div>
	<button on:click={viewCart}>View Cart</button>

	</div>

	<!-- Display driver points for the selected sponsor -->
	<div class="driver-points">
		<p>Driver's Points for {selectedSponsor}: {driverPoints}</p>
	  </div>

	 <!-- Modal for Cart -->
  <div id="cartModal" class="modal">
    <div class="modal-content">
      <span class="close" on:click={closeCart}>&times;</span>
	  <input type="text" bind:value={address} placeholder="Enter Address" />

      <h2>Your Cart</h2>
      <ul>
	
		
		{#each selectedItems as item (item.trackId)}
        {#if item}
		<li>
            <div class="cart-item">
              <span>{item.trackName} - {calculatePoints(item.trackPrice)}</span>
              <button class="remove-button" on:click={() => removeItemFromCart(item)}>X</button>
            </div>
          </li>
        {/if}
      {/each}
	  </ul>
	  <p>Total Points: {$total}</p> <!-- line to display the total -->
	  <button on:click={completeOrder}>Complete Order</button>
	</div>


  </div>
</section>

<style>


	.catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Adjust the size as needed */
    grid-gap: 20px;
  }

	.catalog-item {
		/* Define styles for each item in the grid */
		border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
	}

	.catalog-item:hover {
		transform: scale(1.05);
	}

	

	/* Styles for the modal */
	.modal {
		display: none;
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.4);
		padding-top: 60px;
	}

	.modal-content {
		background-color: #fefefe;
		margin: 5% auto;
		padding: 20px;
		border: 1px solid #888;
		width: 80%;
	}

	.close {
		color: #aaaaaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}

	.close:hover,
	.close:focus {
		color: #000;
		text-decoration: none;
		cursor: pointer;
	}

	.remove-button {
    background-color: #ddd; /* Light gray background */
    border: 1px solid #888;
    color: #555; /* Dark gray text color */
    padding: 5px 10px; /* Adjust padding for better appearance */
    border-radius: 4px;
    cursor: pointer;
  }

  .remove-button:hover {
    background-color: #ccc; /* Darker gray background on hover */
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
</style>