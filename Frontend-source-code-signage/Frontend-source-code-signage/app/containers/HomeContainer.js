import { connect } from 'react-redux'
import Home from '../components/Home';


const mapStateToProps = (state) => {
  return {
  //  user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchPosts: () => {
    //   dispatch(fetchPosts()).then((response) => {
    //         !response.error ? dispatch(fetchPostsSuccess(response.payload.data)) : dispatch(fetchPostsFailure(response.payload.data));
    //       });
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
