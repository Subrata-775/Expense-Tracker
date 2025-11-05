"use client";
import React, { useState, useEffect } from "react";
import { PenBox } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { eq } from "drizzle-orm";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner"; // ✅ for popup notification (shadcn/toast or sonner)
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";

function EditBudget({ budgetInfo, refreshData }) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [OpenEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);
    const [isChanged, setIsChanged] = useState(false); // 👈 added state
    const { user } = useUser();

    useEffect(() => {
        if (budgetInfo) {
            setName(budgetInfo?.name);
            setAmount(budgetInfo?.amount);
            setEmojiIcon(budgetInfo?.icon);
        }
    }, [budgetInfo]);

    // 👇 check if any field changed from the original budget
    useEffect(() => {
        if (
            name !== budgetInfo?.name ||
            amount !== budgetInfo?.amount ||
            emojiIcon !== budgetInfo?.icon
        ) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    }, [name, amount, emojiIcon, budgetInfo]);

    // ✅ Update Budget
    const onUpdateBudget = async () => {
        try {
            const result = await db
                .update(Budgets)
                .set({
                    name: name,
                    amount: amount,
                    icon: emojiIcon,
                })
                .where(eq(Budgets.id, budgetInfo.id))
                .returning();

            if (result) {
                await refreshData();
                toast.success("✅ Budget Updated!");
                setOpenEmojiPicker(false);
            }
        } catch (error) {
            toast.error("❌ Something went wrong!");
            console.error(error);
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='flex gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold'><PenBox />Edit</Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                        <DialogDescription>
                            Fill the form below to create a new budget.
                        </DialogDescription>

                        <div className="mt-5">
                            <Button
                                variant="outline"
                                className="text-lg"
                                onClick={() => setOpenEmojiPicker(!OpenEmojiPicker)}
                            >
                                {emojiIcon}
                            </Button>

                            <div className="absolute z-10">
                                <EmojiPicker
                                    open={OpenEmojiPicker}
                                    onEmojiClick={(e) => {
                                        setEmojiIcon(e.emoji);
                                        setOpenEmojiPicker(false);
                                    }}
                                />
                            </div>

                            <div className="mt-2">
                                <h2 className="text-black font-medium my-1">Budget Name</h2>
                                <Input
                                    placeholder="e.g. Home Decor"
                                    defaultValue={budgetInfo?.name || ""}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mt-2">
                                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                                <Input
                                    placeholder="e.g. 5000$"
                                    type="number"
                                    defaultValue={budgetInfo?.amount || ""}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!isChanged} // 👈 only enable if something changed
                                onClick={onUpdateBudget}
                                className="mt-5 w-full bg-blue-600 text-white"
                            >
                                Update Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default EditBudget;
