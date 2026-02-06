import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

export type CreatePostMutation = {
  createPost: {
    id: string;
    title: string;
    body: string;
  };
};

export default function usePostCreatePostMutation() {
  return useMutation<CreatePostMutation>(CREATE_POST);
}
