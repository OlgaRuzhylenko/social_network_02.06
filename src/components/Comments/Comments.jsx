import React from "react";
import PropTypes from "prop-types";
import { Comment } from "../Comment/Comment";
import { Grid } from "../Grid/Grid";
// import { comments } from "../../helpers/comments";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/filterSlice";
import {useGetCommentsQuery} from '../../redux/commentApi'
import { Loader } from "../Loader/Loader";

export const Comments = () => {
  const {data: comments, isLoading} = useGetCommentsQuery()
  // console.log(data);
  //тут значення те що вводио в інпут
  const filterSelect = useSelector(selectFilter);
  const filteredComments = () => {
  return  comments.filter(({ content }) =>
      content.toLowerCase().includes(filterSelect.toLowerCase())
    );
  };
  return (
    <Grid>
      {isLoading && <Loader/>}
      {comments &&
        filteredComments().map((comment) => <Comment key={comment.id} {...comment} />)}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape().isRequired),
};
