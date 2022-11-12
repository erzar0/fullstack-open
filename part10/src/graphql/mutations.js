import { gql } from "@apollo/client";

const AUTHENTICATE = gql`
  mutation authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      createdAt
      id
      repositoryId
      text
      userId
      rating
    }
  }
`;

export { AUTHENTICATE, CREATE_REVIEW };
