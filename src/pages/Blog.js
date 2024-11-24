// src/components/Blog.js
import React from 'react';
import styles from './Blog.module.css';

const posts = [
  {
    title: "Bài viết 1",
    description: "Mô tả ngắn gọn về bài viết 1.",
    date: "25/10/2024",
  },
  {
    title: "Bài viết 2",
    description: "Mô tả ngắn gọn về bài viết 2.",
    date: "24/10/2024",
  },
  {
    title: "Bài viết 3",
    description: "Mô tả ngắn gọn về bài viết 3.",
    date: "23/10/2024",
  },
  {
    title: "Bài viết 4",
    description: "Mô tả ngắn gọn về bài viết 4.",
    date: "22/10/2024",
  },
];

const Blog = () => {
  return (
    <section className={styles.blog}>
      <h2>Trang Blog</h2>
      <div className={styles.postsList}>
        {posts.map((post, index) => (
          <div className={styles.postItem} key={index}>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postDate}>{post.date}</p>
            <p className={styles.postDescription}>{post.description}</p>
            <button className={styles.readMore}>Đọc thêm</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Blog;