import React from 'react';
import FixedMenuLayout from "./FixedMenuLayout";
import Mygrid from "./BottomNav";
import './App.css';
import axios from 'axios';
import BookView from './component/BookView';
import { Container, Pagination } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";


class ResultPage extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        //   theSearch : 
        //   theOption : this.props.userOption
        books: [],
        theSearch : this.props.location.state.userSearch,
        theOption : this.props.location.state.userOption
      }
  }

//   handlePaginationChange = (e, { activePage }) => {
//     //console.log("page changed",{activePage});
//     this.setState({ activePage });
//     axios.get(this.state.apiUrl+this.state.activePage*8)
//     .then(res => {
//       const books = res.data;
//       console.log(books)
//       this.setState({ books });
//       return (
//         this.state.books.map(book=> {
//           return <BookView key={book.asin} book={book}></BookView>
//         })
//       )
//       })

  componentDidMount(){
    console.log(this.state.theSearch);
    console.log(this.state.theOption);
    if (this.state.theOption=='title'){
        console.log("hit")
        axios.get("https://cors-anywhere.herokuapp.com/http://ec2-54-90-244-6.compute-1.amazonaws.com/bookSearch?title="+this.state.theSearch)
        .then(res => {
            const books = [res.data];
            if (books==[]){
              alert("No matching books found")
            }
            //this.setState({ books });
            else{
              console.log(books);
              this.setState({ books });
            }   
            })    
    }  
    if (this.state.theOption=='author'){
        axios.get("https://cors-anywhere.herokuapp.com/http://ec2-54-90-244-6.compute-1.amazonaws.com/bookSearch?author="+this.state.theSearch)
        .then(res => {
            console.log(res)
            const books = res.data;
            if (books==""){
              alert("No matching books found")
            }
            this.setState({ books });
            console.log(books)
            })
      }
}
  renderBooks() {
    return (
        this.state.books.map(book=> {
        return <div class="four wide column" ><BookView key={book.asin} book={book}></BookView></div>
        })
    )
    }
  render(){
    const { books,activePage } = this.state
    return (
    <div>
      <FixedMenuLayout />
      <Container>       
        {/* <Myheader books={books}/>  */}
        <div class="ui grid" style={{ marginTop: '2em' }}>
          {this.renderBooks()}
        </div>
      </Container>  
      <Mygrid />
   </div>
    );
  }
  
}

export default ResultPage;