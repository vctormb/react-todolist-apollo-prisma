import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

// queries
import { TODOES_QUERY } from '../../graphql';

const CREATE_TODO_MUTATION = gql`
  mutation CreateTodoMutation($description: String!) {
    createTodo(description: $description) {
      id
      description
      isDone
    }
  }
`;

const Input = styled.input`
  margin-bottom: 10px;
`;

class TodoInput extends React.Component {
  state = {
    description: '',
  };

  onCreateItem = (cache, { data: { createTodo } }) => {
    const { todoes } = cache.readQuery({ query: TODOES_QUERY });

    cache.writeQuery({
      query: TODOES_QUERY,
      data: {
        todoes: todoes.concat(createTodo),
      },
    });
  };

  onSubmit = (e, createTodo) => {
    e.preventDefault();

    createTodo({ variables: { description: this.state.description } });

    this.setState({
      description: '',
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_TODO_MUTATION} update={this.onCreateItem}>
        {createTodo => {
          return (
            <React.Fragment>
              <form onSubmit={e => this.onSubmit(e, createTodo)}>
                <Input
                  name="description"
                  placeholder="description here"
                  onChange={e => this.setState({ description: e.target.value })}
                  value={this.state.description}
                />
                <button type="submit">ADD</button>
              </form>
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

export default TodoInput;
