import ReactPlayer from 'react-player'
import "./videoPlayer.css"

function VideoPlayer({video}) {

  // console.log("video.videoUrl", video.videoUrl)

  return (
    <div className="videoPlayer">

      <div className='videoPlayer--reactPlayer'>
        <ReactPlayer 
          url={video.videoUrl}
          controls={true}
        />
      </div>

      {
        video.profileLogoUrl !== "" && 
          <div className='videoPlayer--videoDetails'>
            <p className='videoPlayer--videoDetails-myTitle'>{video.myTitle}</p>
            <p>{video.originalTitle}</p>

            <div className='videoPlayer--videoDetails-channel'>
              <img className='videoPlayer--logoChannel' src={video.profileLogoUrl} alt={video.profileLogoUrl} />
              <p className='videoPlayer--videoDetails-channelTitle'>{video.channelTitle}</p>
            </div>
            
            {/* <p>{video.originalDescription}</p> */}
          </div>
      }
    </div>
  )
}

export default VideoPlayer