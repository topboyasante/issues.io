"use server";
import prisma from "@/lib/prisma";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export async function getAllLists() {
  noStore();
  try {
    const data = await prisma.list.findMany();
    return data;
  } catch {
    throw new Error("Failed to fetch project data.");
  }
}

export async function getListsById(id: number) {
  noStore();
  try {
    const data = await prisma.list.findMany({
      where: {
        projectId: { equals: id },
      },
      include: {
        issues: true,
      },
    });
    return data;
  } catch {
    throw new Error("Failed to fetch lists.");
  }
}

export async function getListById(id: number) {
  noStore();
  try {
    const data = await prisma.list.findFirst({
      where: {
        id: { equals: id },
      },
    });
    return data;
  } catch {
    throw new Error("Failed to fetch list data.");
  }
}

export async function createList({
  project_id,
  title,
}: {
  project_id: number;
  title: string;
}) {
  try {
    await prisma.list.create({
      data: {
        title,
        projectId: project_id,
      },
    });
    revalidatePath(`/projects/${project_id}`);
  } catch {
    throw new Error("Failed to create list.");
  }
}

export async function deleteList({
  project_id,
  list_id,
}: {
  project_id: number;
  list_id: number;
}) {
  try {
    await prisma.list.delete({
      where: {
        id: list_id,
      },
    });
    revalidatePath(`/projects/${project_id}`);
  } catch (err) {
    throw new Error("Failed to delete list.");
  }
}

export async function editList({
  project_id,
  list_id,
  title,
}: {
  project_id: number;
  list_id: number;
  title: string;
}) {
  try {
    await prisma.list.update({
      where: {
        id: list_id,
      },
      data: {
        title,
      },
    });
    revalidatePath(`/projects/${project_id}`);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to Edit list.");
  }
}
