class Card {
    constructor(id, type) {
      this.id = id;
      this.type = type;
      this.flipped = false;
      this.matched = false;
    }

    flip() {
        this.flipped = true;
      }
    
      unflip() {
        this.flipped = false;
      }
  }
  
  class Jeu {
    constructor() {
      this.cards = this.generateCards();
      this.hasFlippedCard = false;
      this.lockBoard = false;
      this.firstCard = null;
      this.secondCard = null;
      this.shuffleCards();
    }

  
    generateCards() {
      // Create an array of card types
      const types = ['penguin', 'rabbit', 'unicorn', 'butterfly', 'owl', 'panda'];
      // Generate cards by pairing each type
      const cards = types.reduce((acc, type, index) => {
        acc.push(new Card(index * 2, type));
        acc.push(new Card(index * 2 + 1, type));
        return acc;
      }, []);
      return cards;
    }
  
    shuffleCards() {
      // Fisher-Yates (Knuth) Shuffle
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    flipCard(cardId) {
        const card = this.cards.find(c => c.id === cardId);
        if (this.lockBoard || card.flipped || (this.firstCard && this.firstCard.id === cardId)) {
          return;
        }
    
        card.flip();
    
        if (!this.hasFlippedCard) {
          // First card flip
          this.hasFlippedCard = true;
          this.firstCard = card;
        } else {
          // Second card flip
          this.hasFlippedCard = false;
          this.secondCard = card;
    
          this.checkForMatch();
        }
      }
    
      checkForMatch() {
        if (this.firstCard.type === this.secondCard.type) {
          this.disableCards();
        } else {
          this.unflipCards();
        }
      }
    
      disableCards() {
        this.firstCard.matched = true;
        this.secondCard.matched = true;
        this.resetBoard();
      }
    
      unflipCards() {
        this.lockBoard = true;
      
        setTimeout(() => {
            this.firstCard.unflip();
            this.secondCard.unflip();
            this.resetBoard();
        }, 1500);
    }

        resetBoard() {
            [this.hasFlippedCard, this.lockBoard] = [false, false];
            [this.firstCard, this.secondCard] = [null, null];
      }
}

    
export default Jeu;