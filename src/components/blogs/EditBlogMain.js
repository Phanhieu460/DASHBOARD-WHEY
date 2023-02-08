import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BLOG_UPDATE_RESET } from "../../Redux/Constants/BlogConstants";
import {
  createBlog,
  editBlog,
  updateBlog,
} from "./../../Redux/Actions/BlogActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { Editor } from "@tinymce/tinymce-react";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditBlogMain = (props) => {
  const { blogId } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [writer, setWriter] = useState("");

  const dispatch = useDispatch();

  const blogEdit = useSelector((state) => state.blogEdit);
  const { loading, error, blog } = blogEdit;

  const blogUpdate = useSelector((state) => state.blogUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = blogUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BLOG_UPDATE_RESET });
      toast.success("Sửa sản phẩm thành công!", ToastObjects);
    } else {
      if (!blog.name || blog._id !== blogId) {
        dispatch(editBlog(blogId));
      } else {
        setName(blog.name);
        setDescription(blog.description);
        setImage(blog.image);
      }
    }
  }, [blog, dispatch, blogId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBlog({
        _id: blogId,
        name,
        image,
        description,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/blogs" className="btn btn-danger text-white">
              Quay Lại
            </Link>
            <h2 className="content-title">Sửa Bài Viết</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Lưu
              </button>
            </div>
          </div>

          <div className="row mb-4 justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <>
                    <div className="mb-4">
                      <label htmlFor="blog_title" className="form-label">
                        Tên bài viết
                      </label>
                      <input
                        type="text"
                        placeholder="Vui lòng nhập vào đây"
                        className="form-control"
                        id="blog_title"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Mô tả</label>
                      <Editor
                        name="description"
                        init={{
                          height: 300,
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        value={description}
                        onEditorChange={(content) => {
                          setDescription(content);
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Hình ảnh</label>
                      <input
                        type="text"
                        placeholder="Vui lòng nhập vào đây"
                        className="form-control"
                        required
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditBlogMain;
