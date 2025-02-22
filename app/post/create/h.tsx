"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TipTapEditor from "../../components/tipTabEditor";
import { postSchema, PostValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { Text, Video } from "lucide-react";
import { UploadDropzone } from "@/app/components/uploadthing";

export default function AddText() {
  const { data: session } = useSession();
  const [tags, setTags] = useState("");
  const [imageurl, setimageurl] = useState<null | string>(null);

  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      tags:"",
    },
  });

  const {user_id, 
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  //@ts-ignore
  async function onSubmit(values) {
    //console.log(tags);
    console.log(values);
    const postData = {
      user_id: session?.user?.name,
      title: values.title,
      content: values.content,
      tags: values.tags,
      imageurl: imageurl, // Include imageurl in postData
    };

    console.log(postData.tags);

    console.log(postData);

    try {
      const res = await axios.post(
        "http://localhost:6969/users/initpost",
        postData
      );
      console.log("Response:", res);
      if (res.status === 201) {
        alert("Data submitted successfully!");
      } else {
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting data.");
    }
  }

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-y-5 ">
      <Tabs defaultValue="post" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="post" className="text-black text-md">
            <Text className="h-4 w-4 mr-2 " /> Post
          </TabsTrigger>
          <TabsTrigger value="image" className="text-black text-md">
            <Video className="h-4 w-4 mr-2" /> Image & Video
          </TabsTrigger>
        </TabsList>

        <TabsContent value="post">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 p-2"
              noValidate
            >
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
<FormField
  control={control}
  name="tags"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Tags (Comma-separated)</FormLabel>
      <FormControl>
        <Input
          placeholder="typescript, javascript, react"
          {...field}
          value={field.value || ""}
          onChange={(e) => field.onChange(e.target.value)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

              {imageurl && (
                <div className="mt-4">
                  <Label>Uploaded Image URL</Label>
                  <Input value={imageurl} readOnly />
                </div>
              )}

              <FormField
                control={control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <TipTapEditor onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full bg-black text-white p-3 rounded-md"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="image">
          <div className="text-center p-4">
            <p className="text-gray-500">Upload Image or Video</p>
            <UploadDropzone
              className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setimageurl(res[0].url);
                console.log("Uploaded Image URL:", res[0].url);
              }}
              onUploadError={(error) => {
                alert("Error during upload");
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
