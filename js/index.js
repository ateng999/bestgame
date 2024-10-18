fetch('video_games.json')
.then(response => response.json())
.then(data => {
	const games = data;
	let selectedGenre = '';
	let selectedPlatform = '';
	let searchQuery = '';

	function displayGames(filteredGames) {
		const gamesList = document.getElementById('gamesList');
		gamesList.innerHTML = '';

		if (filteredGames.length === 0) {
			gamesList.innerHTML = '<p>No games found.</p>';
			return;
		}

		filteredGames.forEach(game => {
			const gameItem = document.createElement('div');
			gameItem.classList.add('gameItem');
			gameItem.innerHTML = `
				<a href="#">
					<p class="gameDev">${game.developer}</p>
					<img src="${game.cover_photo}" alt="">
					<p class="gameCons"><span>Platform</span> ${game.consoles_available.join(' | ')}</p>
					<h2>${game.title}</h2>
					<p class="gameDesc">${game.description}</p>
					<p class="gameGenre"><span>Genre:</span> ${game.genres.join(' | ')}</p>
				</a>
			`;
			gamesList.appendChild(gameItem);
		});
	}

	function filterGames() {
		let filteredGames = games.filter(game => {
			const matchesGenre = !selectedGenre || game.genres.includes(selectedGenre);
			const matchesPlatform = !selectedPlatform || game.consoles_available.includes(selectedPlatform);
			const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());

			return matchesGenre && matchesPlatform && matchesSearch;
		});

		displayGames(filteredGames);
	}

	document.getElementById('search').addEventListener('input', function(event) {
		searchQuery = event.target.value;
		filterGames();
	});

	document.querySelectorAll('.filterBtn.genre').forEach(button => {
		button.addEventListener('click', function() {
			selectedGenre = this.getAttribute('data-genre');
			filterGames();
		});
	});

	document.querySelectorAll('.filterBtn.platform').forEach(button => {
		button.addEventListener('click', function() {
			selectedPlatform = this.getAttribute('data-platform');
			filterGames();
		});
	});

	filterGames();
})
.catch(error => console.error('Error fetching games:', error));
