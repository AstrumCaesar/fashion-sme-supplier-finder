/**
 * Natural Language Parser for Fashion Supplier Requirements
 * Extracts key procurement parameters from user input
 */

class FashionParser {
  constructor() {
    this.colorKeywords = ['black', 'white', 'navy', 'blue', 'red', 'green', 'yellow', 'pink', 'purple', 'gray', 'grey', 'beige', 'brown', 'custom'];
    this.productKeywords = {
      'tshirt': ['t-shirt', 't-shirts', 'tshirt', 'tee', 'shirt'],
      'hoodie': ['hoodie', 'hoodies', 'sweatshirt'],
      'dress': ['dress', 'dresses'],
      'jacket': ['jacket', 'jackets', 'coat'],
      'activewear': ['activewear', 'sportswear', 'athletic'],
      'formal': ['formal', 'shirt', 'blouse', 'pants']
    };
  }

  parse(userInput) {
    const input = userInput.toLowerCase().trim();
    
    return {
      category: 'Clothing',
      product: this.extractProduct(input),
      quantity: this.extractQuantity(input),
      colour: this.extractColour(input),
      unitBudget: this.extractBudget(input),
      moq: this.extractMOQ(input),
      delivery: this.extractDelivery(input),
      rawInput: userInput
    };
  }

  extractProduct(input) {
    for (const [category, keywords] of Object.entries(this.productKeywords)) {
      for (const keyword of keywords) {
        if (input.includes(keyword)) {
          return category.charAt(0).toUpperCase() + category.slice(1);
        }
      }
    }
    return 'Clothing';
  }

  extractQuantity(input) {
    const match = input.match(/(\d+)\s*(pieces|units|pcs|shirts?|items?)/i);
    return match ? parseInt(match[1]) : null;
  }

  extractColour(input) {
    for (const color of this.colorKeywords) {
      if (input.includes(color)) {
        return color.charAt(0).toUpperCase() + color.slice(1);
      }
    }
    return null;
  }

  extractBudget(input) {
    const match = input.match(/(rm|myr)?\s*(\d+(?:\.\d{1,2})?)\s*(each|per|unit|piece)?/i);
    return match ? parseFloat(match[2]) : null;
  }

  extractMOQ(input) {
    const match = input.match(/moq\s*(below|under|less than)?\s*(\d+)/i);
    return match ? parseInt(match[2]) : null;
  }

  extractDelivery(input) {
    const match = input.match(/(\d+)\s*(days?|week|weeks)/i);
    return match ? parseInt(match[1]) : null;
  }
}

const parser = new FashionParser();
