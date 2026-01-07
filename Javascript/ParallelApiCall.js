// APIs:
// Posts: https://jsonplaceholder.typicode.com/posts
// Comments: https://jsonplaceholder.typicode.com/comments

async function fetchPostsWithComments() {
  // Your implementation here

  try {
    const [commentRes, postsRes] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/comments`),
        fetch(`https://jsonplaceholder.typicode.com/posts`)
    ])

    const posts = await postsRes.json()
    const comments = await commentRes.json()

    let commentCount = {};

    comments.forEach(cmt => {
        commentCount[cmt.postId] = (commentCount[cmt.postId] || 0) + 1;
    })

    let result = posts&&posts.map(post => ({
        postId: post.id,
        title: post.title,
        commentCount: commentCount[post.id] || 0,
        firstCommenterEmail: comments[post.id].email
    }))

    return result;

  } catch (error) {
    console.log(`Fetching Failed: ${error.message}`)
  }

}

fetchPostsWithComments().then(result => console.log(result));

/* Expected Output (top 5 posts by comment count):
[
  {
    postId: 1,
    title: 'sunt aut facere repellat provident...',
    commentCount: 5,
    firstCommenterEmail: 'Eliseo@gardner.biz'
  },
  {
    postId: 2,
    title: 'qui est esse',
    commentCount: 5,
    firstCommenterEmail: 'Jayne_Kuhic@sydney.com'
  },
  // ... 3 more posts
]
*/
