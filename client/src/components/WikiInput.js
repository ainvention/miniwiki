import { LoadingSpinner } from "../assets/icons";
import { Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import MDEditor from "@uiw/react-md-editor";

export default function WikiInput({
  submitForm,
  titleInputRef,
  imageInputRef,
  marktext,
  setMarktext,
  loading,
}) {
  return (
    <>
      <form onSubmit={submitForm} className="flex flex-col w-full">
        <Input
          type="text"
          className="rounded-l-lg"
          placeholder="Title"
          ref={titleInputRef}
          disabled={loading}
          required
        />
        <Input
          type="text"
          className="rounded-r-lg"
          placeholder="Image URL.. ex) https://www.google.com/images/272x92dp.png"
          ref={imageInputRef}
          disabled={loading}
        />
        <MDEditor
          value={marktext}
          onChange={setMarktext}
          className="flex-1 h-full p-2 my-4 border-2 border-gray-200 border-solid"
          disabled={loading}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={loading}
        >
          {loading && <LoadingSpinner className="spinner" />}
          {loading ? "Adding" : "Confirm"}
        </Button>
      </form>
    </>
  );
}
