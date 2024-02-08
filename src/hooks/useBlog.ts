// hooks/useBlog.ts
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../services/firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

interface Blog {
  id: string;
  title: string;
  description: string;
}

const useBlog = () => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string>('');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog>({
    id: "",
    title: "",
    description: "",
  });

  const handleAdd = () => {
    setSelectedBlog({
      id: "",
      title: "",
      description: "",
    });
    setModalOpen(true);
  };

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSave = async (data: {
    title: string;
    description: string;
    id?: string;
  }) => {
    try {
      if (selectedBlog.id) {
        // If the blog has an ID, update the existing document
        await updateDoc(doc(db, "blog", selectedBlog.id), {
          title: data.title,
          description: data.description,
        });
        toast.success("Update successful");
      } else {
        // If the blog does not have an ID, add a new document with auto-generated ID
        const docRef = await addDoc(collection(db, "blog"), {
          title: data.title,
          description: data.description,
        });
        data.id = docRef.id; // Assign the auto-generated ID to the blog
        toast.success("Add successful");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.success("Error saving data");
    } finally {
      setModalOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'blog', id));
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      toast.success('Delete successful');
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Error deleting data');
    }
  };

  const handleDeleteWithConfirmation = (id: string) => {
    setDeleteItemId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmationConfirm = () => {
    handleDelete(deleteItemId);
    handleDeleteConfirmationClose();
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogCollection = await getDocs(collection(db, "blog"));
        const blogsData: Blog[] = blogCollection.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
        }));
        setBlogs(blogsData);
      } catch (error) {
        setError("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [modalOpen]);

  return {
    blogs,
    deleteConfirmationOpen,
    error,
    loading,
    modalOpen,
    selectedBlog,
    handleAdd,
    handleDelete,
    handleDeleteWithConfirmation,
    handleDeleteConfirmationClose,
    handleDeleteConfirmationConfirm,
    handleEdit,
    handleModalClose,
    handleSave,
  };
};

export default useBlog;
