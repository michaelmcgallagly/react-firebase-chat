import "./detail.css"

export default function Detail() {
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor, sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://i.pinimg.com/236x/93/55/0a/93550a80aec370411fe75ae163f6bfd7.jpg" alt="" />
                <span>photo_2024_2.png</span>             
              </div>
              <img src="./download.png" alt="" className="icon"/>
              </div>
              <div className="photoItem">
              <div className="photoDetail">
                <img src="https://i.pinimg.com/236x/93/55/0a/93550a80aec370411fe75ae163f6bfd7.jpg" alt="" />
                <span>photo_2024_2.png</span>             
              </div>
              <img src="./download.png" alt="" className="icon"/>
              </div>
              <div className="photoItem">
              <div className="photoDetail">
                <img src="https://i.pinimg.com/236x/93/55/0a/93550a80aec370411fe75ae163f6bfd7.jpg" alt="" />
                <span>photo_2024_2.png</span>             
              </div>
              <img src="./download.png" alt="" className="icon"/>
              </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  )
}