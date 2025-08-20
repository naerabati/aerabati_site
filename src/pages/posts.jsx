import { Routes, Route, Link, useParams } from "react-router-dom";
import firstPostContent from "./posts_files/post_1.md?raw";
import secondPostContent from "./posts_files/post_2.md?raw";
import MarkdownRenderer from "../lib/MarkdownRender.jsx";
import Footer from "../components/footer.jsx"


const posts = [
    {
      id: "1",
      title: "First Post",
      date: "Aug 8, 2025",
      caption: "This is my first blog post",
      content: firstPostContent,
    },
    {
      id: "2",
      title: "Second Post",
      date: "Aug 18, 2025",
      caption: "Second blog update",
      content: secondPostContent,
    },
  ];
  
  function PostList() {
    return (
      <div className="flex flex-col justify-center place-items-center">
        <h1 className="text-4xl mb-10 text-center font-medium">Posts</h1>
        <div className="flex flex-col gap-1">
          {posts.map((post) => (
            <div key={post.id} className="p-6 rounded-2xl w-2xl items-center">
              <h2 className="text-2xl mb-2">
                <Link
                  to={`/posts/${post.id}`}
                  className="hover:text-green-600 text-green-950 transition-color"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-md mb-6">{post.date}</p>
              <p className="mb-4 text-green-800">{post.caption}</p>
              <hr className="mt-8" style={{ height: 5 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  function SinglePost() {
    const { id } = useParams();
    const post = posts.find((p) => p.id === id);
  
    if (!post) return <p className="text-center">Post not found</p>;
  
    return (
      <div className="max-w-3xl mx-auto p-6 items-center">
        <h1 className="text-3xl mb-4 mt-7">{post.title}</h1>
        <p className="text-md mb-6">{post.date}</p>
        <MarkdownRenderer content={post.content} />
        <Link to="/posts" className="text-blue-500 hover:underline block mt-6">
          ← Back to posts
        </Link>
      </div>
    );
  }
  
  export default function Posts() {
    return (
      <Routes>
        <Route index element={<PostList />} />
        <Route path=":id" element={<SinglePost />} />
      </Routes>
    );
  }
