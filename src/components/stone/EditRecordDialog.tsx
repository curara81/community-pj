import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { StoneRecord } from "@/lib/stone/types";

interface Props {
  record: StoneRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updated: StoneRecord) => void;
}

const CATEGORIES = [
  "marble",
  "granite",
  "quartzite",
  "limestone",
  "travertine",
  "onyx",
  "slate",
  "sandstone",
  "engineered_quartz",
  "ceramic",
  "other",
];

const EditRecordDialog = ({ record, open, onOpenChange, onSave }: Props) => {
  const [name, setName] = useState("");
  const [nameKo, setNameKo] = useState("");
  const [category, setCategory] = useState("marble");
  const [origin, setOrigin] = useState("");
  const [userNote, setUserNote] = useState("");

  useEffect(() => {
    if (!record) return;
    setName(record.analysis.name ?? "");
    setNameKo(record.analysis.nameKo ?? "");
    setCategory(record.analysis.category ?? "marble");
    setOrigin(record.analysis.origin ?? "");
    setUserNote(record.userNote ?? "");
  }, [record]);

  if (!record) return null;

  const handleSave = () => {
    const updated: StoneRecord = {
      ...record,
      analysis: {
        ...record.analysis,
        name: name.trim() || record.analysis.name,
        nameKo: nameKo.trim() || undefined,
        category: category || record.analysis.category,
        origin: origin.trim() || record.analysis.origin,
      },
      userNote: userNote.trim() || undefined,
      edited: true,
    };
    onSave(updated);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>분석 결과 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="name">상업명 (영문)</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nameKo">한국명</Label>
            <Input id="nameKo" value={nameKo} onChange={(e) => setNameKo(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category">카테고리</Label>
            <select
              id="category"
              className="w-full px-3 py-2 rounded-md border bg-background text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="origin">산지</Label>
            <Input id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="userNote">메모</Label>
            <Textarea
              id="userNote"
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditRecordDialog;
