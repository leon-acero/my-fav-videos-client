import ReactPlayer from 'react-player'
import "./videoPlayer.css"

function VideoPlayer({link}) {
  return (
    <div className="videoPlayer">
        <ReactPlayer 
          url={link}
          controls={true}
      />
    </div>
  )
}

export default VideoPlayer