"use client";
import React, { useState, FormEvent } from 'react';

export default function PostForm() {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  interface Post {
    id?: number;
    title: string;
    body: string;
    userId: number;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost: Omit<Post, 'id'> = {
      title,
      body,
      userId: 1, // You might want to dynamically set this
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Failed to submit post');
      }

      const data: Post = await response.json();
      console.log('Post submitted:', data);
      // You can add further logic here, like showing a success message
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
