import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLeaderboard } from '@/hooks/leaderboard'
import { commaizeNumber, orderToRank } from '@/utils/numbers'

export default function LeaderboardTable() {
  const { data: leaderboard } = useLeaderboard()

  return (
    <Table>
      <TableCaption>대학별 클릭 수 리더보드</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">순위</TableHead>
          <TableHead>학교</TableHead>
          <TableHead className="text-right">클릭</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboard?.map((row, index) => (
          <TableRow key={row.groupName}>
            <TableCell className="font-medium">
              {orderToRank(index + 1)}
            </TableCell>
            <TableCell>{row.groupName}</TableCell>
            <TableCell className="text-right">
              {commaizeNumber(row.count)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
