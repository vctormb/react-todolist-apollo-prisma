import gql from 'graphql-tag';

export const TODOES_QUERY = gql`
  query TodoesQuery {
    todoes {
      id
      description
      isDone
    }
  }
`;
