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
import { config } from "process";

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

  const generateAIContent = async (formData: any) => {
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const finalAiPrompt = JSON.stringify(formData) + "," + selectedPrompt;
    const result = await chatSession.sendMessage(finalAiPrompt);
    const finalResult =
      result?.response?.candidates[0]?.content?.parts[0]?.text;
    setAioutput(finalResult);
    await saveInDb(
      JSON.stringify(formData),
      finalResult,
      selectedTemplate?.slug
    );

    setLoading(false);
  };

  const saveInDb = async (formData: any, aiResp: string, slug: any) => {
    try {
      const result = await db.insert(AiOutput).values({
        formData: formData,
        aiResponse: aiResp,
        templateSlug: slug,
        createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
        createdAt: moment().format("DD/MM/YYYY"),
      });

      console.log(result);
      return result;
    } catch (error) {
      console.error("Error inserting into DB:", error);
    }
  };

  return (
    <div className="p-7">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-2 ">
        <FormSectionComp
          loading={loading}
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => generateAIContent(v)}
        />
        <div className="col-span-2">
          <OutputSectionComp aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default NewContent;
