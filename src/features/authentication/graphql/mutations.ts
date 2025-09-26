import { gql } from '@apollo/client';

// User registration mutation
export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        email
        firstName
        lastName
        role
        isVerified
      }
      accessToken
      refreshToken
    }
  }
`;

// User login mutation
export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
        firstName
        lastName
        role
        isVerified
        firmProfile {
          id
          tradeName
          legalName
          businessType
          industry
          isActive
        }
      }
      accessToken
      refreshToken
    }
  }
`;

// Logout mutation
export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logout
  }
`;

// Refresh token mutation
export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      user {
        id
        email
        firstName
        lastName
        role
        isVerified
      }
      accessToken
      refreshToken
    }
  }
`;

// Password reset request
export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email) {
      success
      message
    }
  }
`;

// Reset password
export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword) {
      success
      message
    }
  }
`;

// Change password (for authenticated users)
export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      success
      message
    }
  }
`;

// Update user profile
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      id
      email
      firstName
      lastName
      updatedAt
    }
  }
`;
