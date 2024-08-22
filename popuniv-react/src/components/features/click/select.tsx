import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGroups } from '@/hooks/group'

interface ClickSelectProps {
  value: string
  onChange: (value: string) => void
}

export default function ClickSelect({ value, onChange }: ClickSelectProps) {
  const { data: groups } = useGroups()

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-background">
        <SelectValue placeholder="대학교를 선택해주세요." />
      </SelectTrigger>
      <SelectContent>
        {groups?.map((group) => (
          <SelectItem key={group.value} value={String(group.value)}>
            {group.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
