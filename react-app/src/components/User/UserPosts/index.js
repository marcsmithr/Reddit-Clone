import React from "react"
import PostCard from "../../AllPosts/PostCard"

function UserPosts({user}){
    console.log('POSTS IN USERS', user)
    const posts = user.posts
    console.log('ACTUALLY POSTS IN USERS', posts)

    if(!posts){
        return(
            <h1>
                {'No Posts Yet :('}
            </h1>
        )
    }
    return(
        <>
        <div className='left-main-home-header'>
            <h1 id='recent-act-text'> Recent Activity </h1>
        </div>
        <div className='posts-container'>
            {posts.map((post) => (
                <PostCard
                 post={post}
                 user={user}
                key={post.id}
                            />
                ))}
        </div>
        </>
    )
}

export default UserPosts
