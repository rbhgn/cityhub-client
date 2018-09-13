import React, { PureComponent } from 'react'

export default class InstagramRender extends PureComponent {
  
  state = {previewId: null}
  openPreview = (e) => {
    this.setState({yScrollPos: window.scrollY})
    this.setState({preview: this.props.data.find(x => x.id === +e.currentTarget.id)})
  }

  closePopup = () => {
    this.setState({preview: null})
    setTimeout(() => window.scrollTo({top: this.state.yScrollPos,behavior: "instant"}), 5)  
  }

  updateInstagram = (e) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      this.props.handleUpdateInstagram(e.currentTarget.id, this.props.location)
      this.closePopup()
    }
  }

  loadInstagram = () => {
    this.props.handleLoadInstagram()
  }

  renderPopup = () => {
    return (
      <div className="instagram_popup_container">
        <div className="instagram_popup_media">      
          { (this.state.preview.video_url) ?
            <video className="instagram_popup_image" autoPlay loop muted>
              <source src={this.state.preview.video_url} type="video/mp4">
              </source>
            </video>
          :
            <img src={ this.state.preview.display_url } className="instagram_popup_image" alt={ this.state.preview.full_name } />  
          }
        </div>
        <div className="instagram_popup_buttons">
          <button onClick={ this.closePopup } className="popup_close_button">Close</button>
          <button onClick={ this.updateInstagram } id={ this.state.preview.id } className="popup_remove_button">{this.state.preview.status === 'accepted'? 'Remove': 'Accept'}</button>
        </div>
      </div> 
    )
  }

  renderInstagrams = () => {
    return (
      <div className="instagram_images_container">
        { this.props.data && this.props.data.map((d, i) => {
          return (
            <div className="instagram_image_container" onClick={ this.openPreview} id={ d.id } key={ i }>
              { d.media === "instagramImage" && <img src={ d.display_url } className={d.status === "declined" ? "instagram_image instagram_image_rejected" : "instagram_image"} alt={ d.full_name } />}
              { d.media === "instagramVideo" && <video className="instagram_image" autoPlay loop muted><source src={ d.video_url } type="video/mp4"></source></video>}
            </div>
          )
        })}

        <button onClick={ this.loadInstagram } className="instagram_load_button">LOAD MORE IMAGES</button>
      </div>
    )
  }
  render() {
    return(
      this.state.preview ? this.renderPopup() : this.renderInstagrams()
    )
  }
}