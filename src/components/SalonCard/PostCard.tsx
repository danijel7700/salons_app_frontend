export default function PostCard(post: any) {
  return (
    <>
      <div className="postDiv">
        <img
          src={require(`../../images/${post.post.image}`)}
          className="postImage"
        />
      </div>
    </>
  );
}
