import {useEffect, useMemo} from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { authenticate, getUser } from '../../../store/session'
import { allPosts, getOnePost, deletePost } from '../../../store/posts'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllComments } from '../../../store/comments'
import AllComments from '../../Comments/AllComments'
import './index.css'
import { getOneCommunity } from '../../../store/communities'
import CommunityDetails from '../../Communities/CommunityDetails'
import CommentForm from '../../Comments/CreateComment'

function SinglePostPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { post_id, community_name } = useParams()

    const currentUser = useSelector(state => state.session.user)
    const post= useSelector((state)=> state.posts.singlePost)
    const comments = Object.values(useSelector((state)=> state.comments.allComments))
    const community = useSelector((state)=> state.communities.singleCommunity)

    const user = post.user
    const images = post.images

    const commentsByParentId = useMemo(()=>{
        const group = {}
        comments.forEach(comment =>{
            group[comment.parent_id] ||= []
            group[comment.parent_id].push(comment)
        })
        return group
    }, [comments])


    const rootComments = commentsByParentId[null]

    const removePost = async () => {
        await dispatch(deletePost(post.id))
        await dispatch(allPosts())
        await dispatch(authenticate())
        history.push('/')
    }

    const editPost = () => {
        history.push(`/s/${community_name}/${post.id}/edit`)
    }

    useEffect(()=> {
        // secondFunction()
        dispatch(getOnePost(post_id))
        dispatch(getOneCommunity(community_name))
        dispatch(loadAllComments(post_id))
    }, [dispatch, post_id])




    if(!post||!user||!community) return null
    return (
        <div className='single-post-page-body'>
            <div className='single-post-page-content'>
                <div className='left-main-single-post-div'>
                    <div className='left-main-single-post-header'>
                        </div>
       <div className='post-card-container' id='single-post'>

            <div className='post-card-likes'>
            </div>
            <div className='post-card-main'>
                <div className='post-info-container'>
                    <div className='post-card-community-image-container'>
                        <img src={post.community_image} alt={`${post.community_name} community image`} />
                    </div>
                    <div className='post-card-community-header-container'>
                         <Link className='post-card-link' to={`/s/${post.community_name}`}>
                            <span className='post-card-community-header'>s/{post.community_name}</span>
                        </Link>
                    </div>
                    <div className='post-card-user-container'>
                        <span>· posted by u/{user.username}</span>
                    </div>
                </div>
                <div className='post-title-container'>
                    <span> {post.title} </span>
                </div>
                {(images[0]) &&
                <div className='post-image-container'>
                    <img src={images[0].url}></img>
                </div>
                }
                {(post.text)&&
                <div className='post-card-text-container'>
                    <span>{post.text}</span>
                </div>
                }
                <div className='post-interaction-container'>
                    {/* <div className='post-card-comment-container'>
                        <div className='post-card-comment-icon'>
                            <i className="fa-regular fa-comment"></i>
                        </div>
                        <div className='post-card-comment-text'>
                            <span>Comments</span>
                        </div>
                    </div> */}
                    <div className='post-card-save-container'>
                        {currentUser && currentUser.id===user.id &&
                        <div className='"owner-crud-container'>
                            <div className='post-crud-button'>
                                <button onClick={editPost} className="delete-community-button">Edit Post</button>
                            </div>
                            <div className='post-crud-button'>
                                <button onClick={removePost} className="edit-community-button">Delete Post</button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className='create-comment-form-outer-container'>
            <CommentForm post_id={post_id} />
        </div>
        <div className='comments-outer-container'>
            { (rootComments?.length !==0)&&
            <AllComments rootComments={rootComments}/>
        }
        </div>
        </div>
                <div className='right-main-single-post-div'>
                    <div className='post-page-community-details-container'>
                        <CommunityDetails community={community}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePostPage
