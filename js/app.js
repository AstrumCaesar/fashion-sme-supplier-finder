/**
 * Fashion SME Supplier Finder - Main Application Logic
 */

let suppliers = [];
let filter = null;
let currentResults = [];

// Initialize app
window.addEventListener('DOMContentLoaded', async () => {
  await loadSuppliers();
  setupEventListeners();
  renderInitialState();
});

async function loadSuppliers() {
  try {
    const response = await fetch('data/suppliers.json');
    suppliers = await response.json();
    filter = new SupplierFilter(suppliers);
  } catch (error) {
    console.error('Error loading suppliers:', error);
  }
}

function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const findButton = document.getElementById('findButton');
  const filterButtons = document.querySelectorAll('.filter-chip');

  if (findButton) {
    findButton.addEventListener('click', performSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.target.classList.toggle('active');
      updateFilters();
      if (currentResults.length > 0) {
        displayResults(currentResults);
      }
    });
  });
}

function performSearch() {
  const searchInput = document.getElementById('searchInput').value;
  
  if (!searchInput.trim()) {
    alert('Please enter your clothing requirements');
    return;
  }

  const requirements = parser.parse(searchInput);
  console.log('Parsed requirements:', requirements);

  currentResults = filter.search(requirements);
  displayResults(currentResults);
}

function updateFilters() {
  const filters = {
    'underRM5': document.querySelector('[data-filter="underRM5"]')?.classList.contains('active'),
    'moqUnder100': document.querySelector('[data-filter="moqUnder100"]')?.classList.contains('active'),
    'fastDelivery': document.querySelector('[data-filter="fastDelivery"]')?.classList.contains('active'),
    'within30km': document.querySelector('[data-filter="within30km"]')?.classList.contains('active')
  };

  Object.entries(filters).forEach(([key, enabled]) => {
    filter.applyQuickFilter(key, enabled);
  });
}

function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  
  if (results.length === 0) {
    resultsContainer.innerHTML = '<p class="no-results">No suppliers found matching your criteria. Try adjusting your filters.</p>';
    return;
  }

  resultsContainer.innerHTML = results.map(supplier => `
    <div class="supplier-card">
      <div class="supplier-header">
        <div class="supplier-info">
          <h3>${supplier.name}</h3>
          <p class="location">📍 ${supplier.distance} km • ${supplier.location}</p>
          <div class="rating">
            <span class="stars">⭐ ${supplier.rating}</span>
            <span class="reviews">(${supplier.reviews} reviews)</span>
          </div>
        </div>
        <button class="wishlist-btn">♡</button>
      </div>

      <div class="supplier-details">
        <div class="detail-row">
          <span class="label">MOQ</span>
          <span class="value">${supplier.moq} units</span>
        </div>
        <div class="detail-row">
          <span class="label">Price</span>
          <span class="value">RM${supplier.unitPrice.toFixed(2)}/unit</span>
        </div>
        <div class="detail-row">
          <span class="label">Delivery</span>
          <span class="value">${supplier.deliveryDays}-${supplier.deliveryDays + 2} days</span>
        </div>
      </div>

      <div class="supplier-specs">
        <p><strong>Products:</strong> ${supplier.productType.join(', ')}</p>
        <p><strong>Materials:</strong> ${supplier.materials.join(', ')}</p>
        <p><strong>Colours:</strong> ${supplier.colours.join(', ')}</p>
        <div class="certifications">
          ${supplier.certifications.map(cert => `<span class="cert-badge">${cert}</span>`).join('')}
        </div>
      </div>

      <div class="supplier-actions">
        <button class="btn-primary">Contact Supplier</button>
        <button class="btn-secondary">Shortlist</button>
      </div>
    </div>
  `).join('');

  // Update results count
  const resultsCount = document.getElementById('resultsCount');
  if (resultsCount) {
    resultsCount.textContent = `${results.length} suppliers found`;
  }
}

function renderInitialState() {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '<p class="placeholder">Tell us what clothing you need → filter → find the best manufacturer/supplier</p>';
}
