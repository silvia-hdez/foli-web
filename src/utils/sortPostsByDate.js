export function sortPostsByDate(posts) {
    return posts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }
  