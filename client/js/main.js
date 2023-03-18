const olderPostsList = document.querySelector('.older-posts-list');
const latestPosts = document.querySelector('.latest-posts')
const maxOlderPosts = 5

const getPosts = async () => {
    const response = await fetch('/api/posts')
    const data = await response.json()

    return data.data
}

const renderPosts = (post) => {
    const item = document.createElement('li')
    const itemTitle = document.createElement('h2')
    const itemBody = document.createElement('p')
    const itemImg = document.createElement('img')

    item.setAttribute('class', 'post-item')
    itemTitle.setAttribute('class', 'post-item-title')
    itemBody.setAttribute('class', 'post-item-body')
    itemImg.setAttribute('class', 'post-item-img')

    itemTitle.textContent = post.title
    itemBody.textContent = post.body
    itemImg.src = post.image

    item.append(itemTitle, itemBody, itemImg)

    if (latestPosts.children.length < 4) {
        latestPosts.appendChild(item)
    }
    else {
        if(olderPostsList.children.length < maxOlderPosts){
            item.setAttribute('class', 'post-item-older')
            olderPostsList.appendChild(item)
        }
        else if(olderPostsList.children.length >= maxOlderPosts && !olderPostsList.children[maxOlderPosts]){
            const moreButton = document.createElement('button')

            moreButton.textContent = 'Show more'
            moreButton.setAttribute('class', 'show-more-button')

            olderPostsList.appendChild(moreButton)
        }
    }
}

getPosts().then(d => d.map(p => renderPosts(p)))
