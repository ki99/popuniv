import { ChevronUpIcon } from '@radix-ui/react-icons'

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUser } from '@/hooks/auth'
import { useLeaderboard } from '@/hooks/leaderboard'
import { getUserGroupFromLeaderboard } from '@/services/leaderboard'
import { commaizeNumber, orderToRank } from '@/utils/numbers'

export default function Leaderboard() {
  const { data: leaderboard } = useLeaderboard()
  const { data: user } = useUser()

  const userGroupFromLeaderboard = getUserGroupFromLeaderboard(
    leaderboard,
    user,
  )

  return (
    <>
      <Drawer>
        <DrawerTrigger className="fixed bottom-0 left-0 h-12 w-full rounded-t-[10px] border bg-background">
          {userGroupFromLeaderboard ? (
            <div className="flex items-center">
              <div className="flex-1 space-x-2">
                <span className="font-medium">
                  {orderToRank(userGroupFromLeaderboard.order, true)}
                </span>
                <span>{userGroupFromLeaderboard.groupName}</span>
                <span>{commaizeNumber(userGroupFromLeaderboard.count)}</span>
              </div>
              <ChevronUpIcon width={24} height={24} className="mr-4" />
            </div>
          ) : (
            <div className="mx-auto h-2 w-[100px] rounded-full bg-muted" />
          )}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerFooter>
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
