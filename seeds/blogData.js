const blogData = [
  {
    id: 1,
    title: 'Why MVC is so important',
    created_on: 20220805,
    content: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model later for data, the View layer for design, and the Controller layer for application logic.',
    author_id: 3
  },
  {
    id: 2,
    title: 'Authentication vs. Authorization',
    created_on: 20220903,
    content: 'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.',
    author_id: 1
  },
  {
    id: 3,
    title: 'Object-Relational Mapping',
    created_on: 20221015,
    content: 'I have really loved learning about ORMs. It has really simplified the way I create queries in SQL!',
    author_id: 2
  }
];

module.exports = blogData;