import templates from "@/app/(data)/templates";
import { db } from "../../../../utils/db";
import { AiOutput } from "../../../../utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";
import { TEMPLATE } from "../_components/TemplateList";
import CopyButton from "./_components/CopyButton";
import { FileClock, FileText } from "lucide-react";

export interface HISTORY {
  formData: string | null;
  aiResponse: string | null;
  templateSlug: string | null;
  createdBy: string | null;
  createdAt: string | null;
}

async function History() {
  const user = await currentUser();
  const userEmail =
    user?.emailAddresses?.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress ?? "";

  const HistoryList: HISTORY[] = await db
    .select()
    .from(AiOutput)
    .where(eq(AiOutput?.createdBy, userEmail))
    .orderBy(desc(AiOutput.id));

  const GetTemplateName = (slug: string | null): TEMPLATE | undefined => {
    return templates?.find((item) => item.slug === slug);
  };

  return (
    <div className="p-6 fade-in">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
          <FileClock className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-foreground">History</h1>
          <p className="text-sm text-muted-foreground">Your previously generated content</p>
        </div>
      </div>

      {HistoryList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground bg-card border border-border rounded-2xl">
          <div className="text-5xl mb-4">📭</div>
          <p className="font-medium">No history yet</p>
          <p className="text-sm mt-1">Generate some content to see it here</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-7 text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-muted/50 px-6 py-3 border-b border-border">
            <div className="col-span-2">Template</div>
            <div className="col-span-2">AI Response</div>
            <div>Date</div>
            <div>Words</div>
            <div>Copy</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border">
            {HistoryList.map((item: HISTORY, index: number) => {
              const template = GetTemplateName(item?.templateSlug)
              return (
                <div
                  key={index}
                  className="grid grid-cols-7 px-6 py-4 items-center hover:bg-muted/30 transition-colors"
                >
                  {/* Template */}
                  <div className="col-span-2 flex items-center gap-3">
                    {template?.icon ? (
                      <div className="p-1.5 bg-muted rounded-lg border border-border flex-shrink-0">
                        <Image
                          src={template.icon}
                          width={20}
                          height={20}
                          alt="icon"
                        />
                      </div>
                    ) : (
                      <div className="p-1.5 bg-muted rounded-lg border border-border flex-shrink-0">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                    <span className="text-sm font-medium truncate">
                      {template?.name ?? item.templateSlug ?? '—'}
                    </span>
                  </div>

                  {/* AI Response preview */}
                  <div className="col-span-2 pr-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {item?.aiResponse ?? '—'}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="text-sm text-muted-foreground">{item?.createdAt ?? '—'}</div>

                  {/* Word count */}
                  <div>
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-lg">
                      {item?.aiResponse?.split(/\s+/).filter(Boolean).length ?? 0} words
                    </span>
                  </div>

                  {/* Copy */}
                  <div>
                    <CopyButton aiResponse={item.aiResponse ?? ""} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
