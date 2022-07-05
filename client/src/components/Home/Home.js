import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Form from '../Form/Form.js';
import Posts from '../Posts/Posts.js';
import { getPostsBySearch } from '../../actions/posts.js';
import Pagination from '../Pagination/Pagination.jsx';
import useStyles from './styles.js';
import { useHistory, useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () =>{
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const handleKeyPress = (e) => {
    if (e.which === 13 ){
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim().length || tags.length) {
      //dispatch logic to get posts by search term
      //joins the tags array into a comma seperated string so that it can be passed within query parameters
      dispatch(getPostsBySearch({search, tags: tags.join(',')}));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else{
      history.push('/');
    }
  };

  return (
    <Grow in >
      <Container maxWidth='xl'>
        <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.appBarSearch} color="inherit">
              <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={(e) => handleKeyPress(e)}/>
              <ChipInput style={{margin: '10px 0'}} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined" />
              <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">
                Search
              </Button>
            </Paper>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6} >
                <Pagination page={page}/>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;