"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { updateClientBranding } from "@/store/slices/clientProfileSlice";
import { Button } from "@/components/ui/button";

export default function UpdateBrandingForm() {
    const dispatch = useDispatch();
    const { profileData, updating } = useSelector((state) => state.clientProfile);
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    const handleOpen = () => {
        // Parse existing brand colors
        const existingColors = profileData?.brand_colors
            ? typeof profileData.brand_colors === "string"
                ? JSON.parse(profileData.brand_colors)
                : profileData.brand_colors
            : [];

        const colorsString = Array.isArray(existingColors)
            ? existingColors
                .map((c) => (typeof c === "string" ? c : c.color))
                .join(", ")
            : "";

        reset({
            logo_url: profileData?.logo_url || "",
            brand_colors_text: colorsString,
        });
        setOpen(true);
    };

    const onSubmit = async (data) => {
        // Parse comma-separated colors into array of objects
        const colorsArray = data.brand_colors_text
            ? data.brand_colors_text
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean)
                .map((color) => ({ color }))
            : [];

        const payload = {
            logo_url: data.logo_url,
            brand_colors: colorsArray,
        };

        await dispatch(updateClientBranding(payload));
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-sm p-1 cursor-pointer" onClick={handleOpen}>
                    Edit Branding
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Branding Assets</DialogTitle>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold">Logo URL</label>
                            <input
                                className="p-2 rounded-xl border-2 mb-4"
                                type="text"
                                {...register("logo_url")}
                                placeholder="Enter logo URL"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold">Brand Colors</label>
                            <input
                                className="p-2 rounded-xl border-2 mb-2"
                                type="text"
                                {...register("brand_colors_text")}
                                placeholder="#2563EB, #10B981, #F59E0B"
                            />
                            <p className="text-xs text-gray-500 mb-4">
                                Enter hex color codes separated by commas
                            </p>
                        </div>

                        <div className="flex gap-5">
                            <input
                                type="button"
                                defaultValue="Cancel"
                                className="p-2 rounded-xl border-2 cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                            <input
                                type="submit"
                                className="p-2 rounded-xl border-2 text-white bg-red-400 cursor-pointer disabled:opacity-50"
                                defaultValue={updating ? "Saving..." : "Save Changes"}
                                disabled={updating}
                            />
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
