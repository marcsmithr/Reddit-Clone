import React, { useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { LoginModalContext } from "../../context/LoginModalContext";
import { createCommunity } from "../../../store/communities";
import './index.css'
import handlePreviewImage from "../../../utils/ImageUploads/previewImage";

function CreateCommunityButton({ user }) {
  const dispatch = useDispatch();
  const [ errors, setErrors ] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [showCreateCom, setShowCreateCom] = useState(false);
  const [communityName, setCommunityName] = useState('')
  const [communityTitle, setCommunityTitle] = useState('')
  const [description, setDescription] = useState('')
  const [communityImage, setCommunityImage] = useState('')
  const [previewCI, setPreviewCI] = useState('')
  const [communityBanner, setCommunityBanner] = useState('')
  const [previewCB, setPreviewCB] = useState('')
  const ulRef = useRef();
  const history = useHistory()

  const { showMenu, setShowMenu } = useContext(LoginModalContext)

  const currentUser = useSelector((state)=> state.session.user)

  const updateCommunityName = (e) => setCommunityName(e.target.value)
  const updateCommunityTitle = (e) => setCommunityTitle(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updateCommunityImage = (e) => setCommunityImage(e.target.value)
  const updateCommunityBanner = (e) => setCommunityBanner(e.target.value)

  const openCreateCom = () => {
    if (showCreateCom) return;
    setShowCreateCom(true);
  };

  const closeCreateCom = () => {
    setShowCreateCom(false);
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", communityName)
    formData.append("title", communityTitle)
    formData.append("description", description)

    if(communityImage){
      formData.append("community_image", communityImage)
    }
    if(communityBanner){
      formData.append("community_banner", communityBanner)
      payload.community_banner = communityBanner
    }
    let newCommunityName
    dispatch(createCommunity(formData))
    .then((res)=> newCommunityName = res.name)
    .then(() => history.push(`/s/${newCommunityName}`))
  };

    //FORM VALIDATION USEEFFECT
    useEffect(()=>{
      let errors = []

          if(communityImage){
              if(communityImage?.type !== 'image/jpg' && communityImage?.type !== 'image/png' && communityImage?.type !== 'image/jpeg'){
                  errors.push('Please select a valid image file type')
                  setErrors(['Please select a valid image file type (jpg, png, jpeg)'])
              }
          }
          if(communityBanner){
            if(communityBanner?.type !== 'image/jpg' && communityBanner?.type !== 'image/png' && communityBanner?.type !== 'image/jpeg'){
                errors.push('Please select a valid image file type')
                setErrors(['Please select a valid image file type (jpg, png, jpeg)'])
            }
        }

      if (errors.length > 0) setDisabled(true)
      else setDisabled(false)
      setErrors(errors)
      console.log("ERRORS", errors)
  }, [communityImage, communityBanner])


  const handleCreateBase64 = useCallback(handlePreviewImage,[])

  const updateAndPreviewCI = (e) => {
    handleCreateBase64(e)
    .then(data=>setPreviewCI(data))
    updateCommunityImage(e)
  }

  const updateAndPreviewCB = (e) => {
    handleCreateBase64(e)
    .then(data=>setPreviewCB(data))
    updateCommunityBanner(e)
  }

  let ulClassName = "profile-dropdown" + (showCreateCom ? "" : " hidden");

  return (
    <div>
      {currentUser&&
      <button className="create-community-button" onClick={openCreateCom}>
        Create Community
      </button>
      }
      {!currentUser&&
      <button className="create-community-button" onClick={openMenu}>
        Create Community
      </button>
      }
      <ul className={ulClassName} ref={ulRef}>
        <div className="dropdown-menu">
            <div className="create-community-modal">
                <div className="create-community-modal-header">
                    <h2>Create a community</h2>
                    <i className="fa-solid fa-x" onClick={closeCreateCom}></i>
                </div>
                <div className="community-form-header">
                    <h2>Name</h2>
                    <span>Community names including capitalization cannot be changed.</span>

                </div>
                <div>
                    <form className="create-community-form" onSubmit={handleSubmit}>
                      <div className="form-input">
                        <input
                        className='community-form-name margin-t-10 create-form-child'
                        type={'text'}
                        name="community_name"
                        placeholder={'Community Name'}
                        required
                        value={communityName}
                        onChange={updateCommunityName}
                        maxLength="25"
                        />
                        </div>
                        <div className="form-input" id="create-community-span">
                          <span className="margin-t-10">{`${25-communityName.length} characters remaining`}</span>
                        </div>
                        <div className="form-input">
                        <input
                        id='community-form-title'
                        type={'text'}
                        name="community_title"
                        placeholder={'Community Title'}
                        required
                        value={communityTitle}
                        onChange={updateCommunityTitle}
                        maxLength="50"
                        />
                        </div>
                        <div className="form-textarea">
                        <textarea
                            className='community-form-description create-form-child'
                            type={'text'}
                            name="description"
                            placeholder={'Decription'}
                            value={description}
                            onChange={updateDescription}
                            maxLength="500"
                            required
                        />
                        </div>
                        <div className="form-input">
                        <input
                        className='community-form-image create-form-child'
                        type='file'
                        accept='image/*, png, jpeg, jpg'
                        name="community_image"
                        placeholder={'Community Icon (optional)'}
                        value={communityImage}
                        onChange={updateAndPreviewCI}
                        />
                        </div>
                        <div className="form-input">
                        <input
                        className='community-form-banner create-form-child'
                        type='file'
                        accept='image/*, png, jpeg, jpg'
                        name="community_banner"
                        placeholder={'Community Banner (optional)'}
                        value={communityBanner}
                        onChange={updateAndPreviewCB}
                        />
                        </div>
                        <div className='community-submit-container margin-t-10'>
                            {(!communityName) &&
                                <button className='post-submit' disabled>Create</button>
                            }
                            {(communityName) &&
                            <button className='post-submit'>Create</button>
                            }
                        </div>
                    </form>

                </div>

            </div>
        </div>

      </ul>
    </div>
  );
}

export default CreateCommunityButton;
