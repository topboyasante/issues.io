"use server";
import prisma from "@/lib/prisma";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export async function getAllIssues() {
  noStore();
  try {
    const data = await prisma.issue.findMany();
    return data;
  } catch {
    throw new Error("Failed to fetch issue data.");
  }
}

export async function getIssueById(issue_id: number) {
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
  project_id: number;
  list_id: number;
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
  issue_id: number;
  project_id: number;
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
}: {
  issue_id: number;
  project_id: number;
  title: string;
}) {
  try {
    await prisma.issue.update({
      where: {
        id: issue_id,
      },
      data: {
        title,
      },
    });
    revalidatePath(`/projects/${project_id}`);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to Edit issue.");
  }
}
