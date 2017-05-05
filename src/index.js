import React , {Component}from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDt8AqLGsOGqWGlfhmgurRRkkxNH-rJK80';




import reducers from './reducers';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos : [],
      selectedVideo : null
    };

    this.videoSearch('zayn');
  }

  videoSearch(term){
    YTSearch({key : API_KEY, term},(videos)=>{this.setState({videos,selectedVideo : videos[0]})});

  }

  render(){

    const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300)
    return (
      <div>
        <SearchBar onSearchTermChange = {videoSearch}  />
        <VideoDetail video = {this.state.selectedVideo} />
        <VideoList
          onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
          videos = {this.state.videos} />
      </div>
    );
  }

}

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.getElementById('container'));
