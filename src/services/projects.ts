"use server";
import prisma from "@/lib/prisma";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export async function getAllProjects(email: string, query?: string) {
  noStore();
  try {
    const data = await prisma.project.findMany({
      where: {
        title: { contains: query },
        user: {
          email,
        },
      },
    });
    return data;
  } catch {
    throw new Error("Failed to fetch projects.");
  }
}

export async function getProjectById(id: string) {
  noStore();
  try {
    const data = await prisma.project.findFirst({
      where: {
        id: { equals: id },
      },
    });
    return data;
  } catch {
    throw new Error("Failed to fetch projects.");
  }
}

export async function createProject({
  title,
  user_id,
}: {
  title: string;
  user_id: string;
}) {
  try {
    const new_project = await prisma.project.create({
      data: {
        title,
        createdBy: user_id,
      },
    });
    await prisma.list.create({
      data: {
        title: "New🆕",
        projectId: new_project.id,
      },
    });
    await prisma.list.create({
      data: {
        title: "Pending⏱️",
        projectId: new_project.id,
      },
    });
    await prisma.list.create({
      data: {
        title: "Completed✅",
        projectId: new_project.id,
      },
    });

    revalidatePath("/projects");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create project.");
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: {
        id,
      },
    });
    revalidatePath("/projects");
  } catch (err) {
    throw new Error("Failed to delete project.");
  }
}

export async function editProject({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  try {
    await prisma.project.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    revalidatePath("/projects");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to Edit project.");
  }
}
