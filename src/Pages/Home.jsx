import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import CreatePost from "../Components/CreatePost";
import Posts from "../Components/Posts";
import LoadingScreen from "../Components/LoadingScreen";
import fetcher from "../Utils/axios";

const Home = () => {
  const [Loading, setLoading] = useState(true);
  const [Postes, setPostes] = useState([]);
  const [postCount, setPostCount] = useState(0); // To track current number of posts
  const [trigger, setTrigger] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false); // For loading indicator on scroll

  useEffect(() => {
    fetcher
      .get("post/homepage")
      .then((res) => {
        const data = res.data.posts;
        setPostes((prevPosts) => [...prevPosts, ...data]); // Append new posts
        setPostCount(data.length); // Update post count
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false); // Hide loading when done
      });
  }, [trigger]);

  useEffect(() => {
    if (postCount !== 30) {
      return; // If the fetched data is not 30 posts, no need to fetch more
    }

    const handleScroll = () => {
      // Only trigger scroll when scrolled to bottom and more posts are available
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
        !loadingMore
      ) {
        setLoadingMore(true); // Show loading indicator
        setTrigger(!trigger); // Trigger next data fetch
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, [postCount, loadingMore, trigger]);

  if (Loading && Postes.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <div className="py-2">
        <CreatePost />
      </div>
      <div className="pt-3">
        <Posts hidePosts={true} Posts={Postes} />
        {loadingMore && <p>Loading more posts...</p>} {/* Show loading text */}
      </div>
    </Layout>
  );
};

export default Home;
