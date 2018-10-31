import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

// queries
import { TODOES_QUERY } from '../../graphql';

// screens
import TodoItem from './TodoItem';

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

class Todo extends React.Component {
  state = {};

  render() {
    return (
      <Query query={TODOES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <p>error!</p>;

          return (
            <Ul>
              {data.todoes.map((val, i) => (
                <TodoItem key={i} item={val}>
                  {val.description}
                </TodoItem>
              ))}
            </Ul>
          );
        }}
      </Query>
    );
  }
}

export default Todo;
