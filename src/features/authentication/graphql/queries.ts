import { gql } from '@apollo/client';

// Get current user information
export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      firstName
      lastName
      role
      isVerified
      createdAt
      updatedAt
      firmProfile {
        id
        tradeName
        legalName
        businessType
        industry
        isActive
      }
    }
  }
`;

// Check if user exists by email
export const CHECK_USER_EXISTS = gql`
  query CheckUserExists($email: String!) {
    checkUserExists(email: $email) {
      exists
      isVerified
    }
  }
`;
