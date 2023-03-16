const olderPostsList = document.querySelector('.older-posts-list');
const latestPosts = document.querySelector('.latest-posts')

const renderOlderPosts = () => {
    const blogItem = document.createElement('li');
    const blogTitle = document.createElement('h2');
    const blogParagraph = document.createElement('p');

    blogItem.append(blogTitle, blogParagraph);
    olderPostsList.appendChild(blogItem)
}

const showMorePosts = () => {

}

if(latestPosts.children.length === 4){
    renderOlderPosts()
}