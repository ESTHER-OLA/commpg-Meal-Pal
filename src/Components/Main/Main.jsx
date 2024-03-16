import React, {
  useState,
  useRef,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import { Button } from "@material-tailwind/react";
import addImage from "../../assets/images/add-Image.png";
import { AuthContext } from "../AppContext/AppContext";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Alert } from "@material-tailwind/react";
import PostCard from "./PostCard";
import TagButton from "./TagButton";

const Main = () => {
  const { user, userData } = useContext(AuthContext);
  const text = useRef("");
  const scrollRef = useRef("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (text.current.value !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: serverTimestamp(),
        });
        text.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  const storage = getStorage();

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  const submitImage = async () => {
    const fileType = metadata.contentType.includes(file["type"]);
    if (!file) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );
        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc?.docs?.map((item) => item?.data()),
        });
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
        setImage(null);
        setFile(null);
        setProgressBar(0);
      });
    };
    return () => postData();
  }, [SUBMIT_POST]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-4 w-full bg-[#f4f4f4] rounded-3xl shadow-lg">
        <div className="flex items-center pb-4 pl-4 w-full">
          <Avatar
            size="sm"
            variant="circular"
            src={user?.photoURL || avatar}
            alt="avatar"
          ></Avatar>
          <form className="w-full">
            <div className="flex justify-between items-center">
              <div className="w-full ml-4">
                <input
                  type="text"
                  name="text"
                  placeholder={`Whats on your mind ${
                    user?.displayName?.split(" ")[0] ||
                    userData?.name?.charAt(0).toUpperCase() +
                      userData?.name?.slice(1)
                  }`}
                  className="outline-none w-full bg-[#f4f4f4] rounded-md"
                  ref={text}
                ></input>
              </div>
              <div className="mx-4">
                {image && (
                  <img
                    className="h-24 rounded-xl"
                    src={image}
                    alt="previewImage"
                  ></img>
                )}
              </div>
            </div>
          </form>
        </div>
        <span
          style={{ width: `${progressBar}%` }}
          className="bg-[#101010] py-1 rounded-md"
        ></span>
        <div className="flex justify-between pt-10 bottom-0">
          <div className="pl-5">
            <Button
              className="bg-[#4248fb]"
              type="submit"
              onClick={handleSubmitPost}
            >
              Post
            </Button>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="addImage"
              className="cursor-pointer flex items-center"
            >
              <img className="h-10 mr-4" src={addImage} alt="addImage"></img>
              <input
                id="addImage"
                type="file"
                style={{ display: "none" }}
                onChange={handleUpload}
              ></input>
            </label>
            {file && (
              <Button variant="text" onClick={submitImage}>
                Upload
              </Button>
            )}
          </div>
        </div>
      </div>
      <TagButton></TagButton>
      <div className="flex flex-col py-4 w-full">
        {state?.error ? (
          <div className="flex justify-center items-center">
            <Alert color="red">
              Something went wrong refresh and try again...
            </Alert>
          </div>
        ) : (
          <div>
            {state?.posts?.length > 0 &&
              state?.posts?.map((post, index) => {
                return (
                  <PostCard
                    key={index}
                    logo={post?.logo}
                    id={post?.documentId}
                    uid={post?.uid}
                    name={post?.name}
                    email={post?.email}
                    image={post?.image}
                    text={post?.text}
                    timestamp={new Date(
                      post?.timestamp?.toDate()
                    )?.toUTCString()}
                  ></PostCard>
                );
              })}
          </div>
        )}
      </div>
      <div ref={scrollRef}>{/* refference for later */}</div>
    </div>
  );
};

export default Main;