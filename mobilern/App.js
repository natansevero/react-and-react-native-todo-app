import React, { Component } from 'react';
import axios from 'axios';

import { Text, TextInput, View, Button } from 'react-native';

class App extends Component {
  state = {
    newTodoText: '',
    todos: []
  }

  async componentDidMount() {
    const response = await axios.get('http://10.0.3.2:3333/todos')

    this.setState({ todos: response.data })
  }

  async handleNewTodo(e) {
    e.preventDefault();

    if (!this.state.newTodoText) return;
    
    const response = await axios.post('http://10.0.3.2:3333/todos', {
      text: this.state.newTodoText
    })

    this.setState({ todos: [...this.state.todos, response.data] })
    this.setState({ newTodoText: '' })
  }

  render() {
    return (
      <View style={{ padding: 16 }}>
        <TextInput 
          style={{ height: 36, borderWidth: 1, borderColor: '#CCC' }}
          onChangeText={text => this.setState({ newTodoText: text })} 
          value={this.state.newTodoText}
        />
        <Button onPress={this.handleNewTodo.bind(this)} title="Adicionar" />
        
        <View style={{ marginTop: 20 }}>
          {this.state.todos.map(todo => (
            <Text key={todo._id}>{todo.text}</Text>
          ))}
        </View>
      </View>
    );
  }
}

export default App;
