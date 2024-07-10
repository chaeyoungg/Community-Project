import useFetch from "@hooks/useFetch";
import CommentItem from "@pages/community/CommentItem";
import CommentNew from "@pages/community/CommentNew";

function CommentList({ id }) {
  // {{URL}}/posts/1/replies //게시물의 id로 넘김

  const { data } = useFetch(`/posts/${id}/replies`);
  console.log("id=>", id);

  console.log("commentdata=>", data);

  return (
    <>
      {/* 댓글 목록 */}
      <section className="mb-8">
        <h4 className="mt-8 mb-4 ml-2">댓글 {data?.item?.length}개</h4>
      </section>

      {data?.item?.map((listItem) => (
        <CommentItem key={listItem._id} data={listItem} id={id} />
      ))}
      {/* <CommentItem data={data} /> */}
      <CommentNew />
    </>
  );
}

export default CommentList;
