import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

// queries
import { TODOES_QUERY } from '../../graphql';

const MARK_TODO_AS_DONE_MUTATION = gql`
  mutation MarkTodoAsDone($todoId: String!, $isDone: Boolean!) {
    markTodoAsDone(todoId: $todoId, isDone: $isDone) {
      id
      isDone
    }
  }
`;

const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodoMutation($todoIds: [String!]) {
    deleteManyTodoes(todoIds: $todoIds) {
      count
    }
  }
`;

const Li = styled.li`
  display: block;
`;

class TodoItem extends React.Component {
  onDeleteItem = (cache, { data: { deleteManyTodoes } }) => {
    const { todoes } = cache.readQuery({ query: TODOES_QUERY });

    cache.writeQuery({
      query: TODOES_QUERY,
      data: {
        todoes: todoes.filter(val => val.id !== this.props.item.id),
      },
    });
  };

  render() {
    const { children } = this.props;

    return (
      <Li>
        <Mutation mutation={MARK_TODO_AS_DONE_MUTATION}>
          {markTodoAsDone => {
            return (
              <input
                onChange={e => {
                  markTodoAsDone({
                    variables: {
                      todoId: this.props.item.id,
                      isDone: e.target.checked,
                    },
                  });
                }}
                checked={this.props.item.isDone}
                type="checkbox"
              />
            );
          }}
        </Mutation>
        {children}
        <Mutation mutation={DELETE_TODO_MUTATION} update={this.onDeleteItem}>
          {deleteManyTodoes => {
            return (
              <button
                onClick={() => {
                  deleteManyTodoes({
                    variables: { todoIds: [this.props.item.id] },
                  });
                }}
              >
                x
              </button>
            );
          }}
        </Mutation>
      </Li>
    );
  }
}

export default TodoItem;
