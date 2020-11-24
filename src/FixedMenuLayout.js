import React, { useState } from 'react'
import {
  Container,
  Dropdown,
  Input, 
  Menu,
  Icon
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';


class FixedMenuLayout extends React.Component {
   options = [
    { key: 'author', text: 'author', value: 'author' },
    { key: 'title', text: 'title', value: 'title' },
  ]
  state = {
    userSearch: '',
    userOption: 'author',
  };
  // let [userSearch, setuserSearch] = useState('');
  // let [userOption, setuserOption] = this.state.author;
  
  handleChange = e =>{
    // setuserSearch(e.target.value);
    this.setState({userSearch:e.target.value});
  }
  
   handleOptions = (e,data) =>{
    //console.log(data.value);
    this.setState({userOption:data.value});
  }
  
   handleSubmit = e => {
    console.log("Submit search")
    console.log(this.state)
    this.props.history.push({
      pathname: '/result',
      state: this.state
    });
    e.preventDefault();
  }

  render(){
  return(
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header as={Link} to="/home">
          {/* <Image size='mini' src='./logo.png' style={{ marginRight: '1.5em' }} /> */}
          Explore
        </Menu.Item>
        

        <Dropdown item simple text='Actions'>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="addbook">Add book</Dropdown.Item>
            <Dropdown.Item as={Link} to="addreview">Add review</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Settings</Dropdown.Header>
            {/* <Dropdown.Item>
              <i className='dropdown icon' />
              <span className='text'>Profile</span>
              <Dropdown.Menu>
                <Dropdown.Item>Manage</Dropdown.Item>
                <Dropdown.Item>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item> */}
            <Dropdown.Item>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item simple text='Type' defaultValue='author' options={this.options} onChange={this.handleOptions}/>
        <Input
          labelPosition='left'
          placeholder='Search...'
          icon={<Icon name='search' inverted circular link link onClick={this.handleSubmit}/>}
          onChange={this.handleChange}
        />
      </Container>
    </Menu>
  </div>
  )
  }
}

export default  withRouter(FixedMenuLayout)