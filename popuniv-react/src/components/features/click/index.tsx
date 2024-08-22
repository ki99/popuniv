import { useEffect, useState } from 'react'

import ClickAlert from './alert'
import ClickCounter from './counter'
import CounterErrorFallback from './counter.error'
import CounterLoadingFallback from './counter.loading'
import Layout from './layout'
import ClickSelect from './select'
import SelectErrorFallback from './select.error'

import AsyncBoundary from '@/app/boundaries/async-boundary'
import { DEFAULT_GROUP } from '@/constants/group'
import { useUser } from '@/hooks/auth'

export default function Click() {
  const { data: user } = useUser()

  const [selectedId, setSelectedId] = useState<string>(String(DEFAULT_GROUP.id))
  const [openAlert, setOpenAlert] = useState(false)

  useEffect(() => {
    if (user) {
      setSelectedId(String(user.university.id))
    }
  }, [user])

  const handleOpenAlert = () => {
    setOpenAlert(!openAlert)
  }

  const handleChangeSelect = (value: string) => {
    if (!user) {
      return handleOpenAlert()
    }
    setSelectedId(value)
  }

  return (
    <Layout>
      <AsyncBoundary
        ErrorFallback={(props) => <SelectErrorFallback {...props} />}
        message="대학 목록을 불러오지 못했습니다."
      >
        <ClickSelect value={selectedId} onChange={handleChangeSelect} />
      </AsyncBoundary>

      <AsyncBoundary
        ErrorFallback={(props) => <CounterErrorFallback {...props} />}
        LoadingFallback={<CounterLoadingFallback />}
      >
        <ClickCounter selectedId={selectedId} />
      </AsyncBoundary>

      <ClickAlert open={openAlert} onClick={handleOpenAlert} />
    </Layout>
  )
}
