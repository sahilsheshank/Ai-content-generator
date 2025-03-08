import templates from "@/app/(data)/templates";
import { Button } from "@/components/ui/button";
import { db } from "../../../../utils/db";
import { AiOutput } from "../../../../utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";
import { TEMPLATE } from "../_components/TemplateList";
import CopyButton from "./_components/CopyButton";

export interface HISTORY {
  formData: string | null;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

async function History() {
  const user = await currentUser(); // ✅ Fix: Await user
  console.log("user", user);
  const userEmail =
    user?.emailAddresses?.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress ?? "";

  const HistoryList: HISTORY[] = await db
    .select()
    .from(AiOutput)
    .where(eq(AiOutput?.createdBy, userEmail))
    .orderBy(desc(AiOutput.id));

  const GetTemplateName = (slug: string) => {
    return templates?.find((item) => item.slug === slug) || {}; // ✅ Fix: Avoid undefined error
  };

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">
        Search your previously generated AI content
      </p>
      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESP</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
        <h2>COPY</h2>
      </div>
      {HistoryList.map((item: HISTORY, index: number) => (
        <React.Fragment key={index}>
          {" "}
          {/* ✅ Fix: Add key to Fragment */}
          <div className="grid grid-cols-7 my-5 py-3 px-3">
            <h2 className="col-span-2 flex gap-2 items-center">
              <Image
                src={
                  GetTemplateName(item?.templateSlug)?.icon ||
                  "/default-icon.png"
                } // ✅ Fix: Provide fallback image
                width={25}
                height={25}
                alt="icon"
              />
              {GetTemplateName(item?.templateSlug)?.name}
            </h2>
            <h2 className="col-span-2 line-clamp-3 mr-3">{item?.aiResponse}</h2>
            <h2>{item?.createdAt}</h2>
            <h2>{item?.aiResponse.length}</h2>
            <h2>
              <CopyButton aiResponse={item.aiResponse} />
            </h2>
          </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
}

export default History;
