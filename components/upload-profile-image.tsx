"use client";
import { CldUploadWidget } from "next-cloudinary";
import type {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import Image from "next/image";
import { useState, useTransition } from "react";
import { UploadProfileImageProps } from "@/types/auth";
import { updateProfileImage } from "@/app/actions/user";
import { ImageUp } from "lucide-react";

export const UploadProfileImage = ({ user }: UploadProfileImageProps) => {
  const [imageUrl, setImageUrl] = useState(user?.image || "");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleUploadSuccess = async (
    results: CloudinaryUploadWidgetResults
  ) => {
    const result = results.info as CloudinaryUploadWidgetInfo;
    if (result?.secure_url) {
      const newImageUrl = result.secure_url;

      // Optimistically update the UI
      setImageUrl(newImageUrl);
      setError(null);

      // Use startTransition to handle the server action
      startTransition(async () => {
        const response = await updateProfileImage(newImageUrl);

        if (!response.success) {
          // Revert the UI if the update fails
          setImageUrl(user?.image || "");
          setError(response.error || "Failed to update profile image");
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group w-32 h-32">
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-200">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={user?.name || "Profile"}
              fill
              className="object-cover"
              sizes="128px"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">
                {user?.name?.[0]?.toUpperCase() || "?"}
              </span>
            </div>
          )}
        </div>

        <CldUploadWidget
          signatureEndpoint="/api/upload-profile-image"
          onSuccess={handleUploadSuccess}
        >
          {({ open }) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                open();
              }}
              className="absolute -bottom-1 -right-1 p-2 bg-white rounded-full shadow-md border border-gray-200 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              type="button"
              aria-label="Change profile picture"
            >
              <ImageUp className="size-4" />
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
};
