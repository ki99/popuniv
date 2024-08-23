import LeaderboardDrawerTrigger from './drawer-trigger'
import DrawerTriggerErrorFallback from './drawer-trigger.error'
import LeaderboardTable from './table'

import AsyncBoundary from '@/app/boundaries/async-boundary'
import { Drawer, DrawerContent, DrawerFooter } from '@/components/ui/drawer'

export default function Leaderboard() {
  return (
    <Drawer>
      <AsyncBoundary
        ErrorFallback={(props) => <DrawerTriggerErrorFallback {...props} />}
      >
        <LeaderboardDrawerTrigger />
      </AsyncBoundary>

      <DrawerContent>
        <DrawerFooter>
          <AsyncBoundary>
            <LeaderboardTable />
          </AsyncBoundary>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
