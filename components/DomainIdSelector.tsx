"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";

interface DomainIdSelectorProps {
  setDomainId: (domainId: string) => void;
}

function DomainIdSelector({ setDomainId }: DomainIdSelectorProps) {
  return (
    <Select onValueChange={(val) => setDomainId(val)}>
      <SelectTrigger className="w-full my-5">
        <SelectValue placeholder="Select Website" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="38">Bajaj</SelectItem>
        <SelectItem value="53">Jwelwary</SelectItem>
        <SelectItem value="123">Local</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default DomainIdSelector;
