import React from "react"
import PostCard from "../../AllPosts/PostCard"

function UserPosts({posts}){

    if(posts.length===0){
        return(
            <h1>
                {'No Posts Yet :('}
            </h1>
        )
    }
    return(
        <>
        <div className='posts-container'>
            {posts.map((post) => (
                <PostCard
                post={post}
                key={post.id}
                            />
                ))}
        </div>
        </>
    )
}

export default UserPosts
