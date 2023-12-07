import { readFile } from "../utils.js";

const input = readFile(7, 1);

const test_input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const test = input;

{
  const availableCards = "A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2"
    .split(",")
    .filter(Boolean)
    .map((v) => v.trim());

  function getCardStrengh(char) {
    return availableCards.length - availableCards.indexOf(char);
  }

  const result = test
    .split("\n")
    .map((line) => line.trim())
    .map((line) => {
      const [cards, bid] = line.split(" ");

      let cardSetPower = 1;

      const cardAmounts = cards.split("").reduce((acc, cur) => {
        acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
        return acc;
      }, {});

      // check if all cards are the same suit
      if (Object.values(cardAmounts).length === 1) {
        cardSetPower = 7;
      }

      // check if 4 cards from the 5 are the same
      else if (Object.values(cardAmounts).some((v) => v === 4)) {
        cardSetPower = 6;
      }

      // check if 3 and 2 cards are the same
      else if (
        Object.values(cardAmounts).some((v) => v === 3) &&
        Object.values(cardAmounts).some((v) => v === 2)
      ) {
        cardSetPower = 5;
      } else if (
        Object.values(cardAmounts).some((v) => v === 3) &&
        Object.values(cardAmounts).some((v) => v === 1)
      ) {
        cardSetPower = 4;
      } else if (
        Object.values(cardAmounts).filter((v) => v === 2).length === 2
      ) {
        cardSetPower = 3;
      } else if (
        Object.values(cardAmounts).filter((v) => v === 2).length === 1
      ) {
        cardSetPower = 2;
      }

      return {
        cards,
        cardSetPower,
        bid: parseInt(bid.trim()),
      };
    });

  function compareCards(cardsA, cardsB) {
    // go though each card and compare them one by one until one is bigger than the other
    for (let i = 0; i < cardsA.length; i++) {
      const cardA = cardsA[i];
      const cardB = cardsB[i];

      const cardAPower = getCardStrengh(cardA);
      const cardBPower = getCardStrengh(cardB);

      if (cardAPower > cardBPower) {
        return 1;
      }

      if (cardAPower < cardBPower) {
        return -1;
      }
    }

    return 0;
  }

  console.log(
    "part1",
    result
      .sort((a, b) => {
        if (a.cardSetPower === b.cardSetPower) {
          return compareCards(a.cards, b.cards);
        }

        return a.cardSetPower - b.cardSetPower;
      })
      .map((value, index) => {
        return value.bid * (index + 1);
      })
      .reduce((acc, cur) => acc + cur, 0)
  );
}

{
  const availableCards = "A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J"
    .split(",")
    .filter(Boolean)
    .map((v) => v.trim());

  function getCardStrengh(char) {
    return availableCards.length - availableCards.indexOf(char);
  }

  function bestPossibleHandJoker(cards, cardAmounts) {
    if (Object.keys(cardAmounts).length == 1 || !cardAmounts["J"]) {
      return { cards, cardAmounts };
    }
    const highestAmountCard = Object.keys(cardAmounts)
      .sort((a, b) => cardAmounts[b] - cardAmounts[a])
      .filter((v) => v !== "J");
    let newCards = cards
      .split("")
      .map((card) => {
        if (card === "J") {
          return highestAmountCard[0];
        }
        return card;
      })
      .join("");

    return {
      cards: newCards,
      cardAmounts: newCards.split("").reduce((acc, cur) => {
        acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
        return acc;
      }, {}),
    };
  }

  const result = test
    .split("\n")
    .map((line) => line.trim())
    .map((line) => {
      const [realCards, bid] = line.split(" ");

      let cardSetPower = 1;

      let { cards, cardAmounts } = bestPossibleHandJoker(
        realCards,
        realCards.split("").reduce((acc, cur) => {
          acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
          return acc;
        }, {})
      );

      // check if all cards are the same suit
      if (Object.values(cardAmounts).length === 1) {
        cardSetPower = 7;
      }

      // check if 4 cards from the 5 are the same
      else if (Object.values(cardAmounts).some((v) => v === 4)) {
        cardSetPower = 6;
      }

      // check if 3 and 2 cards are the same
      else if (
        Object.values(cardAmounts).some((v) => v === 3) &&
        Object.values(cardAmounts).some((v) => v === 2)
      ) {
        cardSetPower = 5;
      } else if (
        Object.values(cardAmounts).some((v) => v === 3) &&
        Object.values(cardAmounts).some((v) => v === 1)
      ) {
        cardSetPower = 4;
      } else if (
        Object.values(cardAmounts).filter((v) => v === 2).length === 2
      ) {
        cardSetPower = 3;
      } else if (
        Object.values(cardAmounts).filter((v) => v === 2).length === 1
      ) {
        cardSetPower = 2;
      }

      return {
        cards: realCards,
        cardSetPower,
        bid: parseInt(bid.trim()),
      };
    });

  function compareCards(cardsA, cardsB) {
    // go though each card and compare them one by one until one is bigger than the other
    for (let i = 0; i < cardsA.length; i++) {
      const cardA = cardsA[i];
      const cardB = cardsB[i];

      const cardAPower = getCardStrengh(cardA);
      const cardBPower = getCardStrengh(cardB);

      if (cardAPower > cardBPower) {
        return 1;
      }

      if (cardAPower < cardBPower) {
        return -1;
      }
    }

    return 0;
  }

  console.log(
    "part1",
    result
      .sort((a, b) => {
        if (a.cardSetPower === b.cardSetPower) {
          return compareCards(a.cards, b.cards);
        }

        return a.cardSetPower - b.cardSetPower;
      })
      .map((value, index) => {
        return value.bid * (index + 1);
      })
      .reduce((acc, cur) => acc + cur, 0)
  );
}
