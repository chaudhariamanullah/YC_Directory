"use client"

import {Input} from "@/components/ui/input"
import { useState , useActionState} from "react"
import { Textarea } from "./ui/textarea"
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button"
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast";
import { createPitch } from "@/lib/action"

import { useRouter } from "next/navigation"


export default function StartupForm() {

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState("Hello!")
    const { toast } = useToast()
    const  router  = useRouter()

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            };

            await formSchema.parseAsync(formValues)
            const result = await createPitch(prevState,formData,pitch)

            if ( result.status == "SUCCESS"){
                toast({
                    title: "Success",
                    description: "Your Startup Pitch Is Successfully Craeted",
                  });

                router.push(`/startup/${result._id}`)
            }

            return result

        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors

                setErrors(fieldErrors as unknown as Record<string, string>)

                toast({
                    title: "Error",
                    description: "Please check your inputs and try again",
                    variant: "destructive",
                  });
                return { ...prevState, error: "Validation failed", status: "ERROR" }
            }

            toast({
                title: "Error",
                description: "Unexpected Error Has Occured",
                variant: "destructive",
              });

            return { ...prevState, error: "Unknown error", status: "ERROR" }
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    })

    return (
        <form action={formAction} className="startup-from">
            <div className="ml-5 mr-5 mb-3 mt-2">
                <label htmlFor="title" className="startup-form_label">Title</label>
                <Input 
                    id="title" 
                    name="title" 
                    className="startup-form_input" 
                    required placeholder="Startup Title" />
                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>

            <div className="ml-5 mr-5 mb-3">
                <label htmlFor="description" className="startup-form_label">Description</label>
                <Textarea 
                    id="description" 
                    name="description" 
                    className="startup-form_textarea" 
                    required placeholder="Startup Description" />
                {errors.description && <p className="startup-form_error">{errors.description}</p>}
            </div>

            <div className="ml-5 mr-5 mb-3">
                <label htmlFor="category" className="startup-form_label">Category</label>
                <Input 
                    id="category" 
                    name="category" 
                    className="startup-form_input" 
                    required placeholder="Startup Category (e.g. Tech, Education, Infrastucture)" />
                {errors.category && <p className="startup-form_error">{errors.category}</p>}
            </div>

            <div className="ml-5 mr-5 mb-3">
                <label htmlFor="link" className="startup-form_label">Image URL</label>
                <Input 
                    id="link" 
                    name="link" 
                    className="startup-form_input" 
                    required placeholder="Startup Image URL" />
                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>

            <div className="ml-5 mr-5 mb-3" data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{ placeholder: "Briefly Describe Your Idea And What Problem It Solves" }}
                    previewOptions={{ disallowedElements: ["style"] }}
                />
                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>

            <Button type="submit" disabled={isPending} className="startup-form_btn text-white w-[60%] mb-2">
                {isPending ? "Submitting..." : "Submit Your Form"}
                <Send className="size-6 ml-2" />
            </Button>
            
        </form>
    )
}
