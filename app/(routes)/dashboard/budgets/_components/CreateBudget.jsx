"use client";
import React, { useState } from "react";
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
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner"; // ✅ for popup notification (shadcn/toast or sonner)

function CreateBudget({ refreshData}) {
  const [emojiIcon, setEmojiIcon] = useState("💰");
  const [OpenEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUser();

  // ✅ Create New Budget
  const onCreateBudget = async () => {
    try {
      const result = await db
        .insert(Budgets)
        .values({
          name: name,
          amount: amount,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        })
        .returning({ insertedId: Budgets.id });

      if (result) {
        refreshData()
        toast.success("✅ New Budget Created!");
        setName("");
        setAmount("");
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
          <div
            className="bg-slate-100 p-10 rounded-md
      items-center flex flex-col border-2 border-dashed 
      cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>

            {/* ✅ Keep text-only inside DialogDescription */}
            <DialogDescription>
              Fill the form below to create a new budget.
            </DialogDescription>

            {/* ✅ Move divs outside DialogDescription to fix hydration error */}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  placeholder="e.g. 5000$"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={onCreateBudget}
                className="mt-5 w-full bg-blue-600" >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
