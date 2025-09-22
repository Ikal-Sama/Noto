"use server"

import {z} from "zod"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { noteSchema } from "@/lib/schema"

export const createNote = async (values: z.infer<typeof noteSchema>) => {
    try {
        const user  = await auth.api.getSession({
            headers: await headers(),
        });
        if(!user) {
            return {
                success: false,
                error: "Unauthorized"
            }
        }
        
        const validatedFields =  noteSchema.safeParse(values)
       if(!validatedFields.success) {
        return {
            success: false,
            error: "Invalid input"
        }
       }
       const {body, title} = validatedFields.data
       const note = await prisma.note.create({
        data: {
            title,
            body,
            userId: user?.user.id
        },
       })

        return {success: true, note}

    } catch (error) {        
        return {
            success: false,
            error: "Somethin went wrong, Failed to create note"
        }
    }
}

export const getUserNotes = async() => {
    try {
        const user  = await auth.api.getSession({
            headers: await headers(),
        });

        const notes = await prisma.note.findMany({
            where: {
                userId: user?.user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return {success: true, notes}
    } catch (error) {
        console.log("ERROR:", error);
        
        return {
            success: false,
            error: "Somethin went wrong, Failed to get user notes"
        }
    }
}

export const getNoteById = async(id: string) => {
    const note = await prisma.note.findUnique({
        where: {
            id
        }
    })

    return {success: true, note}
}


export const updateUserNote = async (id: string, values: z.infer<typeof noteSchema>) => {
    try {
        // Get the current user session
        const user = await auth.api.getSession({
            headers: await headers(),
        });

        if (!user) {
            return {
                success: false,
                error: "Unauthorized: You must be logged in to update a note"
            };
        }

        // Validate the input
        const validatedFields = noteSchema.safeParse(values);
        if (!validatedFields.success) {
            return {
                success: false,
                error: "Invalid input data"
            };
        }

        // First, check if the note exists and belongs to the user
        const existingNote = await prisma.note.findUnique({
            where: { id }
        });

        if (!existingNote) {
            return {
                success: false,
                error: "Note not found"
            };
        }

        if (existingNote.userId !== user.user.id) {
            return {
                success: false,
                error: "Unauthorized: You can only update your own notes"
            };
        }

        // Update the note
        const { title, body } = validatedFields.data;
        const updatedNote = await prisma.note.update({
            where: { id },
            data: {
                title,
                body,
                updatedAt: new Date()
            }
        });

        return {
            success: true,
            note: updatedNote
        };

    } catch (error) {
        console.error("Error updating note:", error);
        return {
            success: false,
            error: "Something went wrong while updating the note"
        };
    }
};

export const deleteUserNote = async (id: string) => {
    try {
        const user = await auth.api.getSession({
            headers: await headers(),
        });

        if (!user) {
            return {
                success: false,
                error: "Unauthorized: You must be logged in to delete a note"
            };
        }

        const existingNote = await prisma.note.findUnique({
            where: { id }
        });

        if (!existingNote) {
            return {
                success: false,
                error: "Note not found"
            };
        }

        if (existingNote.userId !== user.user.id) {
            return {
                success: false,
                error: "Unauthorized: You can only delete your own notes"
            };
        }

        await prisma.note.delete({
            where: { id }
        });

        return {
            success: true,
        };
    } catch (error) {
        console.error("Error deleting note:", error);
        return {
            success: false,
            error: "Something went wrong while deleting the note"
        };
    }
};


export const markAsCompleted = async(id: string) => {
    try {
        const user = await auth.api.getSession({
            headers: await headers(),
        });

        if (!user) {
            return {
                success: false,
                error: "Unauthorized: You must be logged in to update a note"
            };
        }

        const note =  await prisma.note.update({
            where: {
                id
            },
            data: {
                isComplete: true
            }
        })

        return {
            success: true,
            note
        }

       
    } catch (error) {
        return {
            success: false,
            error: "Something went wrong while updating the note"
        };
    }
}