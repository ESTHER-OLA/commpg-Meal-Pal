// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import like from "../../assets/images/love.png";
import comment from "../../assets/images/comment.png";
import remove from "../../assets/images/delete.png";
import { AuthContext } from "../AppContext/AppContext";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import {
  doc,
  setDoc,
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import CommentSection from "./CommentSection";

// eslint-disable-next-line react/prop-types
const PostCard = ({ uid, id, logo, email, text, image, timestamp }) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const likesRef = doc(collection(db, "posts", id, "likes"));
  const likesCollection = collection(db, "posts", id, "likes");
  const singlePostDocument = doc(db, "posts", id);
  const { ADD_LIKE, HANDLE_ERROR } = postActions;
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const q = query(likesCollection, where("id", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    const likesDocId = await querySnapshot?.docs[0]?.id;
    try {
      if (likesDocId !== undefined) {
        const deleteId = doc(db, "posts", id, "likes", likesDocId);
        await deleteDoc(deleteId);
      } else {
        await setDoc(likesRef, {
          id: user?.uid,
        });
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      if (user?.uid === uid) {
        await deleteDoc(singlePostDocument);
      } else {
        alert("You cant delete other users posts !!!");
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getLikes = async () => {
      try {
        const q = collection(db, "posts", id, "likes");
        await onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_LIKE,
            likes: doc.docs.map((item) => item.data()),
          });
        });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    };
    const getComments = async () => {
      try {
        const commentsQuery = collection(db, "posts", id, "comments");
        await onSnapshot(commentsQuery, (doc) => {
          setComments(doc.docs.map((item) => item.data()));
        });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    };
    getLikes();
    getComments();
  }, [ADD_LIKE, HANDLE_ERROR, id]);

  const commentCount = comments.length;

  return (
    <div className="mb-4">
      <div className="flex flex-col border border-white-300 shadow-md py-4 bg-white rounded-t-3xl">
        <div className="flex items-center pb-4 ml-2">
          {/* Wrap the image with a Link to view profile picture
      <Link to={`/profile/${uid}`}>
        <img src={image} alt="User post" />
      </Link> */}
          {/* Conditionally render the CTA button in the profilepage.jsx
        {!isOwnProfile && <button>Follow</button>} */}
          <Avatar
            size="sm"
            variant="circular"
            src={logo || avatar}
            alt="avatar"
          ></Avatar>
          <div className="flex justify-between w-full">
            <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
              {email}
            </p>
            <p className="mr-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
              {timestamp}
            </p>
          </div>
        </div>
        <div>
          <p className="ml-4 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            {text}
          </p>
          {image && (
            <img className="h-[500px] w-full" src={image} alt="postImage"></img>
          )}
        </div>
        <div className="flex justify-around items-center pt-4">
          <button
            className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100"
            onClick={handleLike}
          >
            <img className="h-8 mr-4" src={like} alt=""></img>
            <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
              Love {""}
            </p>
            ({state.likes?.length > 0 && state?.likes?.length})
          </button>
          <div
            className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-10"
            onClick={handleOpen}
          >
            <div className="flex items-center cursor-pointer">
              <img className="h-8 mr-4" src={comment} alt="comment"></img>
              <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                Comments ({commentCount})
              </p>
            </div>
          </div>
          <div
            className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-10"
            onClick={deletePost}
          >
            <img className="h-8 mr-4" src={remove} alt="delete"></img>
            <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
              Delete
            </p>
          </div>
        </div>
      </div>
      {open && <CommentSection postId={id}></CommentSection>}
    </div>
  );
};

export default PostCard;
