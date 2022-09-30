// ----------------------------------------------------------------------------
/*
                             Card Deck Component
*/
// ----------------------------------------------------------------------------
// Takes a list of objects containing card details (e.g., title, description) 
// and converts them into MediaCard components to be displayed on a grid.

// ----------------------------------------------------------------------------
// Imports

// Components
import { MediaCard } from "./Card";

// Utilities
import { HOMEPAGE_URL, logos } from "../common/globals.js";

// ----------------------------------------------------------------------------
// Component

export function CardDeck({ cards, showButton }) {
  // Params:
  // cards (list) - List of objects with card properties.
  // showButton (bool) - whether or not to show the 'Request Access' button. 
  //     This button should be shown only for apps the user can't access yet.

  return (
    <div className="card-deck">
      {cards.map((card) => (
        <MediaCard
          key={card.title}
          title={card.title}
          description={card.description}
          routing_extension={`${HOMEPAGE_URL}${card.routing_extension}`}
          // If the specified logo exists, use it. Otherwise use default logo.
          img={
            Object.keys(logos).includes(card.logo)
              ? logos[card.logo]
              : logos["default"]
          }
          showButton={showButton}
        />
        )
      )
    }
    </div>
  );
}
