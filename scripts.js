document.getElementById('spotForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const spotImageInput = document.getElementById('spotImage');
    const spotName = document.getElementById('spotName').value;
    const spotRating = document.getElementById('spotRating').value;
    const spotReview = document.getElementById('spotReview').value;

    if (spotImageInput.files.length === 0) {
        alert("Please select an image");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const spotImage = e.target.result;

        const spot = {
            name: spotName,
            rating: spotRating,
            review: spotReview,
            image: spotImage
        };

        saveSpot(spot);
        displaySpot(spot);
    };
    reader.readAsDataURL(spotImageInput.files[0]);
});

function saveSpot(spot) {
    let spots = localStorage.getItem('spots');
    if (!spots) {
        spots = [];
    } else {
        spots = JSON.parse(spots);
    }
    spots.push(spot);
    localStorage.setItem('spots', JSON.stringify(spots));
}

function displaySpot(spot) {
    const dashboard = document.getElementById('dashboard');

    const spotElement = document.createElement('div');
    spotElement.classList.add('dashboard-item');
    spotElement.innerHTML = `
        <img src="${spot.image}" alt="Spot Image">
        <div class="info">
            <h3>${spot.name}</h3>
            <p>${spot.review.substring(0, 50)}...</p>
            <span>Rating: ${getRatingText(spot.rating)}</span>
        </div>
    `;
    spotElement.addEventListener('click', function() {
        showFullReview(spot);
    });

    dashboard.appendChild(spotElement);
}

function getRatingText(rating) {
    switch (rating) {
        case '1':
            return '1 Star';
        case '2':
            return '2 Stars';
        case '3':
            return '3 Stars';
        case '4':
            return '4 Stars';
        case '5':
            return '5 Stars';
        default:
            return 'Unknown';
    }
}

function showFullReview(spot) {
    document.getElementById('reviewSpotName').textContent = spot.name;
    document.getElementById('reviewSpotImage').src = spot.image;
    document.getElementById('reviewSpotImage').style.width = 'auto'; // Reset width to auto
    document.getElementById('reviewSpotRating').textContent = `Rating: ${getRatingText(spot.rating)}`;
    document.getElementById('reviewSpotReview').textContent = spot.review;
    document.getElementById('fullReview').style.display = 'block';
}

function closeFullReview() {
    document.getElementById('fullReview').style.display = 'none';
}

function loadSavedSpots() {
    let spots = localStorage.getItem('spots');
    if (spots) {
        spots = JSON.parse(spots);
        spots.forEach(displaySpot);
    }
}

window.onload = loadSavedSpots;
