"use client";
import React, { useState } from "react";
import FormSectionComp from "../_components/FormSectionComp";
import OutputSectionComp from "../_components/OutputSectionComp";
import templates from "@/app/(data)/templates";
import { TEMPLATE } from "../../_components/TemplateList";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "../../../../../utils/AiModel";
import { db } from "../../../../../utils/db";
import { AiOutput } from "../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function NewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAioutput] = useState<string>("");

  const { user } = useUser();

  const generateAIContent = async (
    formData: any,
    imageData?: { base64: string; mimeType: string }
  ) => {
    setLoading(true);
    try {
      const selectedPrompt = selectedTemplate?.aiPrompt;
      const finalAiPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

      // Build message parts — include image inline if provided
      const messageParts: any[] = [{ text: finalAiPrompt }];
      if (imageData) {
        messageParts.push({
          inlineData: {
            mimeType: imageData.mimeType,
            data: imageData.base64,
          },
        });
      }

      const result = await chatSession.sendMessage(messageParts);
      const finalResult =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      setAioutput(finalResult);

      await saveInDb(
        JSON.stringify(formData),
        finalResult,
        selectedTemplate?.slug
      );
    } catch (err) {
      console.error("AI generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveInDb = async (formData: any, aiResp: string, slug: any) => {
    try {
      await db.insert(AiOutput).values({
        formData,
        aiResponse: aiResp,
        templateSlug: slug,
        createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
        createdAt: moment().format("DD/MM/YYYY"),
      });
    } catch (error) {
      console.error("Error saving to DB:", error);
    }
  };

  return (
    <div className="p-6">
      <Link href={"/dashboard"}>
        <Button
          variant="ghost"
          className="mb-5 gap-2 text-muted-foreground hover:text-foreground rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Templates
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FormSectionComp
          loading={loading}
          selectedTemplate={selectedTemplate}
          userFormInput={generateAIContent}
        />
        <div className="col-span-2">
          <OutputSectionComp aiOutput={aiOutput} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default NewContent;
