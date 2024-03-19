"use server";
import prisma from "@/lib/prisma";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export async function getAllIssues(email:string) {
  noStore();
  try {
    const data = await prisma.issue.findMany({
      where:{
        list:{
          project:{
            user: {
              email,
            },
          }
        }
      }
    });
    return data;
  } catch {
    throw new Error("Failed to fetch issue data.");
  }
}

export async function getIssueById(issue_id: string) {
  noStore();
  try {
    const data = await prisma.issue.findFirst({
      where: {
        id: { equals: issue_id },
      },
    });
    return data;
  } catch {
    throw new Error("Failed to fetch issue.");
  }
}

export async function createIssue({
  title,
  project_id,
  list_id,
  description,
}: {
  title: string;
  description: string;
  project_id: string;
  list_id: string;
}) {
  try {
    await prisma.issue.create({
      data: {
        title,
        description,
        listId: list_id,
      },
    });
    revalidatePath(`/projects/${project_id}`);
  } catch {
    throw new Error("Failed to create issue.");
  }
}

export async function deleteIssue({
  issue_id,
  project_id,
}: {
  issue_id: string;
  project_id: string;
}) {
  try {
    await prisma.issue.delete({
      where: {
        id: issue_id,
      },
    });
    revalidatePath(`/projects/${project_id}`);
  } catch (err) {
    throw new Error("Failed to delete project.");
  }
}

export async function editIssue({
  issue_id,
  project_id,
  title,
  description
}: {
  issue_id: string;
  project_id: string;
  title: string;
  description: string;
}) {
  try {
    await prisma.issue.update({
      where: {
        id: issue_id,
      },
      data: {
        title,
        description
      },
    });
    revalidatePath(`/projects/${project_id}`);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to Edit issue.");
  }
}
