const users_testData = [
  {
    id: 1,
    username: "TestUser_1",
    portfolio: [
      {
        id: 111,
        quantity: 10,
        shareId: 1,
      },
      {
        id: 112,
        quantity: 3,
        shareId: 2,
      },
    ],
  },
  {
    id: 2,
    username: "TestUser_2",
    portfolio: [
      {
        id: 113,
        quantity: 1,
        shareId: 4,
      },
    ],
  },
  {
    id: 3,
    username: "TestUser_3",
  },
];

const shares_testData = [
  {
    id: 1,
    symbol: "APL",
    price: 3.21,
  },
  {
    id: 2,
    symbol: "NVD",
    price: 13.1,
  },
  {
    id: 3,
    symbol: "DIS",
    price: 27.18,
  },
  {
    id: 4,
    symbol: "ORC",
    price: 33.33,
  },
  {
    id: 5,
    symbol: "INT",
    price: 41.2,
  },
];

module.exports = {
  users_testData,
  // investments_testData,
  shares_testData,
};
