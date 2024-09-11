import React from "react";
import { useSelector } from "react-redux";

import { LuUserSquare } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { LiaBlogSolid } from "react-icons/lia";
import { useGetStoriesQuery } from "../../redux/features/stories/storyAPI";
import { useGetCommentsQuery } from "../../redux/features/comments/commentAPI";
import { useGetUserQuery } from "../../redux/features/auth/authAPI";

import StoriesChart from "./StoriesChart";

const Dashboard = () => {
  const [query, setQuery] = React.useState({ search: "", category: "" });
  const { user } = useSelector((state) => state.auth);

  const { data: stories = [], error, isLoading } = useGetStoriesQuery(query);
  const { data: comments = {} } = useGetCommentsQuery();

  const { data: users = {} } = useGetUserQuery();
  const adminCounts = users?.users
    ? users.users.filter((user) => user.role === "admin").length
    : 0;
  const userCounts = users?.userCount ? users.userCount : 0;

  return (
    <>
      {isLoading && (
        <p className="text-center text-xl font-medium text-accentPrimary">
          Loading...
        </p>
      )}
      <div className="mt-4 space-y-4 text-accentPrimary">
        <div className="space-y-2">
          <h1 className="text-xl uppercase ">Hi, {user?.userName}</h1>
          <p>Welcome back to the Admin Dashboard!</p>
          <p>
            Feel free to tweak the website's features according to the
            organization's policy.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 pt-4">
          <div className="bg-adminC1b w-full rounded-sm flex flex-col items-center space-y-2 py-2">
            <LuUserSquare className="size-8 text-adminC1a" />
            <p className="text-adminC1a">{userCounts} Users</p>
          </div>
          <div className="bg-adminC2b w-full rounded-sm flex flex-col items-center space-y-2 py-2">
            <LiaBlogSolid className="size-8 text-adminC2a" />
            <p className="text-adminC2a">{stories.length} Stories</p>
          </div>
          <div className="bg-adminC2b w-full rounded-sm flex flex-col items-center space-y-2 py-2">
            <RiAdminLine className="size-8 text-adminC2a" />
            <p className="text-adminC2a">
              {adminCounts} Admin{adminCounts !== 1 && "s"}
            </p>
          </div>
          <div className="bg-adminC1b w-full rounded-sm flex flex-col items-center space-y-2 py-2">
            <FaRegComment className="size-8 text-adminC1a" />
            <p className="text-adminC1a">{comments.commentCount} Comments</p>
          </div>
        </div>
        <div className="py-6">
          <StoriesChart stories={stories} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
