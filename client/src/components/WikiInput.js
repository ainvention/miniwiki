import { LoadingSpinner } from "../assets/icons";
import { Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import MDEditor from "@uiw/react-md-editor";

export default function WikiInput({
  submitForm,
  titleInputRef,
  imageInputRef,
  contentInputRef,
  marktext,
  setMarktext,
  loading,
}) {
  return (
    <>
      <form onSubmit={submitForm} className="flex flex-col w-full">
        <Input
          type="text"
          className="rounded-l-lg dark:text-gray-200"
          placeholder="Title"
          ref={titleInputRef}
          disabled={loading}
          required
        />
        <Input
          type="text"
          className="rounded-r-lg dark:text-gray-200"
          placeholder="Image URL.. ex) https://www.google.com/images/272x92dp.png"
          ref={imageInputRef}
          disabled={loading}
        />
        <MDEditor
          value={marktext}
          onChange={setMarktext}
          className="flex-1 h-full p-2 my-4 border-2 border-gray-200 border-solid dark:bg-gray-600 dark:text-gray-200"
          ref={contentInputRef}
          disabled={loading}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={loading}
          className="dark:bg-red-800"
        >
          {loading && <LoadingSpinner className="spinner" />}
          {loading ? "Adding" : "Confirm"}
        </Button>
      </form>
    </>
  );
}
