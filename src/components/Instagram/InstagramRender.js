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
    const message = this.state.preview.status === 'accepted' ? "Are you sure you want to reject this item?" : "Are you sure you want to accept this item?"
    if (window.confirm(message)) {
      this.props.handleUpdateInstagram(e.currentTarget.id, this.props.location)
      this.closePopup()
    }
  }

  renderPopup = () => {
    return (
      <div className="instagram_popup_container">
        <div className="instagram_popup_media">      
          { (this.state.preview.video_url) ?
            <video className="instagram_popup_image" poster={ this.state.preview.display_url } autoPlay loop muted  title={`${this.state.preview.full_name}(@${this.state.preview.user_name}): ${this.state.preview.text} Searchtype: ${this.state.preview.type}`}>
              <source src={this.state.preview.video_url} type="video/mp4" >
              </source>
            </video>
          :
            <img src={ this.state.preview.display_url } className="instagram_popup_image" alt={ this.state.preview.full_name } title={`${this.state.preview.full_name}(@${this.state.preview.user_name}): ${this.state.preview.text} Searchtype: ${this.state.preview.type}`}/>  
          }
        </div>
        <div className="instagram_popup_buttons">
          <button onClick={ this.closePopup } className="popup_close_button">Close</button>
          <button onClick={ this.updateInstagram } id={ this.state.preview.id } className="popup_remove_button">{this.state.preview.status === 'accepted'? 'Reject': 'Accept'}</button>
        </div>
      </div> 
    )
  }

  renderInstagrams = () => {
    return (
      <div className="instagram_images_container">
            { this.props.limit === 'none' &&  <button onClick={ this.props.toggleView } className="instagram_toggle_button">Show Social Screen Images Only</button> }
    { this.props.limit !== 'none' &&  <button  onClick={ this.props.toggleView } className="instagram_toggle_button">Show All Images</button> }
        { this.props.data && this.props.data.map((d, i) => {
          return (
            <div className="instagram_image_container" onClick={ this.openPreview} id={ d.id } key={ i }>
              { d.media === "instagramImage" && <img src={ d.display_url } className={d.status === "declined" ? "instagram_image instagram_image_rejected" : "instagram_image"} alt={ d.full_name } title={`${d.full_name}(@${d.user_name}): ${d.text} Searchtype: ${d.type}`}/>}
              { d.media === "instagramVideo" && <video className={d.status === "declined" ? "instagram_image instagram_image_rejected" : "instagram_image"} poster={ d.display_url } loop muted autoPlay title={`${d.full_name}(@${d.user_name}): ${d.text} Searchtype: ${d.type}`}><source src={ d.video_url } type="video/mp4"></source></video> }
            </div>
          )
        })}
      </div>
    )
  }
  render() {
    return(
      this.state.preview ? this.renderPopup() : this.renderInstagrams()
    )
  }
}