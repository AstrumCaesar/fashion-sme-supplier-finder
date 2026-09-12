/**
 * Smart Filtering Logic for Supplier Matching
 * Filters suppliers based on parsed requirements and selected quick filters
 */

class SupplierFilter {
  constructor(suppliers) {
    this.suppliers = suppliers;
    this.activeFilters = {
      maxPrice: null,
      maxMOQ: null,
      maxDelivery: null,
      maxDistance: null
    };
  }

  applyQuickFilter(filterType, enabled) {
    if (filterType === 'underRM5') {
      this.activeFilters.maxPrice = enabled ? 5 : null;
    } else if (filterType === 'moqUnder100') {
      this.activeFilters.maxMOQ = enabled ? 100 : null;
    } else if (filterType === 'fastDelivery') {
      this.activeFilters.maxDelivery = enabled ? 7 : null;
    } else if (filterType === 'within30km') {
      this.activeFilters.maxDistance = enabled ? 30 : null;
    }
  }

  filterByRequirements(requirements) {
    return this.suppliers.filter(supplier => {
      // Price filter
      if (this.activeFilters.maxPrice && supplier.unitPrice > this.activeFilters.maxPrice) {
        return false;
      }
      if (requirements.unitBudget && supplier.unitPrice > requirements.unitBudget) {
        return false;
      }

      // MOQ filter
      if (this.activeFilters.maxMOQ && supplier.moq > this.activeFilters.maxMOQ) {
        return false;
      }
      if (requirements.moq && supplier.moq > requirements.moq) {
        return false;
      }

      // Delivery filter (prioritise but don't exclude)
      // Fast delivery only prioritises in sorting

      // Distance filter
      if (this.activeFilters.maxDistance && supplier.distance > this.activeFilters.maxDistance) {
        return false;
      }

      // Product type match
      if (requirements.product) {
        const hasProduct = supplier.productType.some(type => 
          type.toLowerCase().includes(requirements.product.toLowerCase())
        );
        if (!hasProduct) {
          return false;
        }
      }

      // Colour match (if specified)
      if (requirements.colour) {
        const hasColour = supplier.colours.some(col => 
          col.toLowerCase().includes(requirements.colour.toLowerCase()) || 
          col.toLowerCase() === 'custom'
        );
        if (!hasColour) {
          return false;
        }
      }

      return true;
    });
  }

  sortByRelevance(suppliers, requirements) {
    return suppliers.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Price proximity
      if (requirements.unitBudget) {
        scoreA += 10 - Math.abs(a.unitPrice - requirements.unitBudget) / requirements.unitBudget * 10;
        scoreB += 10 - Math.abs(b.unitPrice - requirements.unitBudget) / requirements.unitBudget * 10;
      }

      // MOQ match
      if (requirements.moq) {
        scoreA += Math.max(0, 10 - (a.moq - requirements.moq) / requirements.moq * 10);
        scoreB += Math.max(0, 10 - (b.moq - requirements.moq) / requirements.moq * 10);
      }

      // Delivery speed (prioritise if fast delivery filter active)
      if (this.activeFilters.maxDelivery) {
        scoreA += (7 - a.deliveryDays) * 2;
        scoreB += (7 - b.deliveryDays) * 2;
      }

      // Distance proximity
      if (this.activeFilters.maxDistance) {
        scoreA += (30 - a.distance) / 3;
        scoreB += (30 - b.distance) / 3;
      }

      // Rating
      scoreA += a.rating;
      scoreB += b.rating;

      return scoreB - scoreA;
    });
  }

  search(requirements) {
    const filtered = this.filterByRequirements(requirements);
    return this.sortByRelevance(filtered, requirements);
  }
}
