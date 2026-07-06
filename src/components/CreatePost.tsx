import usePostCreatePostMutation from "../hooks/usePostCreatePostMutation";
import { firstOccuranceOfString } from "../utils/firstOccuranceOfString";
import { lengthOfLastWord } from "../utils/lengthOfLastWord";
import { majorityElement } from "../utils/majorityElement";
import { removeDuplicateElements } from "../utils/removeDuplicateElements";
import { rotateByK } from "../utils/rotateByK";
import { Button } from "@/components/ui/button";

export default function CreatePost() {
  const [createPostMutate, { error }] = usePostCreatePostMutation();
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
    <div className="space-y-2">
      <Button
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
        Create post
      </Button>
      {error && <p className="text-sm text-destructive">Error in post creation</p>}
    </div>
  );
}
