const mediaCount = {
    animals: 14,
    architecture: 13,
    business: 12,
    fashion: 12,
    food: 16,
    interier: 13,
    nature: 12,
    sports: 12
};

export const MockBoardNodesMedia = {
    animals: Array.from({ length: mediaCount.animals }).map(
        (_, index) => `https://github.com/TarhunchiKKK/calypso/blob/main/assets/board-node-media/animals/${index}.jfif`
    ),
    architecture: Array.from({ length: mediaCount.architecture }).map(
        (_, index) => `https://github.com/TarhunchiKKK/calypso/blob/main/assets/board-node-media/architecture/${index}.jfif`
    ),
    business: Array.from({ length: mediaCount.business }).map(
        (_, index) => `https://github.com/TarhunchiKKK/calypso/blob/main/assets/board-node-media/business/${index}.jfif`
    ),
    fashion: Array.from({ length: mediaCount.fashion }).map(
        (_, index) => `https://github.com/TarhunchiKKK/calypso/blob/main/assets/board-node-media/fashion/${index}.jfif`
    ),
    food: Array.from({ length: mediaCount.food }).map(
        (_, index) => `https://github.com/TarhunchiKKK/calypso/blob/main/assets/board-node-media/food/${index}.jfif`
    ),
    interier: Array.from({ length: mediaCount.interier }).map(
        (_, index) => `https://github.com/TarhunchiKKK/calypso/blob/main/assets/board-node-media/interier/${index}.jfif`
    ),
    nature: Array.from({ length: mediaCount.nature }).map(
        (_, index) => `https://github.com/TarhunchiKKK/calypso/blob/main/assets/board-node-media/nature/${index}.jfif`
    ),
    sports: Array.from({ length: mediaCount.sports }).map(
        (_, index) => `https://github.com/TarhunchiKKK/calypso/blob/main/assets/board-node-media/sports/${index}.jfif`
    )
};
