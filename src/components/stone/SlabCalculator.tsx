import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SQM_PER_PYEONG = 3.305785;
const SQM_PER_SQFT = 0.092903;

const PRESET_SLABS = [
  { label: "162 × 324 cm (NUOVOCORSO 풀사이즈)", w: 162, h: 324 },
  { label: "160 × 320 cm (NUOVOCORSO 6.5mm)", w: 160, h: 320 },
  { label: "120 × 280 cm", w: 120, h: 280 },
  { label: "Custom", w: 0, h: 0 },
];

const SlabCalculator = ({ open, onOpenChange }: Props) => {
  const [unit, setUnit] = useState<"sqm" | "pyeong" | "sqft">("sqm");
  const [areaInput, setAreaInput] = useState("");
  const [presetIdx, setPresetIdx] = useState(0);
  const [customW, setCustomW] = useState("160");
  const [customH, setCustomH] = useState("320");
  const [marginPct, setMarginPct] = useState("15");

  const areaSqm = useMemo(() => {
    const v = parseFloat(areaInput);
    if (!isFinite(v) || v <= 0) return 0;
    if (unit === "sqm") return v;
    if (unit === "pyeong") return v * SQM_PER_PYEONG;
    return v * SQM_PER_SQFT;
  }, [areaInput, unit]);

  const slab = useMemo(() => {
    if (presetIdx === PRESET_SLABS.length - 1) {
      return {
        w: parseFloat(customW) || 0,
        h: parseFloat(customH) || 0,
      };
    }
    return PRESET_SLABS[presetIdx];
  }, [presetIdx, customW, customH]);

  const slabSqm = useMemo(() => {
    if (slab.w <= 0 || slab.h <= 0) return 0;
    return (slab.w / 100) * (slab.h / 100);
  }, [slab]);

  const result = useMemo(() => {
    if (areaSqm <= 0 || slabSqm <= 0) return null;
    const margin = (parseFloat(marginPct) || 0) / 100;
    const required = areaSqm * (1 + margin);
    const slabsRaw = required / slabSqm;
    const slabs = Math.ceil(slabsRaw);
    return {
      areaSqm,
      requiredSqm: required,
      slabSqm,
      slabsRaw,
      slabs,
      margin,
    };
  }, [areaSqm, slabSqm, marginPct]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>슬랩 매수 계산기</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>시공 면적</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                inputMode="decimal"
                placeholder="예: 49.6"
                value={areaInput}
                onChange={(e) => setAreaInput(e.target.value)}
                className="flex-1"
              />
              <select
                className="px-2 rounded-md border bg-background text-sm"
                value={unit}
                onChange={(e) => setUnit(e.target.value as typeof unit)}
              >
                <option value="sqm">m²</option>
                <option value="pyeong">평</option>
                <option value="sqft">ft²</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>슬랩 사이즈</Label>
            <select
              className="w-full px-3 py-2 rounded-md border bg-background text-sm"
              value={presetIdx}
              onChange={(e) => setPresetIdx(parseInt(e.target.value))}
            >
              {PRESET_SLABS.map((p, i) => (
                <option key={i} value={i}>
                  {p.label}
                </option>
              ))}
            </select>
            {presetIdx === PRESET_SLABS.length - 1 && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <Label className="text-xs">가로 (cm)</Label>
                  <Input
                    type="number"
                    inputMode="decimal"
                    value={customW}
                    onChange={(e) => setCustomW(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs">세로 (cm)</Label>
                  <Input
                    type="number"
                    inputMode="decimal"
                    value={customH}
                    onChange={(e) => setCustomH(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>로스율 (%)</Label>
            <Input
              type="number"
              inputMode="decimal"
              value={marginPct}
              onChange={(e) => setMarginPct(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              일반: 10~15%, 패턴 매칭 까다로운 마블: 20~25%
            </p>
          </div>

          {result && (
            <Card className="p-4 space-y-2 bg-primary/5 border-primary/20">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">시공 면적</span>
                <span className="font-medium">{result.areaSqm.toFixed(2)} m²</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">로스 포함 필요량</span>
                <span className="font-medium">{result.requiredSqm.toFixed(2)} m²</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">슬랩 1장 면적</span>
                <span className="font-medium">{result.slabSqm.toFixed(3)} m²</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-semibold">필요 슬랩 매수</span>
                <span className="text-2xl font-bold text-primary">
                  {result.slabs}장
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground pt-1">
                정확히는 {result.slabsRaw.toFixed(2)}장 → 올림 {result.slabs}장
              </p>
            </Card>
          )}

          {!result && (
            <p className="text-sm text-muted-foreground text-center py-2">
              면적과 슬랩 사이즈를 입력하면 결과가 나옵니다.
            </p>
          )}

          <Button
            variant="outline"
            onClick={() => {
              setAreaInput("");
            }}
            className="w-full"
          >
            초기화
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SlabCalculator;
