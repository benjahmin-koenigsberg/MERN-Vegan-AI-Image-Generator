/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import axios from "axios";

 const veganPromptAdds = [
   "vegan",
   "animal rights",
   "animal liberation",
   "vegan activist",
   "animal liberation front",
   "veganism",
   "animal defender",
 ];
 const randomAdd =
   veganPromptAdds[Math.floor(Math.random() * veganPromptAdds.length)];

function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", prefix: "", prompt: "", photo: "" });
  const [generateImg, setGenerateImg] = useState(false);
  const [loading, setLoading] = useState(false);


  //const baseUrl = "http://localhost:8080";
  const baseUrl = "https://mern-vegan-ai-image-generator.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(baseUrl + "/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });


        await response.json();
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };



  const generateImage = async (e) => {
    e.preventDefault()
    if (form.prompt) {
      try {
        setGenerateImg(true);
        //form.prompt+= " " + randomAdd;
        const response = await fetch(baseUrl + "/api/v1/dalle", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prefix + form.prompt
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGenerateImg(false);


      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  // const generateImage = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://lexica.art/api/v1/search?q=${form.prompt}`
  //     );
  //     console.log(response.data.images[0].src );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <section className="max-w-7xl mx-auto">
      <div className="">
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px]  text-center">
          Create imaginative and stunning vegan AI images and share them with
          the community
        </p>
      </div>
      <form
        className="mt-16 max-w-3xl mx-auto"
        onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Enter your name..."
            value={form.name}
            handleChange={(e) => handleChange(e)}
          />

          <label className="block text-sm font-medium text-gray-900 text-start">
            Enter a vegan prefix
          </label>
          <select
            name="prefix"
            value={form.prefix}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3">
            <option value="vegan">Vegan</option>
            <option value="animal rights">Animal rights</option>
            <option value="animal liberation">Animal liberation</option>
            <option value="veganism">Veganism</option>
            <option value="anti-speciesism">Anti speciesism</option>
            <option value="vegan activism">Vegan activism</option>
            <option value="animal defender">Animal defender</option>
          </select>

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Enter a prompt"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-500 border focus:border-blue-500 border-gray-900 text-sm text-gray-900 rounded-lg focus:ring-blue-500 w-70 p-y h-70 flex justify-center items-center mx-auto">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-fll h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40 "
              />
            )}
            {generateImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5 justify-center">
          <button
            type="button"
            onClick={(e) => generateImage(e)}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {generateImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-gray text-[14px]">
            Once you have created an image you like, you can share it with othes in
            the community!
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {loading ? "Sharing..." : "Share"}
          </button>
        </div>
      </form>
    </section>
  );
}
export default CreatePost;
