import usePostCreatePostMutation from "../hooks/usePostCreatePostMutation";
import { firstOccuranceOfString } from "../utils/firstOccuranceOfString";
import { lengthOfLastWord } from "../utils/lengthOfLastWord";
import { majorityElement } from "../utils/majorityElement";
import { removeDuplicateElements } from "../utils/removeDuplicateElements";
import { rotateByK } from "../utils/rotateByK";

export default function CreatePost() {
  const [createPostMutate, { error }] = usePostCreatePostMutation();
  if (error) {
    <p>error in post creation</p>;
  }
  console.log(
    "duplicate",
    removeDuplicateElements([1, 2, 2, 3, 4, 4, 4, 5, 5, 5, 5])
  );

  console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));
  console.log("rotate", rotateByK([1, 2, 3, 4, 5, 6], 3));
  console.log("len of last word", lengthOfLastWord("Hello World  "));
  console.log(
    "first oocurance of needle",
    firstOccuranceOfString("saadbutsad", "sad")
  );

  return (
    <button
      onClick={() =>
        createPostMutate({
          variables: {
            input: {
              title: "Hello",
              body: "World",
            },
          },
        })
      }
    >
      post
    </button>
  );
}
