import { API } from "../../../../libs/api";
import { useQuery } from "react-query";
import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { AUTH_LOGOUT, RootState } from "../../../../Store/store";
import { useDispatch } from "react-redux";

export interface User {
    id?: number | undefined;
    username?: string;
    full_name?: string;
    email?: string;
    password?: string;
    profile_picture?: string;
    profile_description?: string;
  }
  
  export interface Replies {
    id?: number | undefined;
    content?: string;
    image?: string;
    user?: User;
  }
  
interface Post {
    id?: number;
    content: string;
    image?: Blob | string;
    users?: User;
    reply?: Replies [];
    likes?: User[];
  }
export default function PostHooks(props: Post) {

    const { id, content, image, likes, reply } = props;
    const user_id = useSelector((state: RootState) => state.auth?.id);
    const [post, setPost] = useState<Post>({
    id,
    content,
    image,
    users: props.users,
    likes,
    reply, 
  });

  const [isLiked, setIsLiked] = useState<boolean | undefined>(false);
  useEffect(() => {
    if (likes) {
        likes.forEach((item)=> {
            if (item.id === user_id) {
                setIsLiked(true)
            }
        })
    }
}, [likes])
    
const handleLike = (id: number | undefined, user_id: number | undefined, isLiked: boolean | undefined) => {
    console.log(user_id, id, isLiked);
  
    API.post(`/like/${id}`, {
      user_id: user_id,
      action: isLiked, 
    })
      .then(() => {
        setIsLiked(!isLiked); 
      })
      .catch((error) => {
        console.error("Error liking the post:", error);
      });
  };
  
  
  const { data: getPosts, refetch, isLoading, isError } = useQuery<Post[]>(
    {
      queryKey: ["thread"],
      queryFn: async () => {
        const response = await API.get('/threads');
        return response.data;
      },
    }
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files) {
      setPost({
        ...post,
        [name]: files[0],
      });
    } else {
      setPost({
        ...post,
        [name]: value,
      });
    }
  }

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("content", post.content);
    if (post.image) {
      formData.append("image", post.image);
    }

    try {
       API.post("/thread", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      localStorage.setItem("post", JSON.stringify(post));
      refetch();
    } catch (error) {
      console.error("Error posting data:", error);
      // Handle the error here, e.g., show an error message to the user.
    }
  }
    // const auth = useSelector((state: RootState) => state.auth);
const dispatch = useDispatch();
// const history = useHistory();
// const navigate = useNavigate();


const [LogOut, setLogout] = useState(false);
const handleLogout = () => {
  dispatch(AUTH_LOGOUT());
  setLogout(true);
  localStorage.removeItem('token');
  window.location.href = '/auth/login';
  // navigate('/auth/login');
}

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePostClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  return {
    handlePost, handleChange, handlePostClick, handleLike,  fileInputRef, getPosts, isLoading, isError,isLiked,handleLogout
  };
}

