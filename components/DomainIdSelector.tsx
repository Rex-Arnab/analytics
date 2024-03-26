"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";

interface DomainIdSelectorProps {
  domainId: string;
  setDomainId: (domainId: string) => void;
}

function DomainIdSelector({ domainId, setDomainId }: DomainIdSelectorProps) {
  return (
    <Select value={domainId} onValueChange={(val) => setDomainId(val)}>
      <SelectTrigger className="w-full my-5">
        <SelectValue placeholder="Select Website" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="38">Bajaj</SelectItem>
        <SelectItem value="53">Jewellery</SelectItem>
        <SelectItem value="123">Local</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default DomainIdSelector;
