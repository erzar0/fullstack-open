import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query repos(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $ownerName: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      ownerName: $ownerName
      first: $first
      after: $after
    ) {
      edges {
        cursor
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          url
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;

// export const GET_SINGLE_REPOSITORY = gql`
//   query get_single($id: ID!) {
//     repository(id: $id) {
//       ownerAvatarUrl
//       fullName
//       description
//       language
//       stargazersCount
//       forksCount
//       reviewCount
//       ratingAverage
//       url
//     }
//   }
// `;

export const GET_REVIEW = gql`
  query get_review($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      id
      username
    }
  }
`;
