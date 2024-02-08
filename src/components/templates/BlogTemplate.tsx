// components/templates/BlogTemplate.tsx
import React from "react";
import MainLayout from "./MainLayout";
import useBlog from "../../hooks/useBlog";
import CustomTable from "../organisms/Table";
import ConfirmationDialog from "../organisms/ConfirmationDialog";
import { Button, Box } from "@mui/material";
import Modal from "../organisms/Modal";

const BlogTemplate: React.FC = () => {
  const {
    blogs,
    deleteConfirmationOpen,
    error,
    loading,
    modalOpen,
    selectedBlog,
    handleAdd,
    handleEdit,
    handleDeleteConfirmationClose,
    handleDeleteConfirmationConfirm,
    handleDeleteWithConfirmation,
    handleModalClose,
    handleSave,
  } = useBlog();

  const columns = [
    { id: "title", label: "Title" },
    { id: "description", label: "Description" },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        onSave={(data) => handleSave(data)}
        title={selectedBlog.title}
        description={selectedBlog.description}
      />
      <ConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
        onConfirm={handleDeleteConfirmationConfirm}
      />
      <MainLayout>
        <div style={{ margin: 30 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="16px"
          >
            <h1 style={{ marginLeft: 30 }}>Blog Posts</h1>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 30 }}
              onClick={handleAdd}
            >
              Add
            </Button>
          </Box>
          <CustomTable columns={columns} data={blogs} onEdit={handleEdit} onDelete={handleDeleteWithConfirmation}/>
        </div>
      </MainLayout>
    </>
  );
};

export default BlogTemplate;
