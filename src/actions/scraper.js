import * as request from 'superagent'
import { baseUrl } from '../constants.js'

const postItem = (item) => {
  request
      .post(`${baseUrl}/instagram`)
      .send(item)
      // .then(result => console.log(result))
      .catch(err => console.log(err.status))
}

const handleInstaUser = async (user, item, keyWord) => {
  item.userName = user.shortcode_media.owner.username
  item.profilePicUrl = user.shortcode_media.owner.profile_pic_url
  item.fullName = user.shortcode_media.owner.full_name
  item.videoUrl = user.shortcode_media.video_url
  if (item.text.includes(keyWord)) {
      try {
          await postItem(item)
      } catch(e) {
          console.log(e)
      }
  }
}

const getInstaUserByHash = (item, keyWord) => {
  request
  .get(`https://www.instagram.com/p/${item.mediaShortCode}/?__a=1`)
  .then(result => handleInstaUser(JSON.parse(result.text).graphql, item, keyWord))
  .catch(err => console.log(err)) 
}

const handleInstaByHash = (data, hashTag, keyWord, type, location) => {
  const path = data.graphql.hashtag
  const recentMedia = path.edge_hashtag_to_media.edges
  const topPosts = path.edge_hashtag_to_top_posts.edges
  


  topPosts.concat(recentMedia).map(m => {
    return({    
      mediaId: m.node.id,
      commentCount: m.node.edge_media_to_comment.count,
      likeCount: m.node.edge_liked_by.count,
      displayUrl: m.node.display_url,
      date: new Date(m.node.taken_at_timestamp * 1000),
      hashtag: hashTag,
      status: 'accepted',
      source: 'instagram',
      owner: m.node.owner.id,
      text:  m.node.edge_media_to_caption.edges.length > 0 && m.node.edge_media_to_caption.edges[0].node.text,
      type: type,
      mediaShortCode: m.node.shortcode,
      location: location,
      isVideo: m.node.is_video
    })
  }).map(async i => {
    try {
      await getInstaUserByHash(i, keyWord)
    } catch(e) {
      console.log(e)
    }
  })
  const nextPage = path.edge_hashtag_to_media.page_info.has_next_page
  if (nextPage) {
    const endCursor = path.edge_hashtag_to_media.page_info.end_cursor
    getInstaByHash(hashTag, keyWord, type, location, endCursor)
  }
}

const handleInstaByLocation = (data, hashTag, keyWord, type, location, locationId) => {
  const path = data.graphql.location
  const recentMedia = path.edge_location_to_media.edges
  const topPosts = path.edge_location_to_top_posts.edges
  topPosts.concat(recentMedia).map(m => {
    return({    
      mediaId: m.node.id,
      commentCount: m.node.edge_media_to_comment.count,
      likeCount: m.node.edge_liked_by.count,
      displayUrl: m.node.display_url,
      date: new Date(m.node.taken_at_timestamp * 1000),
      hashtag: hashTag,
      status: 'accepted',
      source: 'instagram',
      owner: m.node.owner.id,
      text:  m.node.edge_media_to_caption.edges.length > 0 && m.node.edge_media_to_caption.edges[0].node.text,
      type: type,
      mediaShortCode: m.node.shortcode,
      location: location,
      isVideo: m.node.is_video
    })
  }).map(async i => {
    try {
      await getInstaUserByHash(i, keyWord)
    } catch(e) {
      console.log(e)
    }
  })
  const nextPage = path.edge_location_to_media.page_info.has_next_page
  if (nextPage) {
    const endCursor = path.edge_location_to_media.page_info.end_cursor
    console.log("Going AGAIN!!!")
    console.log(hashTag, locationId, keyWord, type, location, endCursor)
    getInstaByLocation(hashTag, locationId, keyWord, type, location, endCursor)
  }
}



const getInstaByHash = (hashTag, keyWord, type, location, endcursor) => {
  let url
  endcursor ? url =`https://www.instagram.com/explore/tags/${hashTag}/?__a=1&max_id=${endcursor}` : url = `https://www.instagram.com/explore/tags/${hashTag}/?__a=1`
  console.log(url)
 request
    .get(url)
    .then(result => handleInstaByHash(JSON.parse(result.text), hashTag, keyWord, type, location))
    .catch(err => console.error(err))
}


const getInstaByLocation = (hashTag, locationId, keyWord, type, location, endcursor) => {
  let url
  endcursor ? url =`https://www.instagram.com/explore/locations/${locationId}/?__a=1&max_id=${endcursor}` : url = `https://www.instagram.com/explore/locations/${locationId}/?__a=1`
  request
  .get(url)
  .then(result => handleInstaByLocation(JSON.parse(result.text), hashTag, keyWord, type, location, locationId))
  .catch(err => console.log(err)) 
}



export const getNewInstaPics = () => {
  hashTags.map(async h => {
      try {
        !h.keyWord && await getInstaByHash(h.hashTag, '', 'hashtag', h.location)
      } catch(e) {
        console.log(e)
      }
      keyWords.map(async k => {
          try {
            await getInstaByHash(h.hashTag, k, 'hashtag', k)
          } catch(e) {
            console.log(e)
          }
      })
  })
  locations.map(async l => {
    try {
      !l.keyWord && await getInstaByLocation(l.hashTag, l.locationId, '', 'location', l.location)
    } catch(e) {
      console.log(e)
    }     
  })
}

export const keyWords = ['amsterdam', 'rotterdam']
export const hashTags = [
    {
        hashTag: 'cityhubamsterdam',
        keyWord: false,
        location: 'amsterdam'
    },
    {
        hashTag: 'cityhubrotterdam',
        keyWord: false,
        location: 'rotterdam'
    },
    {
        hashTag: 'cityhubams',
        keyWord: false,
        location: 'amsterdam'
    },
    {
        hashTag: 'cityhubrtm',
        keyWord: false,
        location: 'rotterdam'
    },
    {
        hashTag: 'cityhubamsterdaml',
        keyWord: false,
        location: 'amsterdam'
    },
    {
        hashTag: 'whathappensinyourhub',
        keyWord: true
    },
    {
        hashTag: 'cityhub',
        keyWord: true
    },
    {
        hashTag: 'cityhubhostel',
        keyWord: true
    },
    {
        hashTag: 'cityhubhotel',
        keyWord: true
    }
]

export const locations = [
    {
        hashTag: 'cityhubamsterdam',
        locationId: 156630418354785,
        location: 'amsterdam'
    },
    {
        hashTag: 'cityhubrotterdam',
        locationId: 359009231272701,
        location: 'rotterdam'
    }
]
